'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLaravel, faReact, faJs, faPhp, faPython,
} from '@fortawesome/free-brands-svg-icons'
import { faDatabase, faServer, faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import { motion, type Variants } from 'framer-motion'

const stack = [
  { icon: faLaravel, label: 'Laravel' },
  { icon: faReact, label: 'Next.js' },
  { icon: faJs, label: 'TypeScript' },
  { icon: faPhp, label: 'PHP' },
  { icon: faPython, label: 'Python' },
  { icon: faDatabase, label: 'MySQL' },
  { icon: faServer, label: 'REST APIs' },
  { icon: faMobileScreen, label: 'Responsive UI' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function About() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}>

            <span className="text-xs font-sans font-semibold tracking-widest uppercase text-volt">
              About me
            </span>

            <h2 className="font-display font-bold text-3xl md:text-4xl
                           text-gray-900 dark:text-gray-100
                           leading-tight tracking-tight mt-4 mb-6">
              A developer who cares about
              <span className="text-volt"> the details.</span>
            </h2>

            <div className="space-y-4">
              <p className="font-sans text-gray-500 dark:text-gray-400 leading-relaxed">
                I'm Farras Adhani Zayn, a full stack developer based in Indonesia.
                I specialize in building clean, maintainable web applications using
                Laravel and Next.js — from REST APIs to full SaaS platforms.
              </p>
              <p className="font-sans text-gray-500 dark:text-gray-400 leading-relaxed">
                I've contributed to government technology projects in Semarang,
                including IoT-integrated health monitoring systems, communication
                platforms, and LLM-powered voice robots. I bring that same
                attention to quality to every client project.
              </p>
              <p className="font-sans text-gray-500 dark:text-gray-400 leading-relaxed">
                Outside client work, I'm building Zapp — a SaaS platform for
                Indonesian micro businesses.
              </p>
            </div>
          </motion.div>

          {/* Right — stack grid */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="font-sans text-sm font-semibold text-gray-400
                         dark:text-gray-500 uppercase tracking-widest mb-6">
              Tech I work with
            </motion.p>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4"
              variants={staggerGrid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}>
              {stack.map(({ icon, label }) => (
                <motion.div key={label} variants={fadeUp}
                  className="bg-white dark:bg-zinc-800
                             border border-gray-100 dark:border-zinc-700
                             rounded-xl p-4
                             flex flex-col items-center gap-3
                             hover:shadow-md hover:-translate-y-0.5
                             transition-all duration-200">
                  <FontAwesomeIcon icon={icon} className="h-6 w-6 text-volt" />
                  <span className="font-sans text-xs font-semibold
                                   text-gray-600 dark:text-gray-400">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}