'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easeSteam, easePour, easeSettle, MaskedLine } from '@/lib/motion';

function LiveStatus() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      if (hours >= 8 && hours < 22) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isOpen === null) return null;

  return (
    <div className="flex items-center gap-2 mt-4 font-body text-[14px]">
      <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-terracotta' : 'bg-ivory/70'}`} />
      <span className={isOpen ? 'text-terracotta' : 'text-ivory/70'}>
        {isOpen ? 'Open now' : 'Closed'}
      </span>
    </div>
  );
}

function ContactRow({ label, href, delay }: { label: string, href: string, delay: number }) {
  return (
    <motion.a 
      href={href}
      className="group flex items-center relative py-4 border-b border-transparent overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, delay, ease: easeSteam }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px]">
        <motion.div 
          className="w-full h-full bg-ivory/30 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.7, delay, ease: easePour }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px]">
        <motion.div 
          className="w-full h-full bg-ivory/30 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.7, delay, ease: easePour }}
        />
      </div>

      <div className="flex items-center">
        <span className="text-terracotta opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.26,0.64,1)] mr-3">
          →
        </span>
        <span className="font-body text-[15px] text-ivory transition-transform duration-300 ease-[cubic-bezier(0.34,1.26,0.64,1)] group-hover:translate-x-1">
          {label}
        </span>
      </div>
    </motion.a>
  );
}

function Field({ 
  label, 
  type = "text", 
  className = "", 
  error, 
  value, 
  onChange, 
  delay = 0 
}: {
  label: string,
  type?: string,
  className?: string,
  error?: string,
  value: string,
  onChange: (v: string) => void,
  delay?: number
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  
  return (
    <div className={`relative pt-[24px] pb-[8px] mb-8 ${className}`}>
      <motion.label 
        className="absolute left-0 text-ivory/70 font-body origin-left pointer-events-none"
        initial={{ y: 0, scale: 1 }}
        animate={{ 
          y: isActive ? -22 : 0, 
          scale: isActive ? (11/18) : 1,
          color: error ? '#C94B45' : isActive ? '#F5EFE5' : 'rgba(245, 239, 229, 0.7)'
        }}
        transition={{ duration: 0.32, ease: easePour }}
        style={{ fontSize: '18px' }}
      >
        {label}
      </motion.label>
      
      <input 
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent outline-none font-body text-[18px] text-ivory relative z-10"
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[1px] bg-ivory/30 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: easePour }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px] origin-left"
        style={{ backgroundColor: error ? '#C94B45' : '#C94B45' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (isFocused || error) ? 1 : 0 }}
        transition={{ duration: 0.32, ease: easePour }}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            className="absolute -bottom-[20px] left-0 font-body text-[12px] text-terracotta"
            initial={{ opacity: 0, x: -3 }}
            animate={{ 
              opacity: 1, 
              x: [0, 3, -3, 0], 
            }}
            transition={{ 
              opacity: { duration: 0.2 }, 
              x: { duration: 0.18, ease: easeSettle, repeat: 1 } 
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Booking() {
  const [formData, setFormData] = useState({ name: '', date: '', time: '', guests: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Please provide a name';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests) newErrors.guests = 'Number of guests is required';
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStatus('submitting');
      
      const message = `*New Table Booking Request*
*Name:* ${formData.name}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Guests:* ${formData.guests}
${formData.notes ? `*Notes:* ${formData.notes}` : ''}`.trim();

      const whatsappUrl = `https://wa.me/918949152570?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      setStatus('success');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', date: '', time: '', guests: '', notes: '' });
    setStatus('idle');
  };

  return (
    <section id="book" className="relative pt-[calc(140px+20vh)] pb-[calc(160px+20vh)] -mt-[20vh] z-50">
      {/* Background Layer with Crossfade Mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20vh)'
        }}
      >
        <img 
          src="/booking-bg.png"
          alt="Sentosa Booking Background"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img 
          src="/booking-bg-mobile.png"
          alt="Sentosa Booking Background Mobile"
          className="block md:hidden w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="sentosa-grid relative z-10">
        
        {/* Left Column: Booking Form & Contact Details (Cols 1-5) */}
        <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0 flex flex-col">
          <h2 className="font-display text-[44px] lg:text-[56px] text-ivory leading-[1.05] mb-8" style={{ fontVariationSettings: '"opsz" 56' }}>
            <MaskedLine>Save yourself</MaskedLine>
            <MaskedLine delay={0.1}>
              a <span className="italic">seat.</span>
            </MaskedLine>
          </h2>
          
          <motion.p 
            className="font-body text-[14px] text-ivory/80 leading-[1.6] max-w-[34ch]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Walk-ins are always welcome, but a message ahead means the good corner table is waiting. We'll confirm on WhatsApp. Open daily until 10 PM.
          </motion.p>
          
          {/* Form Area */}
          <div className="mt-8 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col relative"
                  exit={{ clipPath: 'inset(0 0 100% 0)' }}
                  transition={{ duration: 0.6, ease: easeSteam }}
                >
                  <Field 
                    label="Name" 
                    value={formData.name} 
                    onChange={v => setFormData({...formData, name: v})}
                    error={errors.name}
                    delay={0.1}
                  />
                  
                  <div className="flex gap-[40px] w-full">
                    <Field 
                      label="Date" 
                      className="w-[60%]"
                      value={formData.date} 
                      onChange={v => setFormData({...formData, date: v})}
                      error={errors.date}
                      delay={0.19}
                    />
                    <Field 
                      label="Time" 
                      className="w-[40%]"
                      value={formData.time} 
                      onChange={v => setFormData({...formData, time: v})}
                      error={errors.time}
                      delay={0.28}
                    />
                  </div>

                  <div className="w-[40%]">
                    <Field 
                      label="Guests" 
                      value={formData.guests} 
                      onChange={v => setFormData({...formData, guests: v})}
                      error={errors.guests}
                      delay={0.37}
                    />
                  </div>

                  <Field 
                    label="Notes (Optional)" 
                    value={formData.notes} 
                    onChange={v => setFormData({...formData, notes: v})}
                    delay={0.46}
                  />

                  <div className="mt-8 flex">
                    <button 
                      type="submit"
                      className="group relative bg-terracotta text-ivory px-8 rounded-[2px] overflow-hidden font-body font-medium text-[15px] transition-colors duration-240 ease-[cubic-bezier(0.34,1.26,0.64,1)] hover:bg-[#B3413B] h-[52px] min-w-[160px]"
                    >
                      <AnimatePresence mode="wait">
                        {status === 'idle' ? (
                          <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <span className="block transition-transform duration-240 ease-[cubic-bezier(0.34,1.26,0.64,1)] group-hover:-translate-y-[150%]">
                              Hold my table
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-240 ease-[cubic-bezier(0.34,1.26,0.64,1)] group-hover:translate-y-0">
                              Hold my table
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="progress" 
                            className="absolute inset-0 flex items-center px-4"
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                          >
                            <motion.div 
                              className="h-[2px] bg-ivory origin-left w-full"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 1.5, ease: easePour }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="w-full h-full flex flex-col justify-center items-start pt-[40px]"
                  initial={{ clipPath: 'inset(100% 0 0 0)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)' }}
                  transition={{ duration: 0.6, ease: easeSteam, delay: 0.2 }}
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-[48px] h-[48px]">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <motion.circle 
                          cx="24" cy="24" r="23" 
                          stroke="#C94B45" strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: easeSteam }}
                        />
                        <motion.path 
                          d="M16 24L21 29L32 18" 
                          stroke="#C94B45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-[32px] text-ivory" style={{ fontVariationSettings: '"opsz" 32' }}>
                      Table held. See you soon.
                    </h3>
                  </div>

                  <div className="font-display text-[48px] text-sand opacity-80 mb-12" style={{ fontVariationSettings: '"opsz" 48' }}>
                    {formData.date} <span className="mx-2 font-body font-light">/</span> {formData.time}
                  </div>

                  <button 
                    onClick={resetForm}
                    className="font-body text-[14px] text-ivory underline underline-offset-4 decoration-ivory/30 hover:decoration-ivory transition-colors duration-300"
                  >
                    Book another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Contact Details Merged */}
          <div className="mt-12 lg:mt-20 pt-8 lg:pt-12 border-t border-ivory/20 flex flex-col">
            <p className="font-body text-[12px] uppercase tracking-[0.08em] text-ivory/70 mb-6">
              Find us
            </p>
            <div className="mb-10 font-display text-[20px] text-ivory leading-[1.6] tracking-wide" style={{ fontVariationSettings: '"opsz" 20' }}>
              <div>Sentosa - the coffee unit,</div>
              <div>Haldighati Marg E, near Hdfc bank,</div>
              <div>Sector-22, Pratap Nagar,</div>
              <div>Jaipur, Rajasthan 302033</div>
              <LiveStatus />
            </div>
            
            <div className="flex flex-col">
              <ContactRow label="Phone" href="tel:+918949152570" delay={0.1} />
              <ContactRow label="Email" href="mailto:hello@sentosacoffee.com" delay={0.2} />
              <ContactRow label="Instagram" href="https://instagram.com" delay={0.3} />
            </div>
          </div>
        </div>

        {/* Right Column: Google Maps Embed (Cols 7-12) */}
        <div className="col-span-12 lg:col-start-7 lg:col-span-6 relative h-[450px] lg:h-auto lg:pl-[4vw] mt-8 lg:mt-0 mb-8 lg:mb-0">
          <div className="w-full h-[450px] lg:h-[600px] bg-ivory rounded-[32px] overflow-hidden flex flex-col p-2 shadow-2xl">
            {/* Embedded Google Map */}
            <iframe
              src="https://maps.google.com/maps?q=Sentosa%20-%20the%20coffee%20unit%2C%20Haldighati%20Marg%20E%2C%20near%20Hdfc%20bank%2C%20Sector-22%2C%20Pratap%20Nagar%2C%20Jaipur%2C%20Rajasthan%20302033&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full flex-1 rounded-[24px] border-none"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Directions Button */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Sentosa+-+the+coffee+unit,+Haldighati+Marg+E,+near+Hdfc+bank,+Sector-22,+Pratap+Nagar,+Jaipur,+Rajasthan+302033" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 w-full bg-[#3b3a36] text-ivory flex items-center justify-center font-body font-medium text-[15px] py-4 rounded-[24px] transition-colors duration-300 hover:bg-[#292621]"
            >
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
