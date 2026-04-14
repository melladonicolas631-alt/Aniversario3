/**
 * COMPONENTE: MemoryCard
 * 
 * DESCRIPCIÓN:
 * Componente que renderiza una tarjeta individual con efecto Polaroid.
 * Cada tarjeta representa un recuerdo con una imagen y un pie de foto.
 * 
 * CARACTERÍSTICAS VISUALES:
 * - Diseño tipo fotografía polaroid con borde blanco y margen inferior
 * - Rotación aleatoria leve para simular fotos esparcidas
 * - Sombra suave que simula elevación física
 * 
 * INTERACTIVIDAD (UX):
 * - Hover: La tarjeta se endereza (rotate 0deg)
 * - Hover: Escala ligeramente hacia adelante (scale 1.05)
 * - Hover: Incrementa la sombra para efecto de profundidad
 * - Click: Abre el modal con la imagen en tamaño completo
 * - Transición suave con cubic-bezier personalizado
 * - ANIMACIÓN AL SCROLL: Aparece con fade-in y slide-up usando Motion
 * 
 * @param image - URL de la imagen a mostrar
 * @param caption - Texto descriptivo que aparece debajo de la foto
 * @param rotation - Grados de rotación inicial (simulando foto esparcida)
 * @param onClick - Función callback que se ejecuta al hacer click
 * @param delay - Retraso en la animación de entrada (para efecto escalonado)
 */

import { motion } from 'motion/react';

interface MemoryCardProps {
  image: string;
  caption: string;
  rotation: number;
  onClick: () => void;
  delay?: number;
}

export function MemoryCard({ image, caption, rotation, onClick, delay = 0 }: MemoryCardProps) {
  return (
    <motion.div
      /* ANIMACIÓN DE ENTRADA AL HACER SCROLL */
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      viewport={{ 
        /* Solo anima una vez cuando entra en vista */
        once: true,
        /* Margen para activar antes de que sea visible */
        margin: "-100px"
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      /* Contenedor principal con efecto Polaroid */
      className="
        bg-white 
        p-3 
        pb-12 
        shadow-lg 
        cursor-pointer
        transition-all 
        duration-500
        hover:rotate-0
        hover:scale-105
        hover:shadow-2xl
        hover:z-10
      "
      /* Aplicamos la rotación inicial mediante estilos inline */
      style={{
        transform: `rotate(${rotation}deg)`,
        /* cubic-bezier personalizado para una transición más natural y elástica */
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onClick={onClick}
    >
      {/* Contenedor de la imagen con aspect ratio fijo */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={caption}
          className="
            w-full 
            h-full 
            object-cover
            /* Filtro sutil para dar un toque vintage */
            brightness-95
            contrast-95
          "
        />
      </div>

      {/* Pie de foto con fuente tipo máquina de escribir */}
      <p 
        className="
          mt-4 
          text-center 
          text-sm 
          text-gray-700
          /* Aplicamos la fuente Special Elite (máquina de escribir) */
        "
        style={{ 
          fontFamily: "'Special Elite', monospace",
          letterSpacing: '0.5px'
        }}
      >
        {caption}
      </p>
    </motion.div>
  );
}