import Footer from '@/app/footer';
import Navbar from '@/app/navbar';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services } from '../data'; // ✅ Importar solo los datos

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find(
    s => s.slug.toLowerCase() === params.slug.toLowerCase()
  );

  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full">
            <Image
              priority
              width={1200}
              height={675}
              src={service.image}
              alt={service.title}
              className="shadow-lg w-full h-auto object-cover"
            />
          </div>

          <div className="w-full">
            <h1 className="text-4xl font-bold mb-8">{service.title}</h1>
            <p className="text-[#7b7b7b] mb-12 text-lg whitespace-pre-line">
              {service.description}
            </p>

            <h2 className="text-2xl font-bold mb-6">Beneficios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <span className="text-[#7b7b7b]">/ {benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
