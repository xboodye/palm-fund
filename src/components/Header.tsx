import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-accent-green">
      <div className="max-w-[120rem] mx-auto px-8 md:px-16 lg:px-24 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="font-heading text-3xl md:text-4xl text-accent-green hover:text-secondary transition-colors duration-300">
            THE GROVE
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#gallery" 
              className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
            >
              GALLERY
            </a>
            <a 
              href="#search" 
              className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
            >
              SEARCH
            </a>
            <a 
              href="#contact" 
              className="font-paragraph text-base text-secondary hover:text-accent-green transition-colors duration-300"
            >
              CONTACT
            </a>
            <a 
              href="#donate" 
              className="bg-accent-green text-primary-foreground font-paragraph text-base font-bold px-8 py-3 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300"
            >
              DONATE NOW
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary hover:text-accent-green transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-6 pt-8 pb-4">
                <a 
                  href="#gallery" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-paragraph text-lg text-secondary hover:text-accent-green transition-colors duration-300"
                >
                  GALLERY
                </a>
                <a 
                  href="#search" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-paragraph text-lg text-secondary hover:text-accent-green transition-colors duration-300"
                >
                  SEARCH
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-paragraph text-lg text-secondary hover:text-accent-green transition-colors duration-300"
                >
                  CONTACT
                </a>
                <a 
                  href="#donate" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-accent-green text-primary-foreground font-paragraph text-base font-bold px-8 py-3 text-center hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300"
                >
                  DONATE NOW
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
