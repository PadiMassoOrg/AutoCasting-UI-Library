import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchWithSuggestions from './SearchWithSuggestions';

const meta: Meta<typeof SearchWithSuggestions> = {
  title: 'Forms/Search/SearchWithSuggestions',
  component: SearchWithSuggestions,
  tags: ['autodocs'],
  args: {
    label: 'Skills',
    placeholder: 'Type a skill...',
    suggestions: [
      { id: '1', text: 'marketing: content creation' },
      { id: '2', text: 'production: video editing' },
      { id: '3', text: 'media: paid social' },
      { id: '4', text: 'language: english' },
    ],
    onSelect: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SearchWithSuggestions>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <SearchWithSuggestions {...args} />
    </div>
  ),
};
