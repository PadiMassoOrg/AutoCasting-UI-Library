import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ChangeEvent } from 'react';
import ChoiceChip from '../DataDisplay/Chips/ChoiceChip';
import TagChip from '../DataDisplay/Chips/TagChip';
import FormCurrencyField from './Fields/FormCurrencyField';
import FormInputField from './Fields/FormInputField';
import FormSelectField from './Fields/FormSelectField';
import SearchInput from './Search/SearchInput';
import BooleanRadioGroup from './Selection/BooleanRadioGroup';
import CheckboxField from './Selection/CheckboxField';
import MultiRadioGroupField from './Selection/MultiRadioGroupField';
import MultiSelectDropdown from './Selection/MultiSelectDropdown';
import RadioGroupField from './Selection/RadioGroupField';
import RangeCalendar from './Selection/RangeCalendar';
import TextareaField from './Selection/TextareaField';

type Option = { id: string; label: string };

const OPTIONS: Option[] = [
  { id: 'actor', label: 'Actor/Actriz' },
  { id: 'model', label: 'Modelo' },
  { id: 'dancer', label: 'Bailarín/a' },
];

const RADIO_OPTIONS = OPTIONS.map((option) => ({ value: option.id, label: option.label }));

type Args = { disabled: boolean };

const DisabledStatesGallery = ({ disabled }: Args) => {
  const [text, setText] = useState('Casting para comercial');
  const [select, setSelect] = useState('model');
  const [amount, setAmount] = useState('15.000');
  const [about, setAbout] = useState('Descripción del casting');
  const [multi, setMulti] = useState<string[]>(['actor']);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [boolValue, setBoolValue] = useState<boolean | null | undefined>(true);
  const [radio, setRadio] = useState('actor');
  const [multiRadio, setMultiRadio] = useState<string[]>(['model']);
  const [checked, setChecked] = useState(true);
  const [search, setSearch] = useState('');
  const [chip, setChip] = useState(true);

  return (
    <div className="grid max-w-3xl grid-cols-1 gap-x-6 gap-y-2 p-6 md:grid-cols-2">
      <FormInputField
        id="text"
        label="FormInputField"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <FormSelectField
        id="select"
        label="FormSelectField"
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        options={RADIO_OPTIONS}
        disabled={disabled}
      />
      <FormCurrencyField
        id="amount"
        label="FormCurrencyField"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={disabled}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">MultiSelectDropdown</span>
        <MultiSelectDropdown
          title="Profesiones"
          options={OPTIONS}
          getId={(option) => option.id}
          getLabel={(option) => option.label}
          selected={multi}
          onChange={setMulti}
          disabled={disabled}
        />
      </div>
      <RangeCalendar
        label="RangeCalendar"
        selectionMode="single"
        displayMode="dropdown"
        value={date}
        onChange={setDate}
        disabled={disabled}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">SearchInput</span>
        <SearchInput
          value={search}
          onChange={setSearch}
          onCommit={setSearch}
          placeholder="Buscar"
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <TextareaField
          id="about"
          label="TextareaField"
          value={about}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
          disabled={disabled}
        />
      </div>
      <BooleanRadioGroup
        label="BooleanRadioGroup"
        value={boolValue}
        onChange={setBoolValue}
        yesLabel="Sí"
        noLabel="No"
        disabled={disabled}
      />
      <RadioGroupField
        label="RadioGroupField"
        value={radio}
        options={RADIO_OPTIONS}
        onValueChange={setRadio}
        disabled={disabled}
      />
      <MultiRadioGroupField
        label="MultiRadioGroupField"
        selected={multiRadio}
        options={RADIO_OPTIONS}
        onChange={setMultiRadio}
        disabled={disabled}
      />
      <div className="flex flex-col gap-4">
        <CheckboxField
          id="checkbox"
          label="CheckboxField"
          checked={checked}
          onCheckedChange={setChecked}
          disabled={disabled}
        />
        <div className="flex gap-2">
          <ChoiceChip label="ChoiceChip" selected={chip} onClick={() => setChip((prev) => !prev)} disabled={disabled} />
          <TagChip label="TagChip" onRemove={() => undefined} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof DisabledStatesGallery> = {
  title: 'Forms/Estados deshabilitados',
  component: DisabledStatesGallery,
  tags: ['autodocs'],
  args: { disabled: true },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {};

export const Enabled: Story = { args: { disabled: false } };
