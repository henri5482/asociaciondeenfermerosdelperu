
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Jesus Espinoza",
    role: "🇵🇪",
    avatar: "/avatar1.jpg",
    comment:
      "Simplemente FELICITACIONES y así mismo con Mayúscula! Durante años he participado en curso de fundamentos de programación y ninguno se compara con la calidad, el contenido, la pedagogía y la metodología que ustedes tienen.",
    rating: 5,
  },
  {
    id: 2,
    name: "Catalina Navarrete",
    role: "🇲🇽",
    avatar: "/avatar2.jpg",
    comment:
      "Voy a la mitad de la carrera de 'Ingeniería en Informática' en México. En todos esos años jamás aprendí todo lo que se aprendió en este curso. Si fue muy teórico o no, realmente es algo que se necesita saber, es la base para cualquier programador.",
    rating: 4,
  },
  {
    id: 3,
    name: "Juan Montiel",
    role: "🇦🇷",
    avatar: "/avatar3.jpg",
    comment:
      "El curso me sirvió para poder dar el primer paso en mi aprendizaje sobre Python. Agradezco sinceramente este curso que parte desde la base y no da nada por sentado.",
    rating: 5,
  },
];

export default function SuccessStoriesCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Handle responsive layout
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Set up event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tú puedes ser la próxima <span className="text-primary">historia de éxito</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-base sm:text-lg lg:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Así como ellos tú también puedes alcanzar tus metas.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className={`pl-2 sm:pl-4 ${
                  isMobile ? 'basis-full' : isTablet ? 'basis-3/4' : 'basis-1/2'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="p-4 sm:p-6 lg:p-8 bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg sm:shadow-xl h-auto sm:h-[280px] lg:h-[300px] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-start gap-3 sm:gap-4 p-0 pb-4 sm:pb-6">
                      <Avatar className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl font-semibold">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm sm:text-base">{testimonial.role}</CardDescription>
                        <div className="flex items-center gap-1 mt-1 sm:mt-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                i < testimonial.rating
                                  ? 'fill-primary text-primary'
                                  : 'fill-muted text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 text-base sm:text-lg leading-relaxed">
                      <blockquote className="italic text-muted-foreground pl-3 sm:pl-4 border-l-4 border-primary/30 text-sm sm:text-base">
                        &quot;{testimonial.comment}&quot;
                      </blockquote>
                      <Button variant="link" className="mt-4 sm:mt-6 px-0 text-primary hover:text-primary/80 text-sm sm:text-base">
                        Lee la historia completa →
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation controls - hidden on very small screens */}
          <div className={`${isMobile ? 'hidden' : 'block'}`}>
            <CarouselPrevious className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 bg-primary text-white z-10" />
            <CarouselNext className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 bg-primary text-white z-10" />
          </div>
        </Carousel>
      </div>
      
      {/* Mobile indicators */}
      {isMobile && (
        <div className="flex justify-center mt-4 gap-2">
          {testimonials.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-primary/30"
            />
          ))}
        </div>
      )}
    </div>
  );
}