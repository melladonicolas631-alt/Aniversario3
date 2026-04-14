/**
 * COMPONENTE: MusicAlbum
 * 
 * DESCRIPCIÓN:
 * Tarjeta interactiva que simula un álbum musical físico (vinilo/CD).
 * Al hacer click, redirige a una canción en YouTube Music.
 * 
 * CARACTERÍSTICAS VISUALES:
 * - Diseño cuadrado con imagen de portada
 * - Efecto de sombra profunda simulando un álbum real
 * - Hover: Rotación sutil y elevación 3D
 * - Etiqueta decorativa con nombre del artista y canción
 * 
 * INTERACTIVIDAD:
 * - Click abre el link en una nueva pestaña
 * - Animación de entrada al hacer scroll (Motion)
 * - Transiciones suaves con efecto de vinilo giratorio al hover
 * 
 * @param title - Nombre de la canción
 * @param artist - Nombre del artista
 * @param coverImage - URL de la imagen de portada del álbum
 * @param youtubeLink - URL completa a YouTube Music
 */

import { Music } from 'lucide-react';

interface MusicAlbumProps {
  title: string;
  artist: string;
  coverImage: string;
  youtubeLink: string;
}

export function MusicAlbum({ title, artist, coverImage, youtubeLink }: MusicAlbumProps) {
  const handleClick = () => {
    /* Abre el link en una nueva pestaña */
    window.open(youtubeLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      className="
        group
        cursor-pointer
        relative
        /* Aspecto cuadrado para simular álbum real */
        aspect-square
        bg-white
        rounded-lg
        shadow-xl
        overflow-hidden
        transition-all
        duration-500
        hover:scale-105
        hover:shadow-2xl
        hover:-rotate-2
      "
      style={{
        /* Transición personalizada con cubic-bezier */
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* IMAGEN DE PORTADA DEL ÁLBUM */}
      <div className="relative w-full h-full">
        <img
          src={coverImage}
          alt={`${title} - ${artist}`}
          className="
            w-full 
            h-full 
            object-cover
            /* Efecto de rotación sutil al hover (simula vinilo girando) */
            transition-transform
            duration-700
            group-hover:rotate-6
            group-hover:scale-110
          "
        />

        {/* OVERLAY OSCURO AL HOVER */}
        <div 
          className="
            absolute 
            inset-0 
            bg-black/50
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            flex
            items-center
            justify-center
          "
        >
          {/* ICONO DE MÚSICA QUE APARECE AL HOVER */}
          <div 
            className="
              transform
              translate-y-4
              group-hover:translate-y-0
              transition-transform
              duration-300
            "
          >
            <Music 
              className="w-16 h-16 text-white"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      {/* ETIQUETA CON INFO DE LA CANCIÓN */}
      <div 
        className="
          absolute 
          bottom-0 
          left-0 
          right-0
          bg-gradient-to-t
          from-black/90
          to-transparent
          p-4
          pt-8
        "
      >
        <p 
          className="text-white text-sm font-semibold truncate"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {title}
        </p>
        <p 
          className="text-white/80 text-xs truncate"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {artist}
        </p>
      </div>

      {/* INDICADOR DE "CLICK TO PLAY" */}
      <div
        className="
          absolute
          top-3
          right-3
          bg-white/90
          backdrop-blur-sm
          rounded-full
          px-3
          py-1
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      >
        <span 
          className="text-xs font-medium"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            color: '#8b4049'
          }}
        >
          ▶ Escuchar
        </span>
      </div>
    </div>
  );
}
