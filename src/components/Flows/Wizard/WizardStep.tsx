import type { ReactNode } from 'react';

export type WizardInjectedProps = {
  stepIndex: number;
  totalSteps: number;
  progress: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  goNext: () => void;
  goBack: () => void;
  goToStep: (index: number) => void;
};

export type WizardStepProps = Partial<WizardInjectedProps> & {
  children?: ReactNode;
};

function WizardStep({ children }: WizardStepProps) {
  return <>{children}</>;
}

export default WizardStep;
