'use client';

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import Footer from "../footer";
import Navbar from "../navbar";
import Brands from "./brands";
import Impact from "./impact";
import Industries from "./industries";
import Process from "./process";

import { services } from "./data"; // ✅ Cambiado aquí

const Services = () => {
  return (
    <div className="md:min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <div className="mx-auto flex items-center">
          <div className="md:w-2/3">
            <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold mb-8">
              Servicios de Seguridad Adaptados a Tus Necesidades
            </h1>
            <p className="text-xl text-neutral-500">
              Nuestra experiencia en seguridad y desarrollo tecnológico...
            </p>
          </div>
        </div>
      </div>

      <Brands />
      <Separator className="my-16" />

      <div className="md:py-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <h2 className="text-xl font-bold text-[#7b7b7b] mb-10">/ Our Services</h2>

        <div className="space-y-16 md:space-y-32">
          {services.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              key={index}
              className="block hover:bg-gray-50 transition-colors p-4 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="w-full">
                  <Image
                    priority
                    width={1200}
                    height={675}
                    src={service.image}
                    alt={service.title}
                    className="shadow-lg md:w-[640px] h-[400px] object-cover"
                  />
                </div>
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-8">{service.title}</h2>
                  <p className="text-[#7b7b7b] mb-12">{service.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div className="flex items-center space-x-2" key={benefitIndex}>
                        <span className="text-[#7b7b7b]">/ {benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Process />
      <Impact />
      <Industries />
      <Footer />
    </div>
  );
};

export default Services;
