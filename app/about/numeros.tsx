'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { animate, motion, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface CountingNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ value, duration = 2, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const node = ref.current;
      if (node) {
        animate(0, value, {
          duration: duration,
          onUpdate: (latest) => {
            node.textContent = Math.round(latest).toLocaleString() + suffix;
          },
        });
      }
    }
  }, [value, duration, isInView, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Numeros = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.2 });

  const stats = [
    { id: 1, label: 'ESTUDIANTES INSCRITOS', value: 8000, suffix: '+' },
    { id: 2, label: 'PROFESIONALES CERTIFICADOS', value: 9000, suffix: '+' },
    { id: 3, label: 'HORAS DE CONTENIDO', value: 1500, suffix: '+' },
    { id: 4, label: 'PROYECTOS COMPLETADOS', value: 3000, suffix: '+' },
  ];

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7, // Slightly longer duration
        ease: "easeOut",
        type: "spring",
        stiffness: 120, // Adjusted stiffness for a snappier feel
        damping: 15,    // Adjusted damping
      },
    }),
  };

  return (
    <section className="bg-[#26374c] py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients: Adjusted colors for cohesive blue theme */}
      <div className="absolute inset-0 z-0" ></div>

      <div className="max-w-7xl mx-auto text-center relative z-10" ref={containerRef}>
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#E1F5FE] mb-12 sm:mb-16 md:mb-20 leading-tight"
          initial="hidden"
          animate={isInViewContainer ? "visible" : "hidden"}
          variants={sectionHeaderVariants}
        >
          Nuestro Impacto en <span className="text-[#E1F5FE] drop-shadow-xl">Números</span> {/* Increased drop shadow */}
        </motion.h2>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-12 max-w-full mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#171c26] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group"
              custom={index}
              initial="hidden"
              animate={isInViewContainer ? "visible" : "hidden"}
              variants={statCardVariants}
            >
              {/* Card Border/Glow: Updated colors and added subtle inner glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent transition-all duration-300
                             group-hover:border-[#0d70ae]/40" // Increased border opacity on hover
                style={{
                  background: 'linear-gradient(180deg, rgba(74,168,237,0.08) 0%, transparent 50%)', // Brighter blue for internal gradient
                  boxShadow: 'inset 0 0 15px rgba(13,112,174,0.05)', // Subtle inner glow using base blue
                  mask: 'linear-gradient(white, white) padding-box, linear-gradient(white, white)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'exclude',
                }}
              ></div>

              <div className="relative z-10 text-center">
                <div className="text-5xl min-[1000px]:text-5xl xl:text-6xl font-extrabold text-white mb-2 sm:mb-3"
                     style={{
                       // Stronger, bluer glow for numbers
                       textShadow: '0 0 15px rgba(74,168,237,0.9), 0 0 30px rgba(74,168,237,0.6), 0 0 45px rgba(74,168,237,0.3)'
                     }}>
                  <CountingNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wide font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numeros;