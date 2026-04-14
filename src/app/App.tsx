/**
 * COMPONENTE PRINCIPAL: App
 * 
 * DESCRIPCIÓN:
 * Aplicación "Libro de Recuerdos Digital" para celebrar el aniversario de pareja.
 * Muestra una galería de fotografías tipo polaroid con efectos interactivos.
 * 
 * NUEVAS CARACTERÍSTICAS v3.0:
 * - Fondos dinámicos con paisajes románticos (parques y ciudades)
 * - Layout de 2 columnas para mejor visualización de fotos
 * - Efecto parallax en los fondos
 * - Múltiples secciones con diferentes paisajes de fondo
 * - Estilo cinematográfico más inmersivo
 * 
 * ARQUITECTURA GENERAL:
 * - Layout con fondos de paisajes intercalados
 * - Grid responsivo de 2 columnas máximo
 * - Sección dedicada a música que nos une
 * - Modal lightbox para ver imágenes en detalle
 * - Estado local para gestionar qué recuerdo está siendo visualizado
 * 
 * CARACTERÍSTICAS TÉCNICAS:
 * - Mobile-First: Grid adaptativo (1 columna móvil → 2 columnas desktop)
 * - Scroll Animations: Elementos aparecen progresivamente usando Motion
 * - Parallax backgrounds: Fondos fijos que crean profundidad
 * - Accesibilidad: Semántica HTML5, aria-labels, navegación por teclado
 * - Performance: Lazy loading implícito de imágenes
 * 
 * PALETA DE COLORES:
 * - Fondos: Paisajes románticos de parques y ciudades
 * - Overlay: Negro semitransparente para legibilidad
 * - Acento: Burdeos (#8b4049) y blancos puros
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MemoryCard } from './components/MemoryCard';
import { MemoryModal } from './components/MemoryModal';
import { MusicAlbum } from './components/MusicAlbum';

/**
 * INTERFAZ: Memory
 * Define la estructura de datos para cada recuerdo
 */
interface Memory {
  id: number;
  image: string;
  caption: string;
  dedication: string;
  rotation: number; // Grados de rotación para el efecto polaroid esparcido
}

/**
 * INTERFAZ: MusicTrack
 * Define la estructura para cada álbum musical
 */
interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  coverImage: string;
  youtubeLink: string;
}

/**
 * DATOS: Array de recuerdos (10 fotografías)
 * 
 * NOTA PARA PERSONALIZACIÓN:
 * - Reemplaza las URLs de Unsplash con tus propias fotos
 * - Modifica caption (pie de foto) con descripciones reales
 * - Personaliza dedication con mensajes románticos auténticos
 * - Ajusta rotation para variar el ángulo de cada polaroid
 */
const memories: Memory[] = [
  {id: 2,
    image: 'https://images.unsplash.com/photo-1535763070021-3854399cfe98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMGNvZmZlZSUyMHNob3AlMjBkYXRlfGVufDF8fHx8MTc3NjIwMzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Nuestra cafetería favorita',
    dedication: 'Las tardes de café y risas interminables. Donde nacieron nuestras conversaciones más profundas y donde aprendí que el amor también se construye en los pequeños momentos cotidianos.',
    rotation: 4,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1535763070021-3854399cfe98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBsYXVnaGluZyUyMGNvZmZlZSUyMHNob3AlMjBkYXRlfGVufDF8fHx8MTc3NjIwMzc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Nuestra cafetería favorita',
    dedication: 'Las tardes de café y risas interminables. Donde nacieron nuestras conversaciones más profundas y donde aprendí que el amor también se construye en los pequeños momentos cotidianos.',
    rotation: 4,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1758156877144-bd5eb35fc29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwaWNuaWMlMjBwYXJrJTIwcm9tYW50aWN8ZW58MXx8fHwxNzc2MjAzNzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Picnic en el Parque San Martín',
    dedication: 'Improvisamos ese día sin planearlo. Una manta, algo de comida y toda una tarde de carcajadas bajo los árboles. Me enseñaste que la felicidad no necesita grandes planes, solo tu compañía.',
    rotation: -2,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1769679822494-abdc3de37967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBiZWFjaCUyMHZhY2F0aW9uJTIwdHJhdmVsfGVufDF8fHx8MTc3NjIwMzc5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Nuestro viaje a la playa',
    dedication: 'Arena, olas y tú. El viaje que tanto soñamos finalmente se hizo realidad. Cada paso en esa arena fue un paso más en nuestra historia juntos. Te amo más que ayer, pero menos que mañana.',
    rotation: 3,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1775653618766-aac60cfb08ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBkYW5jaW5nJTIwcm9tYW50aWMlMjBuaWdodxlbnwxfHx8fDE3NzYyMDQyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Bailando bajo las estrellas',
    dedication: 'Esa noche en la que bailamos sin música, solo guiados por los latidos de nuestros corazones. No necesitamos una pista de baile cuando estamos juntos, todo el mundo se convierte en nuestro escenario.',
    rotation: -4,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1758522489456-96afe24741dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjb29raW5nJTIwa2l0Y2hlbiUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3NjIwNDAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Cocinando juntos en casa',
    dedication: 'Entre risas y desastres culinarios, descubrimos que la mejor receta es la que hacemos juntos. Aunque quememos el arroz, siempre terminamos con una sonrisa y el corazón lleno.',
    rotation: 2,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1755121718992-fba1914ad5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBoaWtpbmclMjBtb3VudGFpbiUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NzYyMDQyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Aventura en la montaña',
    dedication: 'Escalamos juntos hasta la cima. Cada paso difícil se hizo más fácil porque te tenía a mi lado. Aprendí que contigo cualquier cumbre es alcanzable, cualquier meta es posible.',
    rotation: -3,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1693085722445-536f2a1f1b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByYWluJTIwdW1icmVsbGElMjBjaXR5fGVufDF8fHx8MTc3NjIwNDI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Lluvia en la ciudad',
    dedication: 'Quedamos atrapados bajo la lluvia sin paraguas, y en lugar de correr a refugiarnos, decidimos bailar. Ese día entendí que contigo hasta las tormentas se vuelven mágicas.',
    rotation: 4,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1758523673188-b8fb9945fbd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjByZWFkaW5nJTIwYm9vayUyMGNvenl8ZW58MXx8fHwxNzc2MjA0MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Tarde de lectura y manta',
    dedication: 'Los domingos perfectos existen: tú, yo, una manta cálida y nuestras historias favoritas. En tu abrazo encontré mi lugar favorito del mundo, mi hogar definitivo.',
    rotation: -2,
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1763916844907-ad09b2b9978a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzdGFyZ2F6aW5nJTIwbmlnaHQlMjBza3l8ZW58MXx8fHwxNzc2MjA0MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Mirando las estrellas',
    dedication: 'Bajo un manto infinito de estrellas, me pediste un deseo. No te lo dije entonces, pero mi deseo ya estaba cumplido: tenerte a mi lado, hoy y siempre. Eres mi estrella más brillante.',
    rotation: 3,
  },
];

/**
 * DATOS: Array de canciones/álbumes musicales
 * 
 * NOTA PARA PERSONALIZACIÓN:
 * - Reemplaza youtubeLink con las URLs reales de YouTube Music
 * - Modifica title y artist con tus canciones favoritas de pareja
 * - Cambia coverImage por las portadas reales de los álbumes
 */
const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    youtubeLink: 'https://music.youtube.com/watch?v=2Vv-BfVoq4g', // Reemplaza con tu enlace
  },
  {
    id: 2,
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    youtubeLink: 'https://music.youtube.com/watch?v=rtOvBOTyX00', // Reemplaza con tu enlace
  },
  {
    id: 3,
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    youtubeLink: 'https://music.youtube.com/watch?v=lp-EO5I60KA', // Reemplaza con tu enlace
  },
];

/**
 * DATOS: URLs de fondos de paisajes románticos
 * Se alternan entre diferentes secciones del sitio
 */
const backgroundImages = {
  header: 'https://images.unsplash.com/photo-1694344483503-f020db6e7f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHBhcmslMjBzdW5zZXQlMjBib2tlaHxlbnwxfHx8fDE3NzYyMDQ3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  gallery1: 'https://images.unsplash.com/photo-1772824540933-76296a8b5e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBnYXJkZW4lMjBwYXRoJTIwcm9tYW50aWN8ZW58MXx8fHwxNzc2MjA0NzIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  gallery2: 'https://images.unsplash.com/photo-1766065430604-48674435f37d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbGlnaHRzJTIwcm9tYW50aWMlMjBldmVuaW5nJTIwc2t5bGluZXxlbnwxfHx8fDE3NzYyMDQ3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  music: 'https://images.unsplash.com/photo-1640954316253-8efc8ad957fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHN0cmVldCUyMGV2ZW5pbmclMjByb21hbnRpY3xlbnwxfHx8fDE3NzYyMDQ3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export default function App() {
  /**
   * ESTADO LOCAL: selectedMemory
   * Gestiona qué recuerdo está siendo visualizado en el modal
   * - null: Modal cerrado
   * - Memory object: Modal abierto mostrando ese recuerdo
   */
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  /**
   * ESTADO LOCAL: currentBackground
   * Controla qué imagen de fondo se está mostrando
   */
  const [currentBackground, setCurrentBackground] = useState(backgroundImages.header);

  return (
    <div className="relative">
      {/* FONDO DINÁMICO CON PARALLAX */}
      <div 
        className="
          fixed 
          inset-0 
          bg-cover 
          bg-center 
          bg-no-repeat
          transition-all
          duration-1000
          -z-10
        "
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* OVERLAY OSCURO PARA LEGIBILIDAD */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))'
          }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10">
        {/* CONTENEDOR PRINCIPAL: Max-width para mejor legibilidad */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ==================== ENCABEZADO ==================== */}
          <motion.header 
            className="text-center py-20 lg:py-28"
            /* Animación de entrada del header */
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onViewportEnter={() => setCurrentBackground(backgroundImages.header)}
          >
            {/* Título principal con fuente Serif elegante */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl mb-6 drop-shadow-2xl"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                color: '#ffffff',
                fontWeight: 700,
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
            >
              Nuestro Libro de Recuerdos
            </h1>
            
            {/* Subtítulo romántico */}
            <p 
              className="text-xl sm:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                letterSpacing: '1px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
              }}
            >
              Cada fotografía cuenta una historia,
              <br />
              cada momento es un tesoro guardado en el tiempo.
            </p>

            {/* Decoración: Línea divisoria elegante */}
            <div className="mt-10 flex justify-center items-center gap-4">
              <div 
                className="h-px w-20 sm:w-32 bg-white/60"
              />
              <span 
                className="text-3xl drop-shadow-lg"
                style={{ 
                  color: '#ffffff',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))'
                }}
              >
                ❤
              </span>
              <div 
                className="h-px w-20 sm:w-32 bg-white/60"
              />
            </div>
          </motion.header>

          {/* ==================== GALERÍA PARTE 1 (Primeras 5 fotos) ==================== */}
          <motion.section
            className="py-16"
            onViewportEnter={() => setCurrentBackground(backgroundImages.gallery1)}
            viewport={{ margin: "-200px" }}
          >
            <main 
              className="
                grid 
                grid-cols-1 
                lg:grid-cols-2
                gap-12
                lg:gap-16
                px-4
              "
            >
              {/* Primeras 5 fotos */}
              {memories.slice(0, 5).map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  image={memory.image}
                  caption={memory.caption}
                  rotation={memory.rotation}
                  delay={index * 0.1}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </main>
          </motion.section>

          {/* ==================== GALERÍA PARTE 2 (Últimas 5 fotos) ==================== */}
          <motion.section
            className="py-16"
            onViewportEnter={() => setCurrentBackground(backgroundImages.gallery2)}
            viewport={{ margin: "-200px" }}
          >
            <main 
              className="
                grid 
                grid-cols-1 
                lg:grid-cols-2
                gap-12
                lg:gap-16
                px-4
              "
            >
              {/* Últimas 5 fotos */}
              {memories.slice(5, 10).map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  image={memory.image}
                  caption={memory.caption}
                  rotation={memory.rotation}
                  delay={index * 0.1}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </main>
          </motion.section>

          {/* ==================== SECCIÓN DE MÚSICA ==================== */}
          <motion.section
            className="py-24"
            onViewportEnter={() => setCurrentBackground(backgroundImages.music)}
            viewport={{ margin: "-200px" }}
            /* Animación al hacer scroll */
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Título de sección */}
            <div className="text-center mb-16">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl mb-6 drop-shadow-2xl"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#ffffff',
                  fontWeight: 700,
                  textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                }}
              >
                Canciones que nos Unen
              </h2>
              <p
                className="text-lg sm:text-xl text-white max-w-2xl mx-auto drop-shadow-lg"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}
              >
                Cada melodía guarda un fragmento de nuestra historia.
                <br />
                Estas son las canciones que suenan en mi corazón cuando pienso en ti.
              </p>
            </div>

            {/* Grid de álbumes musicales */}
            <div 
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3
                gap-10
                sm:gap-12
                max-w-5xl
                mx-auto
                px-4
              "
            >
              {musicTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  /* Animación individual para cada álbum */
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <MusicAlbum
                    title={track.title}
                    artist={track.artist}
                    coverImage={track.coverImage}
                    youtubeLink={track.youtubeLink}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ==================== FOOTER ==================== */}
          <motion.footer 
            className="py-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p 
              className="text-base text-white drop-shadow-lg"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 8px rgba(0,0,0,0.8)'
              }}
            >
              Creado con amor para nuestro aniversario ✨
            </p>
            <p 
              className="text-sm text-white/80 mt-3 drop-shadow-md"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 6px rgba(0,0,0,0.8)'
              }}
            >
              Porque cada día contigo es una nueva página en nuestra historia
            </p>
          </motion.footer>
        </div>
      </div>

      {/* ==================== MODAL LIGHTBOX ==================== */}
      {/**
       * El modal solo se renderiza si hay un recuerdo seleccionado
       * AnimatePresence (dentro del componente) maneja las animaciones de salida
       */}
      {selectedMemory && (
        <MemoryModal
          isOpen={!!selectedMemory}
          onClose={() => setSelectedMemory(null)}
          image={selectedMemory.image}
          caption={selectedMemory.caption}
          dedication={selectedMemory.dedication}
        />
      )}
    </div>
  );
}
