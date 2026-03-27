import { useMemo } from 'react';
import type { UniversalVideoPlayerProps } from './types';
import { buildUniversalVideoEmbedUrl, detectVideoProvider } from './utils';

export default function UniversalVideoPlayer({
  url,
  title = 'Video',
  autoplay = false,
  controls = true,
  muted = false,
  loop = false,
  start,
  className,
  unsupportedMessage = 'Proveedor no soportado.',
  openLinkLabel = 'Abrir enlace',
}: UniversalVideoPlayerProps) {
  const provider = useMemo(() => detectVideoProvider(url), [url]);

  const src = useMemo(
    () =>
      buildUniversalVideoEmbedUrl({
        url,
        provider,
        autoplay,
        controls,
        muted,
        loop,
        start,
      }),
    [url, provider, autoplay, controls, muted, loop, start]
  );

  if (!src) {
    return (
      <div className={`rounded-2xl border p-3 text-sm ${className ?? ''}`}>
        {unsupportedMessage}{' '}
        <a className="underline" href={url} target="_blank" rel="noreferrer">
          {openLinkLabel}
        </a>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full ${className ?? ''}`}>
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full rounded-2xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="origin-when-cross-origin"
      />
    </div>
  );
}
