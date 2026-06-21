"use client";

import { useState, useEffect, useRef } from "react";
import { getLikeStatus, likeProject, unlikeProject } from "@/lib/api";

const STORAGE_KEY = (slug: string) => `zapp_liked_${slug}`;

interface EchoChannel {
  listen: (event: string, cb: (data: unknown) => void) => EchoChannel;
}

interface EchoInstance {
  channel: (name: string) => EchoChannel;
  leaveChannel: (name: string) => void;
}

// Lazy singleton — Echo is only initialised once in the browser
let echoInstance: EchoInstance | null = null;

async function getEcho(): Promise<EchoInstance> {
  if (echoInstance) return echoInstance;

  const [{ default: Echo }, { default: Pusher }] = await Promise.all([
    import("laravel-echo"),
    import("pusher-js"),
  ]);

  // Make Pusher available globally — Echo expects it
  (window as unknown as Record<string, unknown>).Pusher = Pusher;

  echoInstance = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 443),
    wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 443),
    forceTLS: true,
    enabledTransports: ["ws", "wss"],
  }) as unknown as EchoInstance;

  return echoInstance;
}

export function useProjectLikes(slug: string, initialCount: number) {
  const [count, setCount]   = useState(initialCount);
  const [liked, setLiked]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady]   = useState(false);
  const channelName         = `project.${slug}`;
  const echoRef             = useRef<EchoInstance | null>(null);

  // 1. Restore liked state from localStorage, verify with server
  useEffect(() => {
    const local = localStorage.getItem(STORAGE_KEY(slug)) === "true";
    setLiked(local);

    getLikeStatus(slug)
      .then(({ likes_count, liked: serverLiked }) => {
        setCount(likes_count);
        setLiked(serverLiked);
        localStorage.setItem(STORAGE_KEY(slug), String(serverLiked));
      })
      .catch(() => {/* fall back to localStorage */})
      .finally(() => setReady(true));
  }, [slug]);

  // 2. Subscribe to Reverb channel for live count updates
  useEffect(() => {
    let mounted = true;

    getEcho().then((echo) => {
      if (!mounted) return;
      echoRef.current = echo;

      echo
        .channel(channelName)
        .listen(".like.updated", (data: unknown) => {
          const { likes_count } = data as { likes_count: number };
          setCount(likes_count);
        });
    });

    return () => {
      mounted = false;
      echoRef.current?.leaveChannel(channelName);
    };
  }, [channelName]);

  // 3. Toggle like
  const toggle = async () => {
    if (loading || !ready) return;
    setLoading(true);

    const wasLiked = liked;

    // Optimistic
    setLiked(!wasLiked);
    setCount((c) => c + (wasLiked ? -1 : 1));

    try {
      const res = wasLiked
        ? await unlikeProject(slug)
        : await likeProject(slug);

      // Server count is authoritative — broadcast will also update other tabs
      setCount(res.likes_count);
      setLiked(res.liked);
      localStorage.setItem(STORAGE_KEY(slug), String(res.liked));
    } catch {
      // Revert
      setLiked(wasLiked);
      setCount((c) => c + (wasLiked ? 1 : -1));
    } finally {
      setLoading(false);
    }
  };

  return { count, liked, loading, ready, toggle };
}