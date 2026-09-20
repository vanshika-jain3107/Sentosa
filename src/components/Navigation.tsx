'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { easeSteam, easePour, easeSettle } from '@/lib/motion';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Reserve', href: '#book' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Header contraction on scroll
  const isScrolled = useTransform(scrollY, [0, 100], [0, 1]);
  const headerHeight = useTransform(isScrolled, [0, 1], ['120px', '84px']);
  const bgOpacity = useTransform(isScrolled, [0, 1], [0, 0.10]);
  const backdropBlur = useTransform(isScrolled, [0, 1], ['0px', '8px']);
  const logoScale = useTransform(isScrolled, [0, 1], [1, 0.85]);

  // Entrance animation delay
  const initialDelay = 0.9;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[110] px-[28px] md:px-[40px] lg:pl-[8vw] lg:pr-[5vw] flex items-center justify-between"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: initialDelay, ease: easeSteam }}
        style={{
          height: headerHeight,
          backgroundColor: useTransform(bgOpacity, o => `rgba(245, 239, 229, ${o})`),
          backdropFilter: useTransform(backdropBlur, b => `blur(${b})`),
        }}
      >
        <motion.div style={{ scale: logoScale, transformOrigin: 'left center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block focus:outline-none">
            <img src="/logo.png" alt="Sentosa Logo" className="h-12 w-auto object-contain" />
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((link, i) => (
            <div key={link.name} className="flex items-center">
              <motion.a
                href={link.href}
                className="group relative font-body font-medium text-[15px] text-espresso px-5 py-2 overflow-hidden flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: initialDelay + 0.3 + i * 0.06, ease: easeSteam }}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[2px]">
                  {link.name}
                </span>
                
                {/* Custom Underline that grows from left, exits right */}
                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-terracotta origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </motion.a>
              {i < navLinks.length - 1 && (
                <div className="w-[1px] h-[14px] bg-sand opacity-60" />
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span 
            className="w-6 h-[2px] bg-espresso block"
            animate={isOpen ? { rotate: 45, y: 8, backgroundColor: '#F5EFE5' } : { rotate: 0, y: 0, backgroundColor: '#292621' }}
            transition={{ duration: 0.3, ease: easeSettle }}
          />
          <motion.span 
            className="w-6 h-[2px] bg-espresso block"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="w-6 h-[2px] bg-espresso block"
            animate={isOpen ? { rotate: -45, y: -8, backgroundColor: '#F5EFE5' } : { rotate: 0, y: 0, backgroundColor: '#292621' }}
            transition={{ duration: 0.3, ease: easeSettle }}
          />
        </button>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-espresso flex flex-col justify-center px-[28px]"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: easeSteam }}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    className="font-display text-[44px] text-ivory block"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: easeSteam }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
