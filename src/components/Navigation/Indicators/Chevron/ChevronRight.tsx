type ChevronRightProps = {
  sizePx?: number;
  className?: string;
  double?: boolean;
};

const ChevronRight = ({ sizePx = 30, className, double = false }: ChevronRightProps) => {
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
          <path d="M7 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
};

export default ChevronRight;
