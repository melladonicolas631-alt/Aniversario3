/**
 * COMPONENTE: MemoryModal
 * 
 * DESCRIPCIÓN:
 * Modal tipo Lightbox que muestra la imagen seleccionada en tamaño grande
 * junto con un mensaje dedicado personalizado para ese recuerdo.
 * 
 * CARACTERÍSTICAS UX:
 * - Overlay oscuro semitransparente que cubre toda la pantalla
 * - Imagen centrada con tamaño optimizado para visualización
 * - Mensaje dedicado que aparece debajo de la imagen
 * - Botón de cierre accesible (esquina superior derecha + click en overlay)
 * - Animaciones de entrada/salida suaves usando Motion
 * 
 * ARQUITECTURA:
 * - Utiliza Motion (Framer Motion) para animaciones fluidas
 * - AnimatePresence permite animación de salida antes de desmontar
 * - Variantes de animación para fade-in y slide-up coordinados
 * 
 * @param isOpen - Estado que controla la visibilidad del modal
 * @param onClose - Función callback para cerrar el modal
 * @param image - URL de la imagen a mostrar en grande
 * @param caption - Pie de foto
 * @param dedication - Mensaje romántico dedicado a este recuerdo específico
 */

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  caption: string;
  dedication: string;
}

export function MemoryModal({ isOpen, onClose, image, caption, dedication }: MemoryModalProps) {
  /* Si el modal no está abierto, no renderizamos nada */
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* OVERLAY: Fondo oscuro semitransparente */}
          <motion.div
            /* Animación de entrada: Fade in */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            /* Click en el overlay cierra el modal */
            onClick={onClose}
          />

          {/* CONTENEDOR DEL CONTENIDO: Tarjeta central */}
          <motion.div
            /* Animación de entrada: Fade in + escala desde pequeño */
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.4,
              /* cubic-bezier para un rebote suave al aparecer */
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="
              relative 
              bg-white 
              rounded-lg 
              shadow-2xl 
              max-w-4xl 
              w-full 
              max-h-[90vh] 
              overflow-y-auto
              /* Evitamos que el click dentro del modal lo cierre */
            "
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* BOTÓN DE CIERRE: Esquina superior derecha */}
            <button
              onClick={onClose}
              className="
                absolute 
                top-4 
                right-4 
                z-10
                bg-white/90
                hover:bg-white
                rounded-full 
                p-2 
                shadow-lg
                transition-all
                duration-200
                hover:scale-110
              "
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* CONTENIDO DEL MODAL */}
            <div className="p-8">
              
              {/* Imagen principal en tamaño grande */}
              <div className="mb-6 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt={caption}
                  className="w-full h-auto object-contain max-h-[60vh]"
                />
              </div>

              {/* PIE DE FOTO: Con fuente máquina de escribir */}
              <h3 
                className="text-2xl text-center mb-4 text-gray-800"
                style={{ 
                  fontFamily: "'Special Elite', monospace",
                  letterSpacing: '1px'
                }}
              >
                {caption}
              </h3>

              {/* MENSAJE DEDICADO: Con fuente serif elegante */}
              <div 
                className="
                  text-center 
                  text-lg 
                  leading-relaxed 
                  text-gray-700
                  max-w-2xl
                  mx-auto
                  border-t-2
                  border-b-2
                  py-6
                  my-4
                "
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  borderColor: '#8b4049' /* Color burdeos */
                }}
              >
                <p className="italic">"{dedication}"</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
