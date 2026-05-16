import clsx from 'clsx';
import { Children, cloneElement, isValidElement, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import type { WizardInjectedProps, WizardStepProps } from './WizardStep';

type WizardProps = {
  children: ReactNode;
  activeStep?: number;
  initialStep?: number;
  onStepChange?: (stepIndex: number) => void;
  className?: string;
};

function Wizard({ children, activeStep, initialStep = 0, onStepChange, className }: WizardProps) {
  const steps = useMemo(
    () => Children.toArray(children).filter(isValidElement) as ReactElement<WizardStepProps>[],
    [children]
  );

  const [internalActiveIndex, setInternalActiveIndex] = useState(initialStep);
  const isControlled = typeof activeStep === 'number';
  const rawActiveIndex = isControlled ? activeStep : internalActiveIndex;

  const totalSteps = steps.length;
  const activeIndex = totalSteps === 0 ? 0 : Math.min(Math.max(rawActiveIndex, 0), totalSteps - 1);
  const progress = totalSteps === 0 ? 0 : ((activeIndex + 1) / totalSteps) * 100;

  const setStep = (nextIndex: number) => {
    const clampedIndex = totalSteps === 0 ? 0 : Math.min(Math.max(nextIndex, 0), totalSteps - 1);
    if (!isControlled) {
      setInternalActiveIndex(clampedIndex);
    }
    onStepChange?.(clampedIndex);
  };

  const goNext = () => setStep(activeIndex + 1);
  const goBack = () => setStep(activeIndex - 1);
  const goToStep = (index: number) => setStep(index);

  const injectedProps: WizardInjectedProps = {
    stepIndex: activeIndex,
    totalSteps,
    progress,
    isFirstStep: activeIndex === 0,
    isLastStep: totalSteps > 0 && activeIndex === totalSteps - 1,
    goNext,
    goBack,
    goToStep,
  };

  const CurrentStep = steps[activeIndex];

  if (!CurrentStep) return null;

  return (
    <div className={clsx('flex h-full min-h-0 flex-col', className)}>{cloneElement(CurrentStep, injectedProps)}</div>
  );
}

export default Wizard;
