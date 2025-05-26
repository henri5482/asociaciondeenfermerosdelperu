"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Importar icono de cargando de Lucide
import React, { useState } from "react"; // Asegúrate de importar React

const WHATSAPP_PHONE_NUMBER = "51918237837"; // ¡CAMBIA ESTO por tu número de WhatsApp real con código de país! (ej: 51912345678)

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Corrección para el error TS7006 en handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Corrección para el error TS7006 en handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    // Validaciones básicas
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setFeedback("Por favor, rellena todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    // Construir el mensaje de WhatsApp
    const whatsappMessage = `
¡Hola! Me gustaría postularme para enseñar .

Mis datos son:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}

Mensaje:
${formData.message}

Por favor, adjunto mi CV en este chat.
    `.trim();

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Construir la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, "_blank"); // Abre WhatsApp en una nueva pestaña
      setFeedback("¡Redirigiendo a WhatsApp! Por favor, adjunta tu CV en el chat.");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al abrir WhatsApp:", error);
      setFeedback("Hubo un problema al abrir WhatsApp. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonHoverTap = {
    hover: { scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 17 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-[#26374c] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        className="w-full max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-slate-800 border-slate-700 shadow-xl overflow-hidden rounded-xl p-6 sm:p-8">
          <CardHeader className="text-center mb-6">
            <CardTitle className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Contáctanos para enseñar
            </CardTitle>
            <CardDescription className="text-slate-400 text-base sm:text-lg">
              Rellena el formulario y serás redirigido a WhatsApp para que adjuntes tu CV.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="name" className="text-slate-300 mb-2 block">
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre" // Corregido: no había comillas dobles aquí.
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-slate-300 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.email@example.com" // Corregido: no había comillas dobles aquí.
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="phone" className="text-slate-300 mb-2 block">
                  Número de Teléfono (con código de país)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+51987654321" // Corregido: no había comillas dobles aquí.
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="message" className="text-slate-300 mb-2 block">
                  Cuéntanos un poco sobre tu experiencia (¿Qué temas te gustaría enseñar?)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..." // Corregido: no había comillas dobles aquí.
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  required
                />
              </motion.div>

              {/* Nota para el CV */}
              <motion.div variants={itemVariants}>
                <p className="text-sm text-slate-400 mt-4 text-center">
                  Una vez que hagas clic en Enviar y Contactar por WhatsApp, serás redirigido a un chat de WhatsApp. Por favor, **adjunta tu CV manualmente** en ese chat.
                </p>
              </motion.div>

              {feedback && (
                <motion.p
                  className={`text-center text-sm font-medium ${
                    feedback.includes("problema") ? "text-red-400" : "text-green-400"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {feedback}
                </motion.p>
              )}

              <motion.div {...buttonHoverTap} className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Redirigiendo..." : "Enviar y Contactar por WhatsApp"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Contacto;