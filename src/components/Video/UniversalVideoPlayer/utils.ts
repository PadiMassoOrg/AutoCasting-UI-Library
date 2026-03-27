import type { BuildEmbedUrlParams, VideoProvider } from './types';

export function detectVideoProvider(url: string): VideoProvider {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === 'youtu.be' || hostname.endsWith('youtube.com') || hostname.endsWith('youtube-nocookie.com')) {
      return 'youtube';
    }

    if (hostname === 'vimeo.com' || hostname.endsWith('.vimeo.com')) {
      return 'vimeo';
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

export function getYouTubeVideoId(url: string): string | undefined {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === 'youtu.be') {
      const shortId = parsedUrl.pathname.replace(/^\/+/, '');
      return shortId || undefined;
    }

    const queryVideoId = parsedUrl.searchParams.get('v');
    if (queryVideoId) {
      return queryVideoId;
    }

    const matchedPath = parsedUrl.pathname.match(/\/(embed|shorts|live)\/([^/?#]+)/i);
    return matchedPath?.[2];
  } catch {
    return undefined;
  }
}

export function getVimeoVideoId(url: string): string | undefined {
  try {
    const parsedUrl = new URL(url);
    const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);
    const numericSegment = [...pathSegments].reverse().find((segment) => /^\d+$/.test(segment));
    return numericSegment;
  } catch {
    return undefined;
  }
}

export function buildYouTubeEmbedUrl({
  url,
  autoplay,
  controls,
  muted,
  loop,
  start,
}: Omit<BuildEmbedUrlParams, 'provider'>): string | undefined {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return undefined;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    autoplay: autoplay ? '1' : '0',
    controls: controls ? '1' : '0',
    mute: muted ? '1' : '0',
  });

  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId);
  }

  if (typeof start === 'number' && start > 0) {
    params.set('start', String(start));
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function buildVimeoEmbedUrl({
  url,
  autoplay,
  muted,
  loop,
}: Omit<BuildEmbedUrlParams, 'provider' | 'controls' | 'start'>): string | undefined {
  const videoId = getVimeoVideoId(url);
  if (!videoId) return undefined;

  const params = new URLSearchParams({
    byline: '0',
    portrait: '0',
    title: '0',
    dnt: '1',
    autoplay: autoplay ? '1' : '0',
    muted: muted ? '1' : '0',
    loop: loop ? '1' : '0',
  });

  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

export function buildUniversalVideoEmbedUrl({
  url,
  provider,
  autoplay,
  controls,
  muted,
  loop,
  start,
}: BuildEmbedUrlParams): string | undefined {
  if (provider === 'youtube') {
    return buildYouTubeEmbedUrl({
      url,
      autoplay,
      controls,
      muted,
      loop,
      start,
    });
  }

  if (provider === 'vimeo') {
    return buildVimeoEmbedUrl({
      url,
      autoplay,
      muted,
      loop,
    });
  }

  return undefined;
}
