'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

// Using the new webp images provided
const IMAGES = [
  '/gallery/unnamed.webp',
  '/gallery/unnamed (1).webp',
  '/gallery/unnamed (2).webp',
  '/gallery/unnamed (3).webp',
  '/gallery/unnamed (4).webp',
  '/gallery/unnamed (5).webp',
  '/gallery/unnamed (6).webp',
];

const col1 = [IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3], IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[3]];
const col2 = [IMAGES[4], IMAGES[5], IMAGES[6], IMAGES[4], IMAGES[5], IMAGES[6]];

function MarqueeRow({ images, reverse = false, speed = 20 }: { images: string[], reverse?: boolean, speed?: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden flex flex-col justify-center">
      <motion.div
        className="flex flex-row h-full w-max"
        // Move from 0% to -50% for standard leftward scroll, or -50% to 0% for reverse rightward scroll
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {/* Set 1 */}
        <div className="flex flex-row gap-4 md:gap-6 pr-4 md:pr-6 h-full">
          {images.map((src, idx) => (
            <div key={idx} className="h-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0 group cursor-pointer">
              <img 
                src={src} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.34,1.26,0.64,1)] group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
        {/* Set 2 */}
        <div className="flex flex-row gap-4 md:gap-6 pr-4 md:pr-6 h-full">
          {images.map((src, idx) => (
            <div key={idx} className="h-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0 group cursor-pointer">
              <img 
                src={src} 
                alt="Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.34,1.26,0.64,1)] group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="gallery" 
      ref={containerRef} 
      className="relative pt-[calc(75px+20vh)] pb-[calc(100px+20vh)] -mt-[20vh] z-40 flex flex-col overflow-hidden"
    >
      {/* Background Image Layer with Crossfade Mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)'
        }}
      >
        <img 
          src="/gallery-bg.png"
          alt="Sentosa Gallery Background"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img 
          src="/gallery-bg-mobile.png"
          alt="Sentosa Gallery Background Mobile"
          className="block md:hidden w-full h-full object-cover object-center"
        />
        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 px-[28px] md:px-[40px] lg:px-[8vw] mx-auto w-full h-full flex flex-col">
        
        {/* Title Section */}
        <div className="mb-12 text-center flex flex-col items-center shrink-0">
          <motion.h2 
            className="font-display text-[48px] md:text-[64px] text-ivory mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            Ordinary afternoons,<br className="md:hidden" /> kept.
          </motion.h2>
          <motion.p 
            className="font-body text-[16px] text-ivory/80 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Regulars, corner seats, and whatever came out of the oven that morning.
          </motion.p>
        </div>

        {/* Parallel Marquee Grid */}
        <div 
          className="w-full flex flex-col gap-4 md:gap-6 relative overflow-hidden mt-8 md:mt-12"
          style={{ 
            // Creates a soft horizontal fade at the left and right edges
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          {/* Row 1: Scrolls Left */}
          <div className="h-[200px] md:h-[250px] lg:h-[300px] w-full shrink-0">
            <MarqueeRow images={col1} speed={45} />
          </div>
          
          {/* Row 2: Scrolls Right */}
          <div className="h-[200px] md:h-[250px] lg:h-[300px] w-full shrink-0">
            <MarqueeRow images={col2} reverse speed={50} />
          </div>
        </div>
        
      </div>
    </section>
  );
}
