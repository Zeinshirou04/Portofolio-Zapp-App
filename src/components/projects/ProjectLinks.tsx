"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faYoutube,
  faGoogleDrive,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGlobe,
  faFileAlt,
  faLink,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ProjectLink } from "@/lib/api";

function getLinkIcon(link: ProjectLink): IconDefinition {
  if (link.type === "repo") return faGithub;
  if (link.type === "video") return faYoutube;
  if (link.type === "doc") {
    if (link.url.includes("drive.google.com")) return faGoogleDrive;
    return faFileAlt;
  }
  if (link.type === "site") return faGlobe;
  return faLink;
}

function getLinkStyle(type: ProjectLink["type"]): string {
  switch (type) {
    case "repo":
      return "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700";
    case "site":
      return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40";
    case "video":
      return "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40";
    case "doc":
      return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40";
    default:
      return "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40";
  }
}

// Transform Google Drive share URL to embeddable preview URL
export function toEmbedUrl(url: string): string | null {
  // https://drive.google.com/file/d/{id}/view → /preview
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  return null;
}

// Extract YouTube video ID from any YouTube URL format
export function getYoutubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function ProjectLinks({
  links,
}: {
  links: ProjectLink[] | undefined;
}) {
  if (!links || links.length === 0) return null;

  // Only show non-embeddable links here (video/doc embeds get their own section)
  const sidebarLinks = links.filter((l) => {
    if (l.type === "video" && getYoutubeId(l.url)) return false;
    if (l.type === "doc" && toEmbedUrl(l.url)) return false;
    return true;
  });

  // Always show all links in the sidebar regardless — embeddable ones still
  // deserve a direct-open button
  const allLinks = links;

  if (allLinks.length === 0) return null;

  return (
    <div>
      <h3 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Links
      </h3>
      <ul className="space-y-2">
        {allLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-sans font-medium
                          transition-colors w-full ${getLinkStyle(link.type)}`}
            >
              <FontAwesomeIcon
                icon={getLinkIcon(link)}
                className="h-4 w-4 shrink-0"
              />
              <span className="flex-1 truncate">{link.label}</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3 w-3 opacity-50 shrink-0"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}