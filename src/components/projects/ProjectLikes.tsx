"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { likeProject, unlikeProject, getLikeStatus } from "@/lib/api";

const STORAGE_KEY = (slug: string) => `zapp_liked_${slug}`;

export default function ProjectLikes({ slug, initialCount }: { slug: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  // On mount: check localStorage first (instant), then verify with server
  useEffect(() => {
    const localLiked = localStorage.getItem(STORAGE_KEY(slug)) === "true";
    setLiked(localLiked);

    // Verify server state + get fresh count
    getLikeStatus(slug)
      .then(({ likes_count, liked: serverLiked }) => {
        setCount(likes_count);
        setLiked(serverLiked);
        localStorage.setItem(STORAGE_KEY(slug), String(serverLiked));
      })
      .catch(() => {
        // Server check failed — fall back to localStorage state
      })
      .finally(() => setChecked(true));
  }, [slug]);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);

    const wasLiked = liked;

    // Optimistic update
    setLiked(!wasLiked);
    setCount((c) => c + (wasLiked ? -1 : 1));

    try {
      const res = wasLiked
        ? await unlikeProject(slug)
        : await likeProject(slug);

      setCount(res.likes_count);
      setLiked(res.liked);
      localStorage.setItem(STORAGE_KEY(slug), String(res.liked));
    } catch {
      // Revert on failure
      setLiked(wasLiked);
      setCount((c) => c + (wasLiked ? 1 : -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={toggle}
        disabled={loading || !checked}
        aria-label={liked ? "Unlike this project" : "Like this project"}
        className={`
          group relative flex items-center justify-center
          h-12 w-12 rounded-full border-2 transition-all duration-200
          ${liked
            ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-500"
            : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-400 dark:text-gray-500 hover:border-rose-300 hover:text-rose-400"
          }
          ${loading || !checked ? "opacity-60 cursor-not-allowed" : "cursor-pointer active:scale-90"}
        `}
      >
        <FontAwesomeIcon
          icon={liked ? faHeart : faHeartOutline}
          className={`h-5 w-5 transition-transform duration-150 ${
            !loading && !liked ? "group-hover:scale-110" : ""
          }`}
        />
        {/* Pulse ring on like */}
        {liked && (
          <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
      <span className="font-sans text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">
        {count > 0 ? count : ""}
        <span className="sr-only"> likes</span>
      </span>
      <span className="font-sans text-[10px] text-gray-300 dark:text-gray-600 uppercase tracking-wider">
        {liked ? "Liked" : "Like"}
      </span>
    </div>
  );
}