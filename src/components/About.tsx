'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { easeSteam, easePour, easeSettle } from '@/lib/motion';



export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripInView = useInView(stripRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Background "01" scrubbed to scroll (-30px to 30px)
  const numeralX = useTransform(scrollYProgress, [0, 1], ['-30px', '30px']);

  const detailCells = [
    {
      top: "4.0 ★",
      label: "49 Google reviews",
    },
    {
      top: "₹400–600",
      label: "for two",
    },
    {
      top: "Open daily",
      label: "until 10 PM",
    }
  ];

  return (
    <section id="about" ref={containerRef} className="relative pt-[calc(40px+20vh)] md:pt-[calc(120px+20vh)] pb-[calc(80px+20vh)] -mt-[20vh] z-20">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-espresso pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)'
        }}
      >
        <img 
          src="/about-bg.png"
          alt="Sentosa About Background"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img 
          src="/about-bg-mobile.png"
          alt="Sentosa About Background"
          className="block md:hidden w-full h-full object-cover object-center"
        />
      </div>

      <div className="sentosa-grid relative z-10 min-h-[60vh] items-center">
        
        {/* Centered Typography Block */}
        <motion.div 
          className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center pt-0 md:pt-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: easeSteam }}
        >
          <p className="font-body text-[12px] uppercase tracking-[0.08em] text-sand mb-8">
            About the unit
          </p>

          <h2 className="font-display text-[48px] md:text-[64px] text-ivory leading-[1.05] mb-10" style={{ fontVariationSettings: '"opsz" 72' }}>
            We built Sentosa around<br />
            <span className="italic relative text-[1.1em]">the pause.</span>
          </h2>

          <div className="font-body text-[17px] text-ivory/80 leading-[1.75] max-w-[52ch] mx-auto space-y-6">
            <p>
              Good coffee, food worth finishing, and a room that doesn't rush you. Some people come here to work, some to talk for three hours, some to sit alone with a cup and say nothing at all.
            </p>
            <p>
              All of it counts. Pull up a chair, order something warm, and stay as long as the day allows.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Detail Buttons */}
      <div className="mt-[60px] md:mt-[80px] w-full relative z-10 flex flex-wrap justify-center gap-4 px-[28px] md:px-[40px]">
        {detailCells.map((cell, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: easeSteam }}
            className="flex flex-col items-center justify-center px-8 py-3 rounded-full border border-ivory/20 bg-espresso/40 backdrop-blur-md transition-colors hover:bg-espresso/60 cursor-default"
          >
            <span className="font-display text-[20px] text-ivory mb-1">{cell.top}</span>
            <span className="font-body text-[10px] uppercase tracking-[0.08em] text-sand">{cell.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
