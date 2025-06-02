// components/Planes.tsx
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Definición de tipos para los planes
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  type: 'basic' | 'expert' | 'expert-duo';
  audience: 'personas' | 'empresas';
  billingCycle: 'mensual' | 'anual';
  price: number;
  currency: string;
  oldPrice?: number;
  discountMonths?: number;
  features: PlanFeature[];
  callToAction: string;
  paymentOptions?: {
    installments: number;
    amountPerInstallment: number;
  };
}

// Datos de los planes
const planesData: Plan[] = [
  // Planes para PERSONAS
  {
    id: 'personas-basic',
    name: 'Plan Basic',
    type: 'basic',
    audience: 'personas',
    billingCycle: 'mensual',
    price: 149,
    currency: 'S/',
    features: [
      { text: 'Para 1 estudiante', included: true },
      { text: 'Contenido profesional y actualizado con certificados digitales', included: true },
      { text: 'Certificados físicos para las rutas de aprendizaje profesional', included: false },
      { text: 'Acceso a las escuelas de Startups, Inglés y liderazgo', included: false },
      { text: 'Eventos exclusivos como Platzi Conf', included: false },
      { text: 'Descarga contenido en la app móvil', included: false },
    ],
    callToAction: 'Suscríbete a Plan Basic',
  },
  {
    id: 'personas-expert',
    name: 'Plan Expert',
    type: 'expert',
    audience: 'personas',
    billingCycle: 'anual',
    price: 890,
    currency: 'S/',
    discountMonths: 7,
    features: [
      { text: 'Para 1 estudiante', included: true },
      { text: 'Contenido profesional y actualizado con certificados digitales', included: true },
      { text: 'Certificados físicos para las rutas de aprendizaje profesional', included: true },
      { text: 'Acceso a las escuelas de Startups, Inglés y liderazgo', included: true },
      { text: 'Eventos exclusivos como Platzi Conf', included: true },
      { text: 'Descarga contenido en la app móvil', included: true },
    ],
    callToAction: 'Suscríbete a Plan Expert',
    paymentOptions: {
      installments: 4,
      amountPerInstallment: 223,
    },
  },
  {
    id: 'personas-expert-duo',
    name: 'Plan Expert Duo',
    type: 'expert-duo',
    audience: 'personas',
    billingCycle: 'anual',
    price: 1190, // Precio base para 2 estudiantes
    currency: 'S/',
    discountMonths: 9,
    features: [
      // La característica de estudiantes se gestionará dinámicamente en el render
      { text: 'Contenido profesional y actualizado con certificados digitales', included: true },
      { text: 'Certificados físicos para las rutas de aprendizaje profesional', included: true },
      { text: 'Acceso a las escuelas de Startups, Inglés y liderazgo', included: true },
      { text: 'Eventos exclusivos como Platzi Conf', included: true },
      { text: 'Descarga contenido en la app móvil', included: true },
    ],
    callToAction: 'Suscríbete a Plan Expert Duo',
    paymentOptions: {
      installments: 4,
      amountPerInstallment: 298, // Cuota base para 2 estudiantes
    },
  },

  // Planes para EMPRESAS
  {
    id: 'empresas-startup',
    name: 'Plan Startup',
    type: 'basic',
    audience: 'empresas',
    billingCycle: 'anual',
    price: 2500,
    currency: 'S/',
    features: [
      { text: 'Hasta 5 usuarios', included: true },
      { text: 'Acceso a todo el catálogo', included: true },
      { text: 'Reportes de progreso', included: true },
      { text: 'Soporte prioritario', included: false },
    ],
    callToAction: 'Contáctanos para Plan Startup',
  },
  {
    id: 'empresas-enterprise',
    name: 'Plan Enterprise',
    type: 'expert',
    audience: 'empresas',
    billingCycle: 'anual',
    price: 9999,
    currency: 'S/',
    features: [
      { text: 'Usuarios ilimitados', included: true },
      { text: 'Acceso a todo el catálogo', included: true },
      { text: 'Reportes de progreso avanzados', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Manager de cuenta dedicado', included: true },
    ],
    callToAction: 'Solicitar Demo para Plan Enterprise',
  },
];

const Planes = () => {
  const [currentAudience, setCurrentAudience] = useState<'personas' | 'empresas'>('personas');
  const [expertDuoStudents, setExpertDuoStudents] = useState<'2' | '4'>('2'); // Estado para la opción de estudiantes

  const filteredPlanes = planesData.filter(plan => plan.audience === currentAudience);

  // Define los valores específicos para el Plan Expert Duo de 4 estudiantes
  const expertDuo4StudentsConfig = {
    price: 1590, // Precio para 4 estudiantes
    oldPrice: 1990, // Opcional: un precio "tachado" si quieres mostrar un descuento para 4 estudiantes
    paymentOptions: {
      installments: 4,
      amountPerInstallment: 398, // Cuota para 4 estudiantes
    },
  };

  // Variantes para Framer Motion: Animaciones más rápidas y dinámicas
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const audienceSelectorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 20, mass: 1 } },
  };

  // Determinar las clases de color de fondo para cada tipo de plan
  const getCardBgColor = (type: Plan['type']) => {
    switch (type) {
      case 'expert':
      case 'expert-duo':
        return 'bg-[#26374c]';
      case 'basic':
      default:
        return 'bg-[#26374c]';
    }
  };

  // Determinar el color del borde si es necesario (el Plan Expert tiene un borde verde)
  const getCardBorderColor = (type: Plan['type']) => {
    return type === 'expert' || type === 'expert-duo' ? 'border border-[#2d8d85]' : 'border border-gray-700';
  };

  // Determinar el color del botón
  const getButtonBgColor = (type: Plan['type']) => {
    return type === 'expert' || type === 'expert-duo' ? 'bg-[#00d77d] hover:bg-[#00c06f]' : 'bg-[#373e4a] hover:bg-[#4f5869]';
  };

  return (
    <section className="bg-[#E7F6FE] min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#006394] mb-12 md:mb-16 drop-shadow-lg leading-tight"
        >
          Elige el plan ideal para ti
        </motion.h2>

        {/* Selector de audiencia (Personas / Empresas) */}
        <motion.div
          variants={audienceSelectorVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex rounded-full bg-[#26374c] p-1 mb-10 md:mb-12 shadow-lg flex-wrap justify-center" // Added flex-wrap and justify-center for small screens
          role="tablist"
        >
          <button
            onClick={() => setCurrentAudience('personas')}
            className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === 'personas' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            role="tab"
            aria-selected={currentAudience === 'personas'}
          >
            Personas
            {currentAudience === 'personas' && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-[#4f5869] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
          <button
            onClick={() => setCurrentAudience('empresas')}
            className={`px-5 py-2 sm:px-6 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-colors duration-300 relative z-10 whitespace-nowrap
              ${currentAudience === 'empresas' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            role="tab"
            aria-selected={currentAudience === 'empresas'}
          >
            Empresas
            {currentAudience === 'empresas' && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 bg-[#4f5869] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
              />
            )}
          </button>
        </motion.div>

        {/* Contenedor de los planes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-center" // Adjusted gap for different screens
          >
            {filteredPlanes.map((plan) => {
              // eslint-disable-next-line prefer-const
              let currentPlan = { ...plan };
              // eslint-disable-next-line prefer-const
              let displayFeatures = [...plan.features];

              // Lógica para Expert Duo: ajustar precio, cuotas y características
              if (currentPlan.type === 'expert-duo' && currentAudience === 'personas') {
                let studentFeatureText = '';

                if (expertDuoStudents === '4') {
                  currentPlan.price = expertDuo4StudentsConfig.price;
                  currentPlan.oldPrice = expertDuo4StudentsConfig.oldPrice;
                  currentPlan.paymentOptions = expertDuo4StudentsConfig.paymentOptions;
                  studentFeatureText = '4 estudiantes';
                } else {
                  const originalDuoPlan = planesData.find(p => p.id === 'personas-expert-duo');
                  if (originalDuoPlan) {
                    currentPlan.price = originalDuoPlan.price;
                    currentPlan.oldPrice = originalDuoPlan.oldPrice;
                    currentPlan.paymentOptions = originalDuoPlan.paymentOptions;
                  }
                  studentFeatureText = '2 estudiantes';
                }

                const existingStudentFeatureIndex = displayFeatures.findIndex(f => f.text.includes('estudiantes'));
                if (existingStudentFeatureIndex !== -1) {
                  displayFeatures[existingStudentFeatureIndex] = { text: studentFeatureText, included: true };
                } else {
                  displayFeatures.unshift({ text: studentFeatureText, included: true });
                }
              }
              // Lógica para Plan Basic: asegurar la característica de 1 estudiante
              else if (currentPlan.type === 'basic' && currentAudience === 'personas') {
                const studentFeatureText = 'Para 1 estudiante';
                const existingStudentFeatureIndex = displayFeatures.findIndex(f => f.text.includes('estudiante'));
                if (existingStudentFeatureIndex === -1) {
                  displayFeatures.unshift({ text: studentFeatureText, included: true });
                }
              }

              return (
                <motion.div
                  key={currentPlan.id + expertDuoStudents} // Clave única para forzar la reanimación al cambiar estudiantes
                  variants={itemVariants}
                  className={`
                    relative flex flex-col rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl
                    ${getCardBgColor(currentPlan.type)} 
                    ${getCardBorderColor(currentPlan.type)}
                    ${currentPlan.type === 'expert' ? 'lg:scale-105 lg:z-10' : ''}
                    ${currentPlan.type === 'expert-duo' && currentAudience === 'personas' ? 'md:col-span-2 lg:col-start-3' : ''}
                  `}
                >
                  {/* Etiqueta de AHORRAS X MESES */}
                  {currentPlan.discountMonths && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs sm:text-sm font-bold px-3 py-0.5 sm:px-4 sm:py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                      AHORRAS {currentPlan.discountMonths} MESES
                    </div>
                  )}

                  {/* Encabezado del plan */}
                  <div className="text-left mb-4 sm:mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{currentPlan.name}</h3>
                    <span className="text-gray-400 text-sm">{currentPlan.billingCycle === 'mensual' ? 'Mensual' : 'Anual'}</span>
                    {currentPlan.type === 'expert-duo' && currentAudience === 'personas' && (
                      <div className="flex flex-wrap items-center space-x-3 sm:space-x-4 mt-3"> {/* Adjusted spacing */}
                        <label className="flex items-center text-gray-300 text-sm cursor-pointer mb-1 sm:mb-0"> {/* Adjusted margin-bottom */}
                          <input
                            type="radio"
                            name={`students-${currentPlan.id}`}
                            className="form-radio text-blue-500 mr-2"
                            checked={expertDuoStudents === '2'}
                            onChange={() => setExpertDuoStudents('2')}
                          />
                          2 estudiantes
                        </label>
                        <label className="flex items-center text-gray-300 text-sm cursor-pointer mb-1 sm:mb-0"> {/* Adjusted margin-bottom */}
                          <input
                            type="radio"
                            name={`students-${currentPlan.id}`}
                            className="form-radio text-blue-500 mr-2"
                            checked={expertDuoStudents === '4'}
                            onChange={() => setExpertDuoStudents('4')}
                          />
                          4 estudiantes
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="mb-4 sm:mb-6 flex items-baseline justify-start">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white">
                      {currentPlan.currency}
                      {currentPlan.price.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-gray-400 text-lg sm:text-xl ml-2">/{currentPlan.billingCycle === 'mensual' ? 'mes' : 'año'}</span>
                    {currentPlan.oldPrice && (
                      <span className="text-gray-600 line-through text-base sm:text-lg ml-2 sm:ml-3">
                        {currentPlan.currency}
                        {currentPlan.oldPrice.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">{currentPlan.billingCycle === 'mensual' ? 'Cobro mensual recurrente' : ''}</p>

                  {/* Lista de características (ahora usa displayFeatures) */}
                  <ul className="text-left space-y-3 sm:space-y-4 flex-grow mb-6 sm:mb-8">
                    {displayFeatures.map((feature, index) => (
                      <li key={index} className={`flex items-start ${feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}`}> {/* Changed items-center to items-start for better multi-line text alignment */}
                        {feature.included ? (
                          <FaCheckCircle className="text-green-400 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" /> 
                        ) : (
                          <FaTimesCircle className="text-red-500 mr-3 text-base sm:text-lg flex-shrink-0 mt-1" /> 
                        )}
                        <span className="text-xs sm:text-sm">{feature.text}</span> {/* Adjusted font size */}
                      </li>
                    ))}
                  </ul>

                  {/* Opciones de pago (si aplica) */}
                  {currentPlan.paymentOptions && (
                    <div className="bg-[#26374c] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center text-xs sm:text-sm text-gray-300 shadow-inner"> {/* Adjusted padding and text size */}
                      <p>
                        Paga a <span className="font-bold">{currentPlan.paymentOptions.installments} cuotas</span> sin intereses de <span className="font-bold">
                          {currentPlan.currency}
                          {currentPlan.paymentOptions.amountPerInstallment.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Botón de llamada a la acción */}
                  <button
                    className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white transition-colors duration-300 shadow-lg
                      ${getButtonBgColor(currentPlan.type)}`}
                  >
                    {currentPlan.callToAction}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Planes;