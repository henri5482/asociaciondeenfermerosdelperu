"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/cursosall", label: "Cursos" },
  { href: "/projects", label: "Certificados" },
  { href: "/docentes", label: "Profesores" },
  { href: "/about", label: "Nosotros" },
  { href: "/profesor", label: "Trabaja con nosotros" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // --- Animation Logic for Navbar Visibility on Scroll ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!mobileMenuOpen) {
      const isAtTop = latest < 50;
      const scrollingUp = latest < prevScrollY;
      setIsVisible(isAtTop || scrollingUp);
      setHasScrolled(latest > 50);
    } else {
      setIsVisible(true);
    }
    setPrevScrollY(latest);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // --- Framer Motion Variants ---

  const mobileMenuContainerVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 250, // Slightly less stiff for a smoother feel
        damping: 25, // Adjusted damping
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    closed: {
      x: "100%",
      opacity: 0, // Fades out completely for a cleaner exit
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuItemVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: -10, transition: { duration: 0.15 } }, // Smaller slide for faster exit
  };

  const navbarVariants = {
    initial: isHomePage ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: isHomePage && !hasScrolled ? 1.5 : 0,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      color: "#1a5b9b",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    initial: {
      scale: 1,
      color: "#0d70af",
    },
  };

  return (
    <AnimatePresence>
      <motion.nav
        key="navbar"
        className="fixed top-0 left-0 right-0 bg-[#E1F5FE] z-50 shadow-sm"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center relative z-50">
            {/* Logo y nombre */}
            <Link href="/" className="flex items-center group relative h-12 w-48 md:h-16 md:w-64 lg:w-80 xl:w-96">
              <motion.div
                className="relative h-full w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/logo02.webp"
                  alt="Logo Asociación de Enfermeros"
                  fill
                  sizes="(max-width: 768px) 192px, (max-width: 1200px) 256px, 384px"
                  className="object-contain object-left transition-transform group-hover:scale-105"
                  priority
                />
              </motion.div>
            </Link>

            {/* Menú desktop */}
            <div className="hidden md:flex items-center">
              {links.map((link, index) => (
                <div key={link.href} className="flex items-center">
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    variants={linkHoverVariants}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-4 py-1 font-medium text-[#0d70af] ${
                        pathname === link.href ? "font-semibold" : ""
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
                  </motion.div>
                  {index < links.length - 1 && (
                    <span className="text-[#0d70af] mx-1 opacity-70">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Botón móvil (Hamburguesa / X) */}
            <motion.button
              className="md:hidden p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d70af] transition-transform duration-200 z-[100]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú de navegación"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-8 h-8 text-[#0d70af]" />
              ) : (
                <Menu className="w-8 h-8 text-[#0d70af]" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Contenedor principal para el menú móvil y el overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay (behind the menu, captures clicks to close) */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden" // Slightly darker overlay
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menú móvil deslizante desde la derecha, estilo Shadcn/UI */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuContainerVariants}
                className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#E1F5FE] shadow-xl md:hidden z-50 flex flex-col border-l border-gray-200" // bg-white, sharper shadow, border
              >
                {/* Header del menú con botón de cierre */}
                <div className="flex justify-end p-4 border-b bg-[#E1F5FE]"> {/* Added border-b for separation */}
                  <motion.button
                    className="p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-transform duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-7 h-7 text-gray-500 hover:text-gray-700" /> {/* Neutral icon color */}
                  </motion.button>
                </div>

                {/* Contenido del menú */}
                <div className="flex flex-col p-4 space-y-2 overflow-y-auto flex-grow"> {/* space-y-2, overflow-y-auto, flex-grow */}
                  {links.map((link) => (
                    <motion.div key={link.href} variants={mobileMenuItemVariants} className="w-full">
                      <Link
                        href={link.href}
                        className={`
                          block w-full text-left py-2 px-3 rounded-md text-base font-medium
                          text-gray-700 hover:text-gray-900 hover:bg-gray-100
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                          transition-all duration-200
                          ${pathname === link.href ? "bg-blue-50 text-blue-700" : ""}
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                 {/* Optional: Add a footer or branding at the bottom of the mobile menu */}
                 <div className="p-4 border-t border-gray-200 text-sm text-gray-500 text-center">
                    <p>© 2025 Tu Asociación. Todos los derechos reservados.</p>
                 </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;