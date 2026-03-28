import type { Meta, StoryObj } from '@storybook/react-vite';
import VideoPreviewCard from './VideoPreviewCard';

const meta: Meta<typeof VideoPreviewCard> = {
  title: 'Media/Video/Video Preview Card',
  component: VideoPreviewCard,
  tags: ['autodocs'],
  args: {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <VideoPreviewCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vimeo: Story = {
  args: {
    videoUrl: 'https://vimeo.com/76979871',
  },
};
