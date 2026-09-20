'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MaskedLine, easeDrift } from '@/lib/motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms scrubbed to scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const detailY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);



  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-ivory"
    >
      {/* Background Image Layer (warm cafe interior) */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[120%] z-0"
        style={{ y: bgY }}
      >
        {/* We use an image with a warm grade - a subtle sepia/warm filter can be applied via CSS or it can be baked into the image. Here we use mix-blend and bg-color. */}
        <div className="absolute inset-0 bg-[#F5EFE5] mix-blend-color opacity-30 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#292621]/20 to-transparent z-10 pointer-events-none" />
        
        {/* Desktop Video */}
        <motion.video 
          src="/hero-bg2.mp4"
          autoPlay
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover object-center"
          initial={{ scale: 1.06, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ scale: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.4, ease: easeDrift }}
        />
        
        {/* Mobile Video */}
        <motion.video 
          src="/hero-bg-mobile.mp4"
          autoPlay
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover object-center"
          initial={{ scale: 1.06, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ scale: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.4, ease: easeDrift }}
        />
      </motion.div>

      {/* Main Grid Layout */}
      <div className="sentosa-grid relative z-10 h-full">
        
        {/* Typography Block - columns 1-7 */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-start pt-[16vh] lg:pt-0 lg:justify-end pb-[15vh]">
          
          <div className="mb-4 overflow-hidden hidden md:block">
            <motion.p 
              className="font-body text-[12px] uppercase tracking-[0.08em] text-sage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Pratap Nagar · Jaipur
            </motion.p>
          </div>

          {/* Desktop Heading */}
          <h1 className="hidden md:block font-display text-[clamp(56px,8vw,132px)] leading-[0.92] text-espresso mb-8" style={{ fontVariationSettings: '"opsz" 120' }}>
            <MaskedLine delay={0.9}>
              <span className="italic pr-4">Slow</span> mornings,
            </MaskedLine>
            <MaskedLine delay={1.02}>
              <span className="ml-[2ch]">strong coffee.</span>
            </MaskedLine>
          </h1>

          {/* Mobile Heading */}
          <h1 className="block mt-6 md:hidden font-display text-[60px] leading-[0.95] text-espresso mb-8" style={{ fontVariationSettings: '"opsz" 60' }}>
            <MaskedLine delay={0.9}>Where</MaskedLine>
            <MaskedLine delay={1.0}>Coffee</MaskedLine>
            <MaskedLine delay={1.1}>Meets</MaskedLine>
            <MaskedLine delay={1.2}><span className="italic">Comfort.</span></MaskedLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="max-w-[46ch] hidden md:block"
          >
            <p className="font-body text-[18px] leading-relaxed text-charcoal mb-10">
              A corner of Pratap Nagar where the cup is unhurried and the seat is yours for as long as you need it.
            </p>

          </motion.div>

        </div>



      </div>



    </section>
  );
}
