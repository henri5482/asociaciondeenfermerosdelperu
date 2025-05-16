'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      name: "TOEFL",
      description: "Alianza con ETS para la certificación TOEFL en Inglés",
      logo: "/toefl-logo.png",
      link: "/cursos/toefl",
      color: "blue"
    },
    {
      id: 2,
      name: "Google",
      description: "Convenio de certificación en tecnologías cloud",
      logo: "/google-cloud-logo.png",
      link: "/cursos/google",
      color: "green"
    },
    {
      id: 3,
      name: "SIGUAY",
      description: "Domina la seguridad digital con CompTIA security+",
      logo: "/comptia-logo.png",
      link: "/cursos/siguay",
      color: "purple"
    }
  ];

  const colorVariants = {
    blue: {
      bg: 'bg-blue-50/50 hover:bg-blue-50',
      border: 'border-blue-200',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      bg: 'bg-green-50/50 hover:bg-green-50',
      border: 'border-green-200',
      button: 'bg-green-600 hover:bg-green-700'
    },
    purple: {
      bg: 'bg-purple-50/50 hover:bg-purple-50',
      border: 'border-purple-200',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  };

  return (
    <div className="px-4 sm:px-6 mx-auto max-w-7xl py-12 md:py-24">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 bg-clip-text text-transparent">
          Obtén certificaciones oficiales de:
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Certificaciones reconocidas internacionalmente que impulsarán tu carrera profesional
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card 
                className={`h-full transition-all hover:shadow-lg ${colorVariants[cert.color as keyof typeof colorVariants].bg} ${colorVariants[cert.color as keyof typeof colorVariants].border}`}
              >
                <motion.div whileHover={{ y: -5 }}>
                  <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                    <div className="relative h-12 w-12 mr-4">
                      <Image
                        src={cert.logo}
                        alt={`Logo ${cert.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">{cert.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {cert.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={cert.link} className="w-full">
                      <Button 
                        className={`w-full ${colorVariants[cert.color as keyof typeof colorVariants].button}`}
                        asChild
                      >
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Ir a los cursos
                        </motion.div>
                      </Button>
                    </Link>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Certifications;