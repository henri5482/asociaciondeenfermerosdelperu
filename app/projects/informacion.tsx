"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Adjust path if your shadcn components are elsewhere
import { motion } from 'framer-motion';

const Informacion = () => {
  // Define animation variants for Framer Motion
  const questionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const faqItems = [
    {
      question: "¿Cuándo recibiré el mío?",
      answer: "Si eres Plus, cuando completes un curso que hayas comprado recibirás tu certificado personalizado al instante.",
    },
    {
      question: "¿Dónde puedo verlos?",
      answer: "Puedes ver todos tus certificados y el progreso de tus cursos en tu perfil, dentro de la sección 'Mis cursos'.",
    },
    {
      question: "¿En qué formato son?",
      answer: "Los certificados son digitales y vienen en formato PDF de alta calidad, listos para imprimir o compartir online.",
    },
    {
      question: "¿Cuánto duran?",
      answer: "Una vez que recibes tu certificado, es tuyo para siempre. No tienen fecha de caducidad.",
    },
  ];

  return (
    <section className='bg-[#E1F5FE] py-24 md:py-36 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start justify-center gap-16 md:gap-24'>
        {/* Left Section: Main Heading */}
        <motion.div
          className='md:w-1/3 text-center md:text-left sticky md:top-24' // Sticky for better desktop experience
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={questionVariants}
        >
          <h2 className='text-4xl md:text-5xl font-extrabold text-[#26374c] leading-tight drop-shadow-sm'>
            Todo lo que tienes que saber sobre los certificados
          </h2>
        </motion.div>

        {/* Right Section: Accordion FAQ using shadcn/ui */}
        <div className='md:w-2/3 w-full'>
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }} // Stagger animation for each item
              >
                <AccordionItem value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-xl md:text-2xl font-semibold text-[#26374c] hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-[#26374c] pb-4 pr-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Informacion;