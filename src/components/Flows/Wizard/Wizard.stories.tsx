import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../Actions/Buttons/Button';
import type { WizardStepProps } from './WizardStep';
import Wizard from './Wizard';
import { WizardBody, WizardFooter, WizardHeader, WizardLayout } from './WizardLayout';

type DemoStepProps = WizardStepProps & {
  title: string;
  description: string;
};

function DemoStep({
  title,
  description,
  stepIndex = 0,
  totalSteps = 0,
  progress = 0,
  isFirstStep = false,
  isLastStep = false,
  goBack,
  goNext,
}: DemoStepProps) {
  return (
    <WizardLayout className="w-full max-w-md rounded-3xl border border-(--color-secondary-outline) bg-(--color-primary-white) p-6 shadow-sm">
      <WizardHeader
        title={title}
        subtitle={description}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        progress={progress}
        className="gap-4"
        metaClassName="flex items-center justify-between gap-4 text-sm text-(--color-secondary-grey-fonts)"
        progressTrackClassName="h-2 rounded-full bg-(--color-secondary-white)"
        progressBarClassName="h-full rounded-full bg-(--color-primary-purple) transition-all duration-200"
        contentClassName="flex flex-col gap-2"
        titleClassName="text-xl font-semibold"
        subtitleClassName="text-sm text-(--color-secondary-grey-fonts)"
      />
      <WizardBody className="mt-6">
        <div className="rounded-2xl bg-(--color-secondary-white) p-4 text-sm text-(--color-secondary-grey-fonts)">
          This area stays flexible and can scroll if a step grows taller than the available space.
        </div>
      </WizardBody>
      <WizardFooter className="mt-6 flex items-center justify-end gap-4">
        <Button variant="primaryOutline" onClick={goBack} disabled={isFirstStep}>
          Back
        </Button>
        <Button variant="primary" onClick={goNext}>
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </WizardFooter>
    </WizardLayout>
  );
}

const meta: Meta<typeof Wizard> = {
  title: 'Flows/Wizard',
  component: Wizard,
  tags: ['autodocs'],
  render: () => (
    <div className="flex h-[420px] items-center justify-center p-4">
      <Wizard className="h-full">
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
