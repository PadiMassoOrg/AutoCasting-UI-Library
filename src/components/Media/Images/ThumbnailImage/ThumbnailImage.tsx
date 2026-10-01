import { useState, type ImgHTMLAttributes } from 'react';

export type ThumbnailImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  /** Full-size image. Shown when there is no thumbnail or the thumbnail fails to load. */
  src?: string | null;
  /** Smaller version of `src`, tried first. */
  thumbnailSrc?: string | null;
  /** Last resort when neither image loads (or there is no `src`). */
  placeholderSrc?: string;
};

// Each candidate is tried once, in order: thumbnail, full image, placeholder.
const ThumbnailImage = ({ src, thumbnailSrc, placeholderSrc, alt, ...imgProps }: ThumbnailImageProps) => {
  const [failures, setFailures] = useState({ key: `${thumbnailSrc}|${src}`, count: 0 });
  const key = `${thumbnailSrc}|${src}`;
  const count = failures.key === key ? failures.count : 0;

  const candidates = [thumbnailSrc, src, placeholderSrc].filter((candidate, index, all): candidate is string => {
    return Boolean(candidate) && all.indexOf(candidate) === index;
  });
  const current = candidates[Math.min(count, candidates.length - 1)];

  const handleError = () => {
    if (count < candidates.length - 1) setFailures({ key, count: count + 1 });
  };

  return <img {...imgProps} src={current} alt={alt} onError={handleError} />;
};

export default ThumbnailImage;
