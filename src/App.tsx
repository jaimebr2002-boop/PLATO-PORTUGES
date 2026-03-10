/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Star,
  Menu as MenuIcon,
  X as CloseIcon,
  Quote
} from 'lucide-react';

// Constants
const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=34637110757&text=Hola,%20me%20gustaría%20reservar%20una%20mesa%20en%20Plato%20Portugués&type=phone_number&app_absent=0";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.5683416538!2d-6.4895717234857!3d39.45011601351165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd167498a5fdec75%3A0x932f114592e09eee!2sPlato%20portugu%C3%AAs!5e0!3m2!1ses!2ses!4v1710098200000!5m2!1ses!2ses";
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Plato+portugu%C3%AAs/@39.45012,-6.4918677,17z/data=!3m1!4b1!4m6!3m5!1s0xd167498a5fdec75:0x932f114592e09eee!8m2!3d39.450116!4d-6.4869968!16s%2Fg%2F11kn6qglxd?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D";
const REVIEWS_LINK = "https://www.google.com/maps/place/Plato+portugu%C3%AAs/@39.45012,-6.4918677,17z/data=!4m8!3m7!1s0xd167498a5fdec75:0x932f114592e09eee!8m2!3d39.450116!4d-6.4869968!9m1!1b1!16s%2Fg%2F11kn6qglxd?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D";
const TRIPADVISOR_LINK = "https://www.tripadvisor.es/Restaurant_Review-g1028244-d23161424-Reviews-Plato_Portugues-Malpartida_de_Caceres_Province_of_Caceres_Extremadura.html";

const REVIEWS = [
  {
    text: "Comida buena y a buen precio. Pongo 4 estrellas porque nos pareció el arroz de marisco con muy poco caldo y un poco pasado. No había hoy mucho postre para elegir.",
    author: "Usuario 1"
  },
  {
    text: "Restaurante integrado en un polígono industrial, con buena cocina y pequeño salón, pero acogedor. Todo riquísimo y con buena cantidad.",
    author: "DANIEL RODRIGUEZ ESCUDERO"
  },
  {
    text: "Buena comida. El menú es reducido pero está rico y cocinado con gusto. Precio muy razonable y cantidad estupenda.",
    author: "Ramón Gómez Rivera"
  },
  {
    text: "Auténtica cocina portuguesa, pescados y mariscos de calidad. Las raciones son generosas y el servicio esmerado.",
    author: "Hub vanx"
  },
  {
    text: "Comida casera auténtica portuguesa. Restaurante familiar con ambiente tranquilo y comida de calidad.",
    author: "Agricultura SXXI siglo21"
  },
  {
    text: "Gran elección. Bacalao daurado y pulpo de los entrantes excelentes. Carta no muy extensa, pero todo delicioso.",
    author: "Mariví Marpe"
  },
  {
    text: "Comimos en familia y fue una buena experiencia. Destacar el trato y la calidad de la comida.",
    author: "Pablo Gonzalez Pinilla"
  },
  {
    text: "Comida auténtica portuguesa, con bacalao a la dorada y entrecot a la piedra. Trato cercano y amable.",
    author: "Sergio B"
  },
  {
    text: "Restaurante agradable, personal profesional, platos abundantes y exquisitos.",
    author: "Diego Moreno Guijo"
  },
  {
    text: "Restaurante regentado por una familia portuguesa. Comida de 10 y personal amable.",
    author: "Carmen"
  },
  {
    text: "Comida buenísima. Precio muy bueno. Experiencia de 10.",
    author: "Centro Veterinario Aabem"
  },
  {
    text: "Simplemente espectacular. El trato del dueño ha sido increíble y la comida impresionante.",
    author: "Guadalupe Conejero Cortes"
  },
  {
    text: "Comida portuguesa muy rica, platos abundantes, buen servicio y ambiente agradable.",
    author: "José M. (Hurricane)"
  },
  {
    text: "La comida estaba muy rica. Calidad precio muy bien.",
    author: "Antonio Mostazo"
  },
  {
    text: "Auténtica comida portuguesa en Cáceres. Carne a la piedra exquisita.",
    author: "Obdulia Chico"
  }
];

const MENU_ITEMS = [
  {
    name: "Bacalao a la Brasa Portugués",
    description: "Nuestro plato estrella, cocinado lentamente al carbón con guarnición tradicional.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/2-9_hxwcsj.webp"
  },
  {
    name: "Bacalao à Brás (Dourado)",
    description: "Clásico desmenuzado con patata paja, huevo y perejil. Un sabor suave y tradicional.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/3-2_syte73.webp"
  },
  {
    name: "Bacalhau com Natas",
    description: "Bacalao desmenuzado con patatas y crema gratinada al horno. Cremoso y reconfortante.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/5-2_r2ravp.webp"
  },
  {
    name: "Pulpo a la Brasa",
    description: "Pulpo tierno a la parrilla con sabor ahumado y guarnición de la casa.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/1-4_wgmg70.webp"
  },
  {
    name: "Langostillos al Ajillo",
    description: "Langostillos frescos salteados en aceite de oliva con ajo dorado y guindilla.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/8-7_ibdhzh.webp"
  },
  {
    name: "Almejas con Salsa Verde",
    description: "Almejas frescas en salsa mediterránea de perejil, ajo, vino blanco y aceite de oliva.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/7-7_ugnwgo.webp"
  },
  {
    name: "Arroz de Marisco",
    description: "Arroz meloso, lleno de sabor y con una selección de los mejores mariscos.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/6-2_g7jth5.webp"
  },
  {
    name: "Arroz de Pulpo",
    description: "Arroz meloso con pulpo tierno, perfecto para compartir.",
    image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/4-0_auwwmr.webp"
  }
];

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(REVIEWS.length / 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="relative group">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex"
        >
          {[...Array(totalSlides)].map((_, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {REVIEWS.slice(slideIdx * 3, slideIdx * 3 + 3).map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-portugal-beige/30 p-8 rounded-3xl border border-portugal-terracota/10 flex flex-col h-full"
                >
                  <Quote className="text-portugal-terracota/20 mb-6" size={40} />
                  <p className="text-lg text-portugal-ink/80 italic mb-8 flex-grow leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-portugal-terracota/10 pt-6">
                    <div className="w-10 h-10 rounded-full bg-portugal-terracota flex items-center justify-center text-white font-bold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-portugal-ink">{review.author}</h4>
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={12} />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-portugal-terracota hover:bg-portugal-terracota hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-portugal-terracota hover:bg-portugal-terracota hover:text-white transition-all z-10 opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {[...Array(totalSlides)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === i ? 'bg-portugal-terracota w-8' : 'bg-portugal-terracota/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298L17.607 20.65z"/>
  </svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src="https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166880/Dise%C3%B1o_sin_t%C3%ADtulo_22_hsc1dh.webp" 
              alt="Plato Portugués Logo" 
              className="h-12 w-12 object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
            <span className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-portugal-ink' : 'text-white'}`}>
              Plato Portugués
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Sobre Nosotros', 'La Carta', 'Reseñas', 'Visítanos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-portugal-ink hover:text-portugal-terracota' : 'text-white/80 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-portugal-terracota text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-portugal-terracota/90 transition-all shadow-lg hover:scale-105"
            >
              Reservar
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <CloseIcon className={scrolled ? 'text-portugal-ink' : 'text-white'} />
            ) : (
              <MenuIcon className={scrolled ? 'text-portugal-ink' : 'text-white'} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {['Sobre Nosotros', 'La Carta', 'Reseñas', 'Visítanos'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-2xl font-serif text-portugal-ink"
                >
                  {item}
                </button>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-portugal-terracota text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest"
              >
                Reservar Mesa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Interactive Image Accordion */}
      <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
        {/* Accordion Panels */}
        <div className="flex h-full w-full">
          {[
            {
              title: "Bacalao Tradicional",
              image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/2-9_hxwcsj.webp",
            },
            {
              title: "Carnes y Brasas",
              image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/7-7_ugnwgo.webp",
            },
            {
              title: "Vinos de Oporto",
              image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/6-2_g7jth5.webp",
            },
            {
              title: "Pasteles de Nata",
              image: "https://res.cloudinary.com/dfbsqy5ul/image/upload/v1773166881/1-4_wgmg70.webp",
            },
          ].map((panel, idx) => (
            <div
              key={idx}
              className="relative flex-1 hover:flex-[4] transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden group border-r border-white/10 last:border-r-0"
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.6] transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Fixed Central Content Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-9xl text-white mb-4 font-serif font-bold tracking-tighter drop-shadow-2xl uppercase">
                Plato Portugués
              </h1>
              <p className="text-xl md:text-3xl text-white/90 mb-12 font-light tracking-[0.2em] uppercase italic drop-shadow-lg">
                La auténtica esencia de Portugal en cada bocado
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-portugal-terracota text-white px-12 py-5 rounded-full text-lg font-bold uppercase tracking-[0.15em] hover:bg-portugal-terracota/90 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  <WhatsAppIcon size={22} />
                  Reservar Mesa
                </a>
                <button
                  onClick={() => scrollToSection('la-carta')}
                  className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-full text-lg font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-portugal-ink transition-all shadow-xl"
                >
                  Nuestra Carta
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer z-20"
          onClick={() => scrollToSection('sobre-nosotros')}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Sobre Nosotros */}
      <section id="sobre-nosotros" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-portugal-terracota font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
                Nuestra Historia
              </span>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
                Sabor casero, <br />
                <span className="italic">alma portuguesa</span>
              </h2>
              <p className="text-lg text-portugal-ink/70 mb-8 leading-relaxed">
                Descubre la auténtica comida portuguesa en el corazón de Cáceres. Somos uno de los mejores restaurantes de Malpartida de Cáceres, especializados en recetas tradicionales y experiencias únicas para grupos y eventos.
              </p>
              
              <div className="space-y-6">
                {[
                  "Tradición que se comparte en la mesa",
                  "Donde el bacalao sabe a hogar",
                  "Ingredientes frescos, recetas de siempre"
                ].map((phrase, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-portugal-olive" />
                    <span className="font-serif italic text-xl text-portugal-olive">{phrase}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop"
                  alt="Plato tradicional"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-portugal-olive/10 rounded-full -z-10 blur-3xl" />
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-portugal-terracota/10 rounded-full -z-10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* La Carta */}
      <section id="la-carta" className="section-padding bg-portugal-beige">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-portugal-terracota font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              Gastronomía
            </span>
            <h2 className="text-4xl md:text-6xl mb-4">Nuestra Carta</h2>
            <div className="w-24 h-1 bg-portugal-terracota mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-portugal-terracota transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-portugal-ink/60 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section id="reseñas" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-portugal-terracota font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              Testimonios
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex justify-center gap-1 text-yellow-400 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
            </div>
          </div>

          <div className="relative">
            <ReviewsCarousel />
          </div>

          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-portugal-terracota text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-portugal-terracota/90 transition-all inline-flex items-center justify-center gap-2 shadow-xl"
            >
              Dejar reseña en Google Maps
            </a>
            <a
              href={TRIPADVISOR_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00af87] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#008a6a] transition-all inline-flex items-center justify-center gap-2 shadow-xl"
            >
              Dejar reseña en TripAdvisor
            </a>
          </div>
        </div>
      </section>

      {/* Visítanos */}
      <section id="visítanos" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-10">¿Dónde estamos?</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-portugal-beige flex items-center justify-center text-portugal-terracota shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Ubicación</h4>
                    <p className="text-portugal-ink/70 mb-4">Malpartida de Cáceres, Cáceres</p>
                    <a 
                      href={GOOGLE_MAPS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portugal-terracota font-bold hover:underline inline-flex items-center gap-1"
                    >
                      Cómo llegar <ChevronRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-portugal-beige flex items-center justify-center text-portugal-terracota shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Horarios</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-portugal-ink/70">
                      <span>Lunes - Viernes:</span> <span className="text-red-500 font-medium italic">Cerrado</span>
                      <span>Sábado:</span> <span>11:00 – 17:00</span>
                      <span>Domingo:</span> <span>11:00 – 17:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-portugal-beige flex items-center justify-center text-portugal-terracota shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Contacto</h4>
                    <p className="text-portugal-ink/70 mb-2">Teléfono / WhatsApp: 637 11 07 57</p>
                    <div className="flex gap-4 mt-4">
                      <a href="https://www.facebook.com/PlatoPortugue/" target="_blank" className="text-portugal-ink/40 hover:text-portugal-terracota transition-colors"><Facebook /></a>
                      <a href="https://www.instagram.com/platoportugues/" target="_blank" className="text-portugal-ink/40 hover:text-portugal-terracota transition-colors"><Instagram /></a>
                      <a href="https://x.com/PlatoPortugues" target="_blank" className="text-portugal-ink/40 hover:text-portugal-terracota transition-colors"><XIcon size={20} /></a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-portugal-beige"
            >
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Plato Portugués"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reserva CTA */}
      <section className="py-24 px-6 bg-portugal-terracota text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl mb-8 font-serif italic">¿Listo para una experiencia inolvidable?</h2>
          <p className="text-xl mb-12 text-white/80 font-light">
            Asegura tu mesa ahora y disfruta del auténtico sabor de Portugal. Las plazas son limitadas, ¡te esperamos!
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-portugal-terracota px-12 py-5 rounded-full text-xl font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-3"
          >
            <WhatsAppIcon size={24} />
            Reserva tu mesa por WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-portugal-ink text-white/60 py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h3 className="text-2xl text-white font-serif italic mb-6">Plato Portugués</h3>
              <p className="max-w-md mb-8 leading-relaxed">
                Especialistas en bacalao y cocina tradicional portuguesa. Un rincón de Portugal en el corazón de Extremadura.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/PlatoPortugue/" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-portugal-terracota hover:border-portugal-terracota transition-all"><Facebook size={18} /></a>
                <a href="https://www.instagram.com/platoportugues/" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-portugal-terracota hover:border-portugal-terracota transition-all"><Instagram size={18} /></a>
                <a href="https://x.com/PlatoPortugues" target="_blank" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-portugal-terracota hover:border-portugal-terracota transition-all"><XIcon size={16} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3"><Phone size={16} className="text-portugal-terracota" /> 637 11 07 57</li>
                <li className="flex items-start gap-3"><MapPin size={16} className="text-portugal-terracota mt-1" /> Malpartida de Cáceres, Cáceres</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => scrollToSection('la-carta')} className="hover:text-white transition-colors">La Carta</button></li>
                <li><button onClick={() => scrollToSection('visítanos')} className="hover:text-white transition-colors">Ubicación</button></li>
                <li><a href={WHATSAPP_LINK} target="_blank" className="text-portugal-terracota font-bold">Reservar Ahora</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Plato Portugués. Todos los derechos reservados.</p>
            <p>Diseñado para la mejor experiencia gastronómica.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
      >
        <WhatsAppIcon size={32} />
        <span className="absolute right-full mr-4 bg-white text-portugal-ink px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿Hablamos por WhatsApp?
        </span>
      </a>
    </div>
  );
}
