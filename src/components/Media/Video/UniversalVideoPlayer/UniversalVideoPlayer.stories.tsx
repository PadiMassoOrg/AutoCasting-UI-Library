import type { Meta, StoryObj } from '@storybook/react-vite';
import UniversalVideoPlayer from './UniversalVideoPlayer';

const meta: Meta<typeof UniversalVideoPlayer> = {
  title: 'Media/Video/Universal Video Player',
  component: UniversalVideoPlayer,
  tags: ['autodocs'],
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Demo video',
  },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <UniversalVideoPlayer {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vimeo: Story = {
  args: {
    url: 'https://vimeo.com/76979871',
  },
};

export const Unsupported: Story = {
  args: {
    url: 'https://example.com/video.mp4',
  },
};
