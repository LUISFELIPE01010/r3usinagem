type PhotoName = "operador-fresadora" | "ajuste-maquina" | "operador-torno" | "operador-vertical" | "corte-metal" | "acabamento-metal" | "torno-cnc";

type Props = {
  photo: PhotoName;
  alt: string;
  className?: string;
  sizes?: string;
};

export function WorkshopPhoto({ photo, alt, className, sizes = "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 50vw, 40vw" }: Props) {
  return <img
    src={`/img/r3-${photo}-1200.webp`}
    srcSet={`/img/r3-${photo}-600.webp 600w, /img/r3-${photo}-1200.webp ${photo === "operador-vertical" ? 1024 : 1200}w`}
    sizes={sizes}
    alt={alt}
    width={photo === "operador-vertical" ? 1024 : 1200}
    height={photo === "operador-vertical" ? 1536 : photo === "corte-metal" ? 983 : 801}
    loading="lazy"
    decoding="async"
    className={className}
  />;
}