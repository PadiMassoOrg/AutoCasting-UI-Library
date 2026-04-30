import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MultiSelectDropdown from './MultiSelectDropdown';
import FilterSection from './FilterSection';
import { Separator } from '../../Layout/Separator';

type Option = { id: string; label: string };

const OPTIONS: Option[] = [
  { id: 'fashion', label: 'Fashion' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'sports', label: 'Sports' },
  { id: 'travel', label: 'Travel' },
];

const OptionDropdown = MultiSelectDropdown<Option>;

const meta: Meta<typeof OptionDropdown> = {
  title: 'Forms/Selection/MultiSelectDropdown',
  component: OptionDropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OptionDropdown>;

export const Multiple: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['fashion', 'sports']);

    return (
      <aside className="z-[300] w-full max-w-[350px] flex flex-col items-stretch overflow-auto overflow-x-hidden bg-[var(--primary-color-white)] p-4 rounded-xl border border-[var(--color-primary-light-grey)]">
        <header className="flex items-center justify-between">
          <h4 className="text-[14px] font-bold">Filters</h4>
          <button type="button" className="cursor-pointer text-xs font-light hover:text-[var(--color-primary-purple)]">
            Reset
          </button>
        </header>

        <Separator className="opacity-20 mt-8" />

        <FilterSection title="Categories" count={selected.length} defaultOpen>
          <OptionDropdown
            options={OPTIONS}
            selected={selected}
            onChange={setSelected}
            getId={(option) => option.id}
            getLabel={(option) => option.label}
            maxPanelHeight="16rem"
          />
        </FilterSection>
      </aside>
    );
  },
};

export const Single: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | undefined>('beauty');

    return (
      <aside className="z-[300] w-full max-w-[350px] flex flex-col items-stretch overflow-auto overflow-x-hidden bg-[var(--primary-color-white)] p-4 rounded-xl border border-[var(--color-primary-light-grey)]">
        <header className="flex items-center justify-between">
          <h4 className="text-[14px] font-bold">Filters</h4>
          <button type="button" className="cursor-pointer text-xs font-light hover:text-[var(--color-primary-purple)]">
            Reset
          </button>
        </header>

        <Separator className="opacity-20 mt-8" />

        <FilterSection title="Primary Category" count={selected ? 1 : 0} defaultOpen>
          <OptionDropdown
            mode="single"
            options={OPTIONS}
            selected={selected}
            onChange={setSelected}
            getId={(option) => option.id}
            getLabel={(option) => option.label}
            hideSelectAll
            selectionsLabel={(count) => (count ? '1 selected' : 'Pick one')}
            maxPanelHeight="16rem"
          />
        </FilterSection>
      </aside>
    );
  },
};
