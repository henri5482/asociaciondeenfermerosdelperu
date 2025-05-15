"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/services", label: "Servicios" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contáctanos" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mobileMenuOpen) {
      const scrollingUp = latest < prevScrollY;
      const shouldShow = scrollingUp || latest < 50;
      setIsVisible(shouldShow);
      setHasScrolled(latest > 50);
    }
    setPrevScrollY(latest);
  });

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const navbarVariants = {
    initial: isHomePage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: isHomePage && !hasScrolled ? 1.8 : 0
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        className="fixed top-0 left-0 right-0 bg-[#E1F5FE] z-50 shadow-sm"
        initial="initial"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo y nombre */}
            <Link href="/" className="flex items-center space-x-0 group">
              <div className="relative h-12 w-12 md:h-14 md:w-16">
                <Image 
                  src="/logoenfermeria.png" 
                  alt="Logo Asociación de Enfermeros"
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                />
              </div>
      <h1 className="text-lg md:text-xl font-black text-[#0d70af] tracking-wider uppercase">
  ASOCIACIÓN DE ENFERMEROS
</h1>
            </Link>

            {/* Menú desktop */}
           <div className="hidden md:flex items-center">
  {links.map((link, index) => (
    <div key={link.href} className="flex items-center">
      <Link
        href={link.href}
        className={`relative px-4 py-1 font-medium ${
          pathname === link.href 
            ? "text-[#0d70af] font-semibold" 
            : "text-[#0d70af] hover:text-blue-900"
        } transition-colors duration-200`}
      >
        {link.label}
        {pathname === link.href && (
          <motion.span 
            layoutId="nav-underline"
            className="absolute left-0 bottom-0 w-full h-0.5 bg-[#0d70af]"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
      {/* Añade la línea divisoria excepto después del último elemento */}
      {index < links.length - 1 && (
        <span className="text-[#0d70af] mx-1">|</span>
      )}
    </div>
  ))}
</div>

            {/* Botón móvil */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d70af]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0d70af]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0d70af]" />
              )}
            </button>
          </div>

          {/* Menú móvil */}
          <motion.div
            initial="closed"
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={menuVariants}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-3 pt-4 pb-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md ${
                    pathname === link.href
                      ? "bg-[#0d70af] text-white font-medium"
                      : "text-[#0d70af] hover:bg-blue-50"
                  } transition-colors duration-200`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Overlay móvil */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;


