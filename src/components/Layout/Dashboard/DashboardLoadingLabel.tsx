import Label from '../../Forms/primitive/Label/Label';

type DashboardLoadingLabelProps = {
  label?: string;
  className?: string;
};

export default function DashboardLoadingLabel({ label = 'Loading...', className = '' }: DashboardLoadingLabelProps) {
  return (
    <Label className={`w-full text-center text-[var(--color-secondary-grey-fonts)] pt-10 ${className}`}>{label}</Label>
  );
}
