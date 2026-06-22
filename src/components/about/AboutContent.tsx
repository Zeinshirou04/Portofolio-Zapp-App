"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaravel,
  faReact,
  faJs,
  faPhp,
  faPython,
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faServer,
  faCode,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Profile } from "@/lib/api";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const skills = [
  { label: "Laravel", icon: faLaravel },
  { label: "React / Next.js", icon: faReact },
  { label: "JavaScript", icon: faJs },
  { label: "PHP", icon: faPhp },
  { label: "Python", icon: faPython },
  { label: "MySQL", icon: faDatabase },
  { label: "REST APIs", icon: faServer },
  { label: "Tailwind CSS", icon: faCode },
];

const socialIcons: Record<string, any> = {
  github: faGithub,
  linkedin: faLinkedin,
  instagram: faInstagram,
};

interface Props {
  profile: Profile;
}

export default function AboutContent({ profile }: Props) {
  const showPortrait =
    profile.display_mode === "portrait" && profile.portrait_url;
  const showAvatar = profile.display_mode === "avatar" && profile.avatar_url;

  const activeSocials = Object.entries(profile.social_links ?? {}).filter(
    ([, url]) => url && url.trim() !== "",
  );

  return (
    <main className="bg-white dark:bg-zinc-900 min-h-screen">
      {/* ── Hero split ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo */}
            <motion.div
              className="flex justify-center lg:justify-start"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              {showPortrait ? (
                // Portrait mode — full/half body, no circle
                <div className="relative w-64 md:w-80 aspect-3/4">
                  <Image
                    src={profile.portrait_url!}
                    alt={profile.name}
                    fill
                    className="object-cover object-top rounded-2xl"
                    priority
                  />
                </div>
              ) : showAvatar ? (
                // Avatar mode — round frame
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-volt/10 scale-110" />
                  <div
                    className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden
                                  ring-4 ring-volt/30 ring-offset-4
                                  ring-offset-white dark:ring-offset-zinc-900"
                  >
                    <Image
                      src={profile.avatar_url!}
                      alt={profile.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              ) : (
                // Fallback — no photo yet
                <div
                  className="w-56 h-56 md:w-72 md:h-72 rounded-full
                                bg-gray-100 dark:bg-zinc-800
                                border-2 border-dashed border-gray-200 dark:border-zinc-700
                                flex items-center justify-center"
                >
                  <span className="font-sans text-sm text-gray-400 dark:text-gray-500">
                    No photo yet
                  </span>
                </div>
              )}
            </motion.div>

            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            >
              <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
                About me
              </span>

              <h1
                className="font-display font-bold text-3xl md:text-4xl
                             text-gray-900 dark:text-gray-100
                             leading-tight tracking-tight mt-4 mb-2"
              >
                {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-volt">
                  {profile.name.split(" ").slice(-1)}
                </span>
              </h1>

              <p className="font-sans text-sm font-semibold text-gray-400 dark:text-gray-500 mb-5">
                {profile.job_title}
              </p>

              <p className="font-sans text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {profile.bio}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                {profile.cv_url && (
                  <a
                    href={profile.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans font-medium text-sm
                               px-5 py-2.5 rounded-lg
                               bg-volt hover:bg-volt/90 text-white transition-colors"
                  >
                    <FontAwesomeIcon icon={faArrowDown} className="h-3 w-3" />
                    Download CV
                  </a>
                )}

                {/* Social links */}
                {activeSocials.map(([platform, url]) => {
                  const icon = socialIcons[platform.toLowerCase()];
                  if (!icon) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans font-medium text-sm
                                 px-5 py-2.5 rounded-lg
                                 border border-gray-300 dark:border-white/20
                                 text-gray-700 dark:text-white/80
                                 hover:border-gray-400 dark:hover:border-white/40
                                 hover:text-gray-900 dark:hover:text-white
                                 transition-colors capitalize"
                    >
                      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                      {platform}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-zinc-800/40">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
              Tech stack
            </span>
            <h2
              className="font-display font-bold text-3xl md:text-4xl
                           text-gray-900 dark:text-gray-100
                           leading-tight tracking-tight mt-3"
            >
              What I work with
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.label}
                variants={fadeUp}
                className="bg-white dark:bg-zinc-900
                           border border-gray-100 dark:border-zinc-800
                           rounded-xl p-5 shadow-sm
                           hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-200
                           flex flex-col gap-3"
              >
                <FontAwesomeIcon
                  icon={skill.icon}
                  className="h-6 w-6 text-volt"
                />
                <span
                  className="font-display font-bold text-sm
                                 text-gray-900 dark:text-gray-100"
                >
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
