import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../Actions/Buttons/Button';
import type { WizardStepProps } from './WizardStep';
import Wizard from './Wizard';

type DemoStepProps = WizardStepProps & {
  title: string;
  description: string;
};

function DemoStep({ title, description, stepIndex = 0, totalSteps = 0, progress = 0, goBack, goNext }: DemoStepProps) {
  const isLastStep = stepIndex === totalSteps - 1;

  return (
    <div className="w-full max-w-md rounded-3xl border border-(--color-secondary-outline) bg-(--color-primary-white) p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-(--color-secondary-grey-fonts)">
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>

      <div className="mb-6 h-2 rounded-full bg-(--color-secondary-white)">
        <div
          className="h-full rounded-full bg-(--color-primary-purple) transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-(--color-secondary-grey-fonts)">{description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <Button variant="primaryOutline" onClick={goBack}>
          Back
        </Button>
        <Button variant="primary" onClick={goNext}>
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof Wizard> = {
  title: 'Flows/Wizard',
  component: Wizard,
  tags: ['autodocs'],
  render: () => (
    <div className="flex min-h-[320px] items-center justify-center p-4">
      <Wizard>
        <DemoStep title="Profile" description="Start the flow by collecting the main profile details." />
        <DemoStep title="Media" description="Review uploaded assets before moving to the final confirmation." />
        <DemoStep title="Publish" description="Confirm the setup and finish the wizard." />
      </Wizard>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
