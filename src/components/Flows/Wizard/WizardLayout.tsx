import clsx from 'clsx';
import type { ReactNode } from 'react';

type WizardLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function WizardLayout({ children, className }: WizardLayoutProps) {
  return <div className={clsx('flex h-full min-h-0 flex-col', className)}>{children}</div>;
}

type WizardHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  stepIndex?: number;
  totalSteps?: number;
  progress?: number;
  showStepCount?: boolean;
  showProgressBar?: boolean;
  showProgressPercentage?: boolean;
  className?: string;
  metaClassName?: string;
  progressTrackClassName?: string;
  progressBarClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function WizardHeader({
  title,
  subtitle,
  stepIndex,
  totalSteps,
  progress,
  showStepCount = true,
  showProgressBar = true,
  showProgressPercentage = true,
  className,
  metaClassName,
  progressTrackClassName,
  progressBarClassName,
  contentClassName,
  titleClassName,
  subtitleClassName,
}: WizardHeaderProps) {
  const showStepMeta =
    showStepCount && typeof stepIndex === 'number' && typeof totalSteps === 'number' && totalSteps > 0;
  const showPercentage = showProgressPercentage && typeof progress === 'number';
  const showProgress = showProgressBar && typeof progress === 'number';

  return (
    <header className={clsx('flex flex-col', className)}>
      {showStepMeta || showPercentage ? (
        <div className={clsx('flex items-center justify-between gap-4', metaClassName)}>
          {showStepMeta ? (
            <span>
              {stepIndex + 1} / {totalSteps}
            </span>
          ) : (
            <span />
          )}
          {showPercentage ? <span>{Math.round(progress)}%</span> : null}
        </div>
      ) : null}

      {showProgress ? (
        <div className={clsx(progressTrackClassName)}>
          <div className={clsx(progressBarClassName)} style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      <div className={clsx(contentClassName)}>
        <h2 className={clsx(titleClassName)}>{title}</h2>
        {subtitle ? <p className={clsx(subtitleClassName)}>{subtitle}</p> : null}
      </div>
    </header>
  );
}

type WizardBodyProps = {
  children: ReactNode;
  className?: string;
};

export function WizardBody({ children, className }: WizardBodyProps) {
  return <div className={clsx('flex-1 min-h-0 overflow-y-auto', className)}>{children}</div>;
}

type WizardFooterProps = {
  children: ReactNode;
  className?: string;
};

export function WizardFooter({ children, className }: WizardFooterProps) {
  return <footer className={clsx('shrink-0', className)}>{children}</footer>;
}

type WizardActionsProps = {
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  tertiaryAction?: ReactNode;
  className?: string;
  actionsClassName?: string;
};

export function WizardActions({ primaryAction, secondaryAction, className }: WizardActionsProps) {
  if (!primaryAction && !secondaryAction) return null;

  return (
    <div className={clsx('w-full flex flex-col gap-2 sm:flex-row items-center justify-between', className)}>
      {secondaryAction}
      {primaryAction}
    </div>
  );
}
