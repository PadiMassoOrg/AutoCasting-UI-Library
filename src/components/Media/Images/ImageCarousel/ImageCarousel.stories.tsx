import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageCarousel from './ImageCarousel';

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

const images = [
  makeImage('Image 1', '#7c3aed'),
  makeImage('Image 2', '#ec4899'),
  makeImage('Image 3', '#0f766e'),
  makeImage('Image 4', '#ea580c'),
];

const meta: Meta<typeof ImageCarousel> = {
  title: 'Media/Images/Image Carousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  args: {
    images,
  },
  render: (args) => {
    const desktopLayout = Boolean(args.isDesktop || args.isDesktopXL);

    return (
      <div className={desktopLayout ? 'h-[440px] w-[720px]' : 'w-[320px]'}>
        <ImageCarousel {...args} className={desktopLayout ? 'h-full' : undefined} enablePhotoZoomOverlay />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Desktop: Story = {
  args: {
    isDesktop: true,
  },
};

export const DesktopXL: Story = {
  args: {
    isDesktopXL: true,
  },
};
