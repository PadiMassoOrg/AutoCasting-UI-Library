type ChevronLeftProps = {
  sizePx?: number;
  className?: string;
  double?: boolean;
};

const ChevronLeft = ({ sizePx = 30, className, double = false }: ChevronLeftProps) => {
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={['cursor-pointer', className ?? ''].filter(Boolean).join(' ')}
    >
      {double ? (
        <>
          <path d="M17 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
};

export default ChevronLeft;
