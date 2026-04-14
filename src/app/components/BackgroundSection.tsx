/**
 * COMPONENTE: BackgroundSection
 * 
 * DESCRIPCIÓN:
 * Componente que renderiza una sección de fondo con imagen de paisaje.
 * Se usa para crear diferentes "capas" visuales mientras el usuario navega.
 * 
 * CARACTERÍSTICAS VISUALES:
 * - Imagen de fondo con efecto parallax suave
 * - Overlay oscuro semitransparente para mejorar legibilidad
 * - Transición suave entre secciones
 * 
 * ARQUITECTURA:
 * - Sistema de secciones apiladas que crean profundidad visual
 * - Cada sección puede tener su propia imagen de fondo
 * - Children: Contenido que se renderiza sobre el fondo
 * 
 * @param backgroundImage - URL de la imagen de paisaje
 * @param children - Contenido a renderizar sobre el fondo
 * @param overlay - Opacidad del overlay oscuro (0-1)
 */

interface BackgroundSectionProps {
  backgroundImage: string;
  children: React.ReactNode;
  overlay?: number;
}

export function BackgroundSection({ 
  backgroundImage, 
  children, 
  overlay = 0.3 
}: BackgroundSectionProps) {
  return (
    <div className="relative min-h-screen">
      {/* IMAGEN DE FONDO CON EFECTO FIXED */}
      <div 
        className="
          fixed 
          inset-0 
          bg-cover 
          bg-center 
          bg-no-repeat
          -z-10
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          /* Efecto parallax suave */
          backgroundAttachment: 'fixed',
        }}
      >
        {/* OVERLAY OSCURO PARA MEJORAR LEGIBILIDAD */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ 
            opacity: overlay,
            /* Gradiente sutil de arriba hacia abajo */
            background: `linear-gradient(to bottom, 
              rgba(0,0,0,${overlay}), 
              rgba(0,0,0,${overlay * 1.3})
            )`
          }}
        />
      </div>

      {/* CONTENIDO SOBRE EL FONDO */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
