import { clsx } from 'clsx';

type LogoProps = {
  horizontal?: boolean;
  text: string;
  imageSrc?: string;
  imageSize?: number;
  className?: string;
};

const Logo = ({ horizontal, text, imageSrc, imageSize = 40, className }: LogoProps) => {
  return (
    <div
      className={clsx(
        `flex ${horizontal ? 'flex-row' : 'flex-col'} gap-[10px] items-center justify-center cursor-pointer`,
        className
      )}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={text}
          width={`${horizontal ? 40 : imageSize}`}
          height={imageSize}
          className="object-contain"
        />
      )}
      <span className={`${horizontal ? 'text-sm' : 'text-base'} font-bold`}>{text}</span>
    </div>
  );
};

export default Logo;
