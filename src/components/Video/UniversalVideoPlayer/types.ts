export type VideoProvider = 'youtube' | 'vimeo' | 'unknown';

export type UniversalVideoPlayerProps = {
  url: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  start?: number;
  className?: string;
  unsupportedMessage?: string;
  openLinkLabel?: string;
};

export type BuildEmbedUrlParams = {
  url: string;
  provider: VideoProvider;
  autoplay: boolean;
  controls: boolean;
  muted: boolean;
  loop: boolean;
  start?: number;
};
