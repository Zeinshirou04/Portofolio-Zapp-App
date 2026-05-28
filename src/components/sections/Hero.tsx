'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Hero() {
  return (
    <section className="bg-zapp-ink min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-32 md:py-40">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible">

          <motion.span
            variants={fadeUp}
            className="text-xs font-sans font-semibold tracking-widest uppercase text-volt-light">
            Full Stack Developer · Indonesia
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl
                       text-white leading-[1.05] tracking-tight mt-4 mb-6">
            Building software
            <br />
            that works for{' '}
            <span className="text-volt-light">your</span>
            <br />
            business.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-sans text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            I build SaaS applications, REST APIs, and admin dashboards
            for micro businesses across Indonesia. Clean code, fast delivery,
            affordable prices.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/#contact"
              className="inline-flex items-center justify-center gap-2
                         font-sans font-medium text-base px-7 py-3.5 rounded-lg
                         bg-volt hover:bg-volt/90 text-white transition-colors">
              Hire me
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
            <Link href="/projects"
              className="inline-flex items-center justify-center gap-2
                         font-sans font-medium text-base px-7 py-3.5 rounded-lg
                         border border-white/20 hover:border-white/40
                         text-white/80 hover:text-white transition-colors">
              View my work
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-6">
            <a href="https://github.com/zweyn"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm
                         text-white/40 hover:text-white/80 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/zweyn"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm
                         text-white/40 hover:text-white/80 transition-colors">
              <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}