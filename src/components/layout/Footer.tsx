import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const socials = [
  { icon: faGithub, href: 'https://github.com/zweyn', label: 'GitHub' },
  { icon: faLinkedin, href: 'https://linkedin.com/in/zweyn', label: 'LinkedIn' },
  { icon: faWhatsapp, href: 'https://wa.me/6285183266907', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-zapp-ink border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10
                      flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/"
          className="font-display font-bold text-lg text-white">
          Zayn<span className="text-volt">.</span>
        </Link>

        {/* Copy */}
        <p className="font-sans text-sm text-white/40 text-center">
          © {new Date().getFullYear()} Farras Adhani Zayn. All rights reserved.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-5">
          {socials.map(({ icon, href, label }) => (
            <a key={label} href={href}
              target="_blank" rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 hover:text-white transition-colors">
              <FontAwesomeIcon icon={icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}