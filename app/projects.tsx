"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      setTimeLeft({
        days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
        hours: Math.max(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0),
        minutes: Math.max(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 0),
        seconds: Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0)
      });
    };

    updateCountdown(); // Llamada inicial
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-2 md:pt-4 text-center">
      <div className="text-cyan-300">
        <p className="text-2xl md:text-3xl font-bold">{timeLeft.days}</p>
        <span className="text-xs md:text-sm">Días</span>
      </div>
      <div className="text-cyan-300">
        <p className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</p>
        <span className="text-xs md:text-sm">Horas</span>
      </div>
      <div className="text-cyan-300">
        <p className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</p>
        <span className="text-xs md:text-sm">Min</span>
      </div>
      <div className="text-cyan-300">
        <p className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</p>
        <span className="text-xs md:text-sm">Seg</span>
      </div>
    </div>
  );
}

const courses = [
  {
    src: "/paypal.jpg",
    name: "IA desde Cero",
    titulo: "Programación desde cero con Inteligencia Artificial",
    descripcion:
      "Aprende a programar desde cero integrando la Inteligencia Artificial en todas las etapas del desarrollo de software. Curso presencial en Miraflores, Lima - Perú.",
    fechatext: "Disponible desde el sábado 28 de junio",
    docente: "Centro de Capacitación La Moneda",
    fecha: "2025-06-28T00:00:00",
  },
  {
    src: "/spalding.jpg",
    name: "IA desde Cero",
    titulo: "Programación desde cero con Inteligencia Artificial",
    descripcion:
      "Aprende a programar desde cero integrando la Inteligencia Artificial en todas las etapas del desarrollo de software. Curso presencial en Miraflores, Lima - Perú.",
    fechatext: "Disponible desde el sábado 28 de junio",
    docente: "Centro de Capacitación La Moneda",
    fecha: "2025-06-28T00:00:00",
  },
  {
    src: "/sony.jpg",
    name: "IA desde Cero",
    titulo: "Programación desde cero con Inteligencia Artificial",
    descripcion:
      "Aprende a programar desde cero integrando la Inteligencia Artificial en todas las etapas del desarrollo de software. Curso presencial en Miraflores, Lima - Perú.",
    fechatext: "Disponible desde el sábado 28 de junio",
    docente: "Centro de Capacitación La Moneda",
    fecha: "2025-06-28T00:00:00",
  },
];

export function Projects() {
  return (
    <section className="w-full bg-[#0f1e26] py-12 md:py-20 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-7xl">
        <CarouselContent>
          {courses.map((course, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-[#1a2c3b] rounded-2xl p-6 md:p-10 shadow-2xl transition-all">
                {/* Imagen del curso - Primero en móviles */}
                <div className="w-full md:w-1/2 h-64 sm:h-80 relative rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                  <Image
                    src={course.src}
                    alt={course.name}
                    fill
                    className="object-cover transition duration-300 ease-in-out hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                {/* Contenido del curso - Segundo en móviles */}
                <div className="w-full md:w-1/2 space-y-4 md:space-y-5 text-white order-2 md:order-1">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold inline-block shadow-md">
                    PRÓXIMO LANZAMIENTO
                  </span>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug">
                    {course.titulo}
                  </h2>

                  <p className="text-gray-300 text-sm">{course.fechatext}</p>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {course.descripcion}
                  </p>

                  <p className="text-cyan-300 font-semibold underline cursor-pointer hover:text-cyan-200 transition text-sm md:text-base">
                    Más detalles
                  </p>

                  {/* Usamos el componente CountdownTimer */}
                  <CountdownTimer targetDate={course.fecha} />

                  <Button className="w-full md:w-auto mt-4 md:mt-6 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold transition transform hover:scale-105 text-sm md:text-base">
                    🛒 Compra tu entrada ahora
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navegación - Oculto en móviles */}
        <CarouselPrevious className="hidden lg:flex absolute left-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="hidden lg:flex absolute right-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>
    </section>
  );
}