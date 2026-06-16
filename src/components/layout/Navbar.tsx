'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUpRightFromSquare, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50
                    bg-white/80 dark:bg-zapp-ink/80
                    backdrop-blur-md
                    border-b border-gray-100 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/"
          className="font-display font-bold text-xl text-zapp-ink dark:text-white">
          Zayn<span className="text-volt">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}
              className={`font-sans text-sm transition-colors
                ${isActive(href)
                  ? 'text-volt border-b-2 border-volt pb-0.5'
                  : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                }`}>
              {label}
            </Link>
          ))}

          {/* Zapp main site link */}
          <a
            href="https://zapp.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm
                       text-gray-600 dark:text-white/60
                       hover:text-gray-900 dark:hover:text-white
                       transition-colors">
            Zapp
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
          </a>
        </div>

        {/* CTA */}
        <Link href="/#contact"
          className="hidden md:inline-flex items-center gap-2
                     font-sans font-medium text-sm
                     bg-volt hover:bg-volt/90 text-white
                     px-5 py-2 rounded-lg transition-colors">
          Hire me
          <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600 dark:text-white/60"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-white/10
                        bg-white/95 dark:bg-zapp-ink/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans text-sm transition-colors
                  ${isActive(href)
                    ? 'text-volt font-medium'
                    : 'text-gray-600 dark:text-white/60'
                  }`}>
                {label}
              </Link>
            ))}

            {/* Zapp main site link — mobile */}
            <a
              href="https://zapp.web.id"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-1.5 font-sans text-sm
                         text-gray-600 dark:text-white/60 transition-colors">
              Zapp
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-2.5 w-2.5" />
            </a>

            <Link href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2
                         font-sans font-medium text-sm
                         bg-volt hover:bg-volt/90 text-white
                         px-5 py-2.5 rounded-lg transition-colors w-fit">
              Hire me
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}