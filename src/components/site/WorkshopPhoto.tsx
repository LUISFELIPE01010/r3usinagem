type PhotoName = "operador-fresadora" | "ajuste-maquina" | "operador-torno" | "operador-ajustando" | "corte-metal" | "acabamento-metal" | "torno-cnc" | "forno-rotativo" | "equipe" | "soldador-planta" | "usinagem-campo-equipe";

type Props = {
  photo: PhotoName;
  alt: string;
  className?: string;
  sizes?: string;
};

// Real pixel sizes of each generated variant, so width/height and the srcSet
// descriptors always match the files actually served from /img.
const PHOTOS: Record<PhotoName, { small: [number, number]; large: [number, number] }> = {
  "operador-fresadora": { small: [600, 401], large: [1200, 801] },
  "ajuste-maquina": { small: [600, 401], large: [1200, 801] },
  "operador-torno": { small: [600, 401], large: [1200, 801] },
  "operador-ajustando": { small: [600, 401], large: [1200, 801] },
  "corte-metal": { small: [600, 491], large: [1200, 983] },
  "acabamento-metal": { small: [600, 400], large: [1200, 800] },
  "torno-cnc": { small: [600, 401], large: [1200, 801] },
  "forno-rotativo": { small: [600, 503], large: [940, 788] },
  "equipe": { small: [600, 400], large: [1200, 800] },
  "soldador-planta": { small: [600, 400], large: [1200, 800] },
  "usinagem-campo-equipe": { small: [600, 401], large: [1200, 802] },
};

export function WorkshopPhoto({ photo, alt, className, sizes = "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 40vw" }: Props) {
  const { small, large } = PHOTOS[photo];
  return <img
    src={`/img/r3-${photo}-1200.webp`}
    srcSet={`/img/r3-${photo}-600.webp ${small[0]}w, /img/r3-${photo}-1200.webp ${large[0]}w`}
    sizes={sizes}
    alt={alt}
    width={large[0]}
    height={large[1]}
    loading="lazy"
    decoding="async"
    className={`uncropped-photo ${className ?? ""}`}
  />;
}
