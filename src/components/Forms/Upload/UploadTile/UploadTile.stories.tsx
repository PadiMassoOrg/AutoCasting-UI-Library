import type { Meta, StoryObj } from '@storybook/react-vite';
import UploadTile from './UploadTile';

const previewUrl = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
    <rect width="800" height="1000" fill="#0f766e" />
    <text
      x="50%"
      y="50%"
      dominant-baseline="middle"
      text-anchor="middle"
      fill="white"
      font-family="Arial, sans-serif"
      font-size="72"
    >
      Preview
    </text>
  </svg>
`)}`;

const meta: Meta<typeof UploadTile> = {
  title: 'Forms/Upload/Upload Tile',
  component: UploadTile,
  tags: ['autodocs'],
  args: {
    label: 'Upload photo',
    onSelect: () => undefined,
    aspectRatio: '4 / 5',
  },
  render: (args) => (
    <div className="w-[240px]">
      <UploadTile {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPreview: Story = {
  args: {
    previewUrl,
    onClear: () => undefined,
  },
};
