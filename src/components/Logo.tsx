import { useId } from 'react';
import clsx from 'clsx';

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean;
  filled?: boolean;
  fillOnHover?: boolean;
}) {
  let id = useId();

  return (
    <svg
      viewBox="0 0 200 32" // Regola le dimensioni dell'SVG
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo', className)} // Gestione dinamica delle classi
      {...props}
    >
      {/* Effetto dinamico con <rect> */}
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'transition-all duration-300', // Animazione
          invert ? 'fill-white' : 'fill-neutral-950', // Colore invertito
          filled ? 'w-full opacity-100' : 'w-0 opacity-80 group-hover/logo:w-full opacity-100' // Riempimento su hover
        )}
      />

      {/* Testo principale Climawell */}
      <text
        x=" 0" // Posizione orizzontale
        y="20" // Posizione verticale
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="27"
        className={clsx(
          'transition-all duration-300', // Aggiunge transizione
          invert ? 'fill-white' : 'fill-neutral-950', // Colore testo invertito
          filled ? 'opacity-100' : 'opacity-80 group-hover/logo:opacity-100' // Gestione dinamica dell'opacità
        )}
      >
        Climawell
      </text>

      {/* ClipPath per l'effetto dinamico */}
      <defs>
        <clipPath id={`${id}-clip`}>
          <text
            x="0"
            y="20"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="20"
          >
            Climawell
          </text>
        </clipPath>
      </defs>
    </svg>
  );
}
