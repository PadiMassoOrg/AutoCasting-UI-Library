type SortIndicatorProps = {
  direction?: 'asc' | 'desc';
};

const ACTIVE_COLOR = 'var(--color-primary-purple)';
const IDLE_COLOR = 'var(--color-secondary-disabled-grey)';

const SortIndicator = ({ direction }: SortIndicatorProps) => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M5 1L9 5.5H1L5 1Z" fill={direction === 'asc' ? ACTIVE_COLOR : IDLE_COLOR} />
    <path d="M5 13L1 8.5H9L5 13Z" fill={direction === 'desc' ? ACTIVE_COLOR : IDLE_COLOR} />
  </svg>
);

export default SortIndicator;
