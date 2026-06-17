import { useMemo, useState } from 'react';
import PLACEHOLDER_SVG from '../../../../icons/image_placeholder.svg';
import { PhotoZoomOverlay } from '../PhotoZoomOverlay';

type Props = {
  images: string[] | null;
  className?: string;
  isDesktop?: boolean; // LG
  isDesktopXL?: boolean; // XL
  enablePhotoZoomOverlay?: boolean;
};

export default function ImageCarousel({
  images,
  className,
  isDesktop,
  isDesktopXL,
  enablePhotoZoomOverlay = false,
}: Props) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const zoomImages = useMemo<string[]>(() => {
    return (images ?? []).filter((src) => typeof src === 'string' && src.trim().length > 0).slice(0, 4);
  }, [images]);

  // Hasta 4 slots, rellenando con placeholder
  const finalImages = useMemo<string[]>(() => {
    const MAX_SLOTS = 4;
    const base = zoomImages;

    const missing = MAX_SLOTS - base.length;
    if (missing <= 0) return base;

    return [...base, ...Array.from({ length: missing }, () => PLACEHOLDER_SVG)];
  }, [zoomImages]);

  const selectedImage = finalImages[0];

  const rightThumbIndices = useMemo(() => finalImages.map((_, i) => i).slice(1, 4), [finalImages]);

  const desktopLayout = !!isDesktop || !!isDesktopXL;
  const showDesktopThumbs = desktopLayout && finalImages.length > 1;
  const gridCols = showDesktopThumbs ? 'grid-cols-[1fr_130px]' : 'grid-cols-1';
  const figureClass = desktopLayout ? 'w-full h-full' : 'w-full aspect-[8/10]';

  const handleOpenZoom = (index: number) => {
    if (!enablePhotoZoomOverlay || index < 0 || index >= zoomImages.length) {
      return;
    }

    setZoomIndex(index);
  };

  const wrapperClass = desktopLayout
    ? `grid ${gridCols} gap-3 h-full min-h-0 items-stretch`
    : 'flex flex-col gap-3 w-full';

  return (
    <div className={`w-full ${desktopLayout ? 'h-full min-h-0' : 'h-auto'} ${className ?? ''}`}>
      <div className={wrapperClass}>
        {/* Imagen principal */}
        <div className={desktopLayout ? 'col-[1] h-full min-h-0 flex flex-col' : 'flex flex-col gap-2'}>
          <button
            type="button"
            onClick={() => handleOpenZoom(0)}
            className={`relative overflow-hidden rounded-xl text-left ${figureClass}`}
            aria-label="Ver imagen 1"
          >
            <img
              src={selectedImage}
              alt="Imagen principal"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </button>

          {/* Thumbs mobile (scroll horizontal) */}
          {!desktopLayout && finalImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto w-full">
              {finalImages.slice(1).map((img, i) => {
                const index = i + 1;
                const isPlaceholder = index >= zoomImages.length;

                return (
                  <button
                    key={`thumb-m-${index}`}
                    type="button"
                    aria-label={`Ver imagen ${index + 1}`}
                    onClick={() => handleOpenZoom(index)}
                    disabled={isPlaceholder}
                    className="w-[120px] aspect-[8/10] flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Thumbs desktop (columna a la derecha) */}
        {showDesktopThumbs && (
          <div
            className="col-[2] h-full min-h-0 flex flex-col gap-2 items-stretch justify-center"
            style={{ ['--g' as string]: '12px' }}
          >
            {rightThumbIndices.map((idx) => {
              const img = finalImages[idx];
              const isPlaceholder = idx >= zoomImages.length;
              return (
                <button
                  key={`thumb-d-${idx}`}
                  type="button"
                  aria-label={`Ver imagen ${idx + 1}`}
                  onClick={() => handleOpenZoom(idx)}
                  disabled={isPlaceholder}
                  style={{ height: 'calc((100% - 2*var(--g)) / 3)' }}
                  className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-transparent flex-shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <img
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <PhotoZoomOverlay
        open={enablePhotoZoomOverlay && zoomIndex !== null && zoomImages.length > 0}
        images={zoomImages}
        initialIndex={zoomIndex ?? 0}
        onClose={() => setZoomIndex(null)}
      />
    </div>
  );
}
