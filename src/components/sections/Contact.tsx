'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { motion, type Variants } from 'framer-motion'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Contact() {
  return (
    <section id="contact" className="bg-zapp-ink py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="max-w-2xl"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}>

          <motion.span
            variants={fadeUp}
            className="text-xs font-sans font-semibold tracking-widest uppercase text-volt-light">
            Get in touch
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-3xl md:text-4xl
                       text-white mt-4 mb-4 leading-tight tracking-tight">
            Let's build something{' '}
            <span className="text-volt-light">together.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-white/60 leading-relaxed mb-10">
            Have a project in mind? Tell me what you need and I'll get back
            to you with a quote and timeline.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-6">
            <a href="mailto:business.zappdev@gmail.com"
              className="flex items-center gap-3
                         font-sans text-sm text-white/70 hover:text-white
                         transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-volt-light" />
              Farras.FF6@gmail.com
            </a>
            <a href="https://wa.me/6285183266907"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3
                         font-sans text-sm text-white/70 hover:text-white
                         transition-colors">
              <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-volt-light" />
              Chat on WhatsApp
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}