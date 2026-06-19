"use client";

import { getYoutubeId, toEmbedUrl } from "./ProjectLinks";
import type { ProjectLink } from "@/lib/api";

function YoutubeEmbed({ videoId, label }: { videoId: string; label: string }) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
        {label}
      </h2>
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

function DocEmbed({ embedUrl, label }: { embedUrl: string; label: string }) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 mb-4">
        {label}
      </h2>
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
        <iframe
          src={embedUrl}
          title={label}
          className="w-full"
          style={{ height: "600px" }}
          allow="autoplay"
        />
      </div>
    </div>
  );
}

export default function ProjectEmbeds({
  links,
}: {
  links: ProjectLink[] | undefined;
}) {
  if (!links || links.length === 0) return null;

  const embeds: React.ReactNode[] = [];

  for (const link of links) {
    if (link.type === "video") {
      const videoId = getYoutubeId(link.url);
      if (videoId) {
        embeds.push(
          <YoutubeEmbed key={link.id} videoId={videoId} label={link.label} />
        );
      }
    } else if (link.type === "doc") {
      const embedUrl = toEmbedUrl(link.url);
      if (embedUrl) {
        embeds.push(
          <DocEmbed key={link.id} embedUrl={embedUrl} label={link.label} />
        );
      }
    }
  }

  if (embeds.length === 0) return null;

  return <>{embeds}</>;
}