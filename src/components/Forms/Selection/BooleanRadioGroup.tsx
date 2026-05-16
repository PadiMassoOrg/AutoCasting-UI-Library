import clsx from 'clsx';
import { useId } from 'react';

type AnyValueMode = 'undefined' | 'null';
type Orientation = 'horizontal' | 'vertical';

export type BooleanRadioGroupProps = {
  label: string;
  value: boolean | null | undefined;
  onChange: (next: boolean | null | undefined) => void;
  yesLabel?: string;
  noLabel?: string;
  includeAnyOption?: boolean;
  anyOptionLabel?: string;
  anyValueMode?: AnyValueMode;
  name?: string;
  className?: string;
  legendClassName?: string;
  optionClassName?: string;
  orientation?: Orientation;
  disabled?: boolean;
  required?: boolean;
};

const boolToTri = (b: boolean | null | undefined): '' | 'true' | 'false' => (b == null ? '' : b ? 'true' : 'false');

export default function BooleanRadioGroup({
  label,
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  includeAnyOption = false,
  anyOptionLabel = 'Any',
  anyValueMode = 'undefined',
  name,
  className,
  legendClassName,
  optionClassName,
  orientation,
  disabled = false,
  required = false,
}: BooleanRadioGroupProps) {
  const uid = useId();
  const groupName = (name ?? 'bool') + '__' + uid;
  const tri = boolToTri(value);

  const finalClassName = clsx('flex flex-col gap-1', className);
  const finalLegendClassName = clsx('text-[14px] font-semibold', legendClassName);
  const finalOptionClassName = clsx('flex items-center gap-2 text-[14px] font-semibold', optionClassName);
  const resolvedOrientation = orientation ?? (includeAnyOption ? 'vertical' : 'horizontal');
  const optionsClassName = clsx('mt-2 pl-1', {
    'flex flex-col gap-2': resolvedOrientation === 'vertical',
    'flex flex-row items-center gap-6': resolvedOrientation === 'horizontal',
  });

  const idAny = `${groupName}-any`;
  const idYes = `${groupName}-yes`;
  const idNo = `${groupName}-no`;
  const anyNext = anyValueMode === 'null' ? null : undefined;

  const renderRadioInput = (checked: boolean, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <span className="relative inline-flex items-center justify-center h-6 w-6">
      <input
        {...props}
        type="radio"
        checked={checked}
        disabled={disabled}
        className="peer h-6 w-6 rounded-full border border-(--color-secondary-outline) appearance-none cursor-pointer checked:border-(--color-primary-purple) bg-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      />
      <span className="pointer-events-none absolute h-3 w-3 rounded-full bg-(--color-primary-purple) scale-0 peer-checked:scale-100 transition-transform" />
    </span>
  );

  return (
    <fieldset className={finalClassName}>
      <legend className={finalLegendClassName}>
        {label}
        {required ? (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>

      <div className={optionsClassName}>
        {includeAnyOption ? (
          <label htmlFor={idAny} className={finalOptionClassName}>
            {renderRadioInput(tri === '', {
              id: idAny,
              name: groupName,
              onChange: () => onChange(anyNext),
            })}
            <span className="cursor-pointer select-none">{anyOptionLabel}</span>
          </label>
        ) : null}

        <label htmlFor={idYes} className={finalOptionClassName}>
          {renderRadioInput(tri === 'true', {
            id: idYes,
            name: groupName,
            onChange: () => onChange(true),
          })}
          <span className="cursor-pointer select-none">{yesLabel}</span>
        </label>

        <label htmlFor={idNo} className={finalOptionClassName}>
          {renderRadioInput(tri === 'false', {
            id: idNo,
            name: groupName,
            onChange: () => onChange(false),
          })}
          <span className="cursor-pointer select-none">{noLabel}</span>
        </label>
      </div>

      <div className="min-h-6.25" />
    </fieldset>
  );
}
