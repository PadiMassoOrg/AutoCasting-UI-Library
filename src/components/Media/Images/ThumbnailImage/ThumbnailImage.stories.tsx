import type { Meta, StoryObj } from '@storybook/react-vite';
import ThumbnailImage from './ThumbnailImage';

const makeImage = (label: string, background: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="${background}" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="72"
      >
        ${label}
      </text>
    </svg>
  `)}`;

const meta: Meta<typeof ThumbnailImage> = {
  title: 'Media/Images/Thumbnail Image',
  component: ThumbnailImage,
  tags: ['autodocs'],
  args: {
    alt: 'Profile photo',
    className: 'h-[300px] w-[240px] rounded-xl object-cover',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThumbnailLoaded: Story = {
  args: {
    src: makeImage('Full', '#2563eb'),
    thumbnailSrc: makeImage('Thumbnail', '#db2777'),
  },
};

export const FallsBackToFullImage: Story = {
  args: {
    src: makeImage('Full', '#2563eb'),
    thumbnailSrc: 'https://invalid.example/missing.thumb.webp',
  },
};

export const FallsBackToPlaceholder: Story = {
  args: {
    src: 'https://invalid.example/missing.webp',
    thumbnailSrc: 'https://invalid.example/missing.thumb.webp',
    placeholderSrc: makeImage('Placeholder', '#059669'),
  },
};
