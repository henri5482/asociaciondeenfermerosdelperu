"use client";

import React, { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const formatNumber = (num: string): string => {
    if (num.includes("%")) {
      return num;
    }
    if (num.includes("$")) {
      return `$${num.replace(/[^0-9]/g, "")}+`;
    }
    return `${num.replace(/[^0-9]/g, "")}+`;
  };

  return (
    <div ref={cardRef} className="bg-[#fada4e] p-6 shadow-sm">
      <div className="h-14 ">
        <div
          className={`text-5xl font-bold mb-2 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {formatNumber(number)}
        </div>
      </div>
      <div
        className={`text-[#7b7b7b] text-sm transform transition-all duration-700 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { number: "100", label: "Clientes satisfechos" },
    { number: "280", label: "Trabajos realizados" },
    { number: "90", label: "Eventos seguros" },
    { number: "98", label: "Proyectos realizados" },
  ];

  return (
    <div
      className="mx-auto   
     2xl:w-4/5 md:px-16

    
    
    px-6 "
    >
      <Separator className="my-16" />

      <div className="flex flex-col md:flex-row items-start justify-between ">
        <div className="md:w-1/4 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold">Nuestros números:</h2>
          <p className="text-gray-500 mt-4">
            Con cada trabajo que asumimos, nos esforzamos por ofrecer los
            mejores resultados para nuestros clientes.
          </p>
        </div>
        <div className="md:w-2/4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-16" />
    </div>
  );
};

export default Stats;
