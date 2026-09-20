'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { easeSettle } from '@/lib/motion';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const columnVariants = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: (custom: number) => ({
      clipPath: 'inset(0% 0 0 0)', 
      transition: { duration: 0.6, delay: custom * 0.07, ease: easeSettle }
    })
  };

  return (
    <footer 
      ref={containerRef} 
      className="bg-[#3b3a36] pt-[140px] md:pt-[180px] relative overflow-hidden flex flex-col justify-between min-h-[50vh] -mt-[120px] z-50"
      style={{ borderTopLeftRadius: '50% 120px', borderTopRightRadius: '50% 120px' }}
    >
      <div className="sentosa-grid relative z-10 flex-grow px-4 md:px-0">
        
        {/* Left Column: Address (Cols 1-4) */}
        <motion.div 
          className="col-span-12 lg:col-span-4 mb-12 lg:mb-0 flex flex-col"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={columnVariants}
        >
          <div className="font-display text-[26px] font-light tracking-wide text-ivory mb-6">
            Address
          </div>
          <div className="font-body text-[16px] text-ivory/80 leading-[1.8] font-light max-w-[28ch]">
            Sentosa - the coffee unit,<br />
            Haldighati Marg E, near Hdfc bank,<br />
            Sector-22, Pratap Nagar,<br />
            Jaipur, Rajasthan 302033
          </div>
        </motion.div>

        {/* Middle Column: Opening Hours (Cols 6-8) */}
        <motion.div 
          className="col-span-12 lg:col-start-6 lg:col-span-3 mb-12 lg:mb-0"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={columnVariants}
        >
          <div className="font-display text-[26px] font-light tracking-wide text-ivory mb-6">
            Opening Hours
          </div>
          <div className="font-body text-[16px] text-ivory/80 leading-[1.8] font-light">
            8:00 AM - 10:00 PM
          </div>
        </motion.div>

        {/* Right Column: Contact Us (Cols 10-12) */}
        <motion.div 
          className="col-span-12 lg:col-start-10 lg:col-span-3"
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={columnVariants}
        >
          <div className="font-display text-[26px] font-light tracking-wide text-ivory mb-6">
            Contact Us
          </div>
          <div className="font-body text-[16px] text-ivory/80 leading-[1.8] font-light mb-6">
            +91 89491 52570
          </div>
          <a 
            href="https://wa.me/918949152570" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#292621] text-[#e5dfd3] font-body text-[13px] px-6 py-3 hover:bg-[#1a1815] transition-colors duration-300"
          >
            Chat on WhatsApp
          </a>
        </motion.div>

      </div>

      {/* Bottom Rule & Copyright */}
      <div className="relative z-20 w-full bg-[#3b3a36] pb-8 pt-[80px]">
        <div className="px-[28px] md:px-[40px] lg:px-[8vw]">
          <div className="w-full h-[1px] bg-sand/30 mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-body text-[13px] text-ivory/80">
              © 2026 by Sentosa - the coffee unit.
            </div>
            
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:opacity-80 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
