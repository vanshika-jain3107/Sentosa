'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

export function Menu() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="menu" 
      ref={containerRef} 
      className="relative pt-[calc(40px+20vh)] md:pt-[calc(100px+20vh)] pb-[calc(120px+20vh)] -mt-[20vh] z-30 min-h-[80vh] flex flex-col justify-start md:justify-center"
    >
      
      {/* Background Image Layer with Crossfade Mask */}
      <div 
        className="absolute inset-0 z-0 bg-espresso pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)'
        }}
      >
        <img 
          src="/menu-bg.png"
          alt="Sentosa Menu Background"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img 
          src="/menu-bg-mobile.png"
          alt="Sentosa Menu Background Mobile"
          className="block md:hidden w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-[28px] md:px-[40px] lg:px-[8vw] max-w-xl mx-auto md:mx-0 w-full">
        <motion.h2 
          className="font-display text-[48px] md:text-[64px] text-ivory mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
        >
          Our Menu
        </motion.h2>
        
        <motion.p 
          className="font-body text-[16px] text-ivory/90 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Scan the QR code below to explore our full selection of coffee, cold brews, and all-day plates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <img 
            src="/menu-qr.png" 
            alt="Menu QR Code"
            className="w-[200px] h-[200px] object-cover rounded-lg"
          />
        </motion.div>

        <motion.a 
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-8 py-4 rounded-full border border-ivory/40 text-ivory font-body uppercase tracking-wider text-[13px] hover:bg-ivory hover:text-espresso transition-colors backdrop-blur-sm"
        >
          Download Menu
        </motion.a>
      </div>

    </section>
  );
}
