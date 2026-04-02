import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from './Tooltip';
import type { TooltipPosition } from './Tooltip';
import { Icon } from '../../Brand/Identity/Icon';

const StoryCanvas = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-(--color-secondary-white) p-10">
    {children}
  </div>
);

const PositionItem = ({
  label,
  tooltip,
  icon,
  position,
}: {
  label: string;
  tooltip: string;
  icon: React.ComponentProps<typeof Icon>['name'];
  position: TooltipPosition;
}) => (
  <div className="flex flex-col items-center gap-3">
    <Tooltip title={tooltip} position={position}>
      <button
        type="button"
        aria-label={label}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-(--color-secondary-outline) bg-white"
      >
        <Icon name={icon} />
      </button>
    </Tooltip>
    <span className="text-xs font-medium text-(--color-secondary-gray)">{label}</span>
  </div>
);

const NavbarItem = ({
  icon,
  label,
  tooltip,
  position,
}: {
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  tooltip: string;
  position: TooltipPosition;
}) => (
  <Tooltip title={tooltip} position={position}>
    <button
      type="button"
      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-(--color-primary-black) transition-colors hover:bg-white"
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  </Tooltip>
);

const SimpleNavbar = () => (
  <nav className="flex w-full max-w-3xl items-center justify-between rounded-[24px] border border-(--color-secondary-outline) bg-white px-4 py-3 shadow-sm">
    <div className="flex items-center gap-2">
      <Tooltip title="Buscar castings" position="bottomLeft">
        <button
          type="button"
          aria-label="Buscar castings"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-(--color-secondary-white)"
        >
          <Icon name="search" />
        </button>
      </Tooltip>

      <NavbarItem icon="calendar" label="Agenda" tooltip="Ver agenda de rodaje" position="bottomLeft" />
      <NavbarItem icon="applicants" label="Candidatos" tooltip="Revisar candidatos" position="bottomLeft" />
    </div>

    <div className="flex items-center gap-2">
      <Tooltip title="Ir al perfil" position="bottomRight">
        <button
          type="button"
          aria-label="Ir al perfil"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-(--color-secondary-white)"
        >
          <Icon name="profile" />
        </button>
      </Tooltip>

      <NavbarItem icon="settings" label="Ajustes" tooltip="Abrir configuracion" position="bottomRight" />
    </div>
  </nav>
);

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AllPositions: Story = {
  render: () => (
    <StoryCanvas>
      <div className="grid grid-cols-2 gap-x-20 gap-y-14">
        <PositionItem label="Top Left" tooltip="Tooltip Top Left" icon="delete" position="topLeft" />
        <PositionItem label="Top Right" tooltip="Tooltip Top Right" icon="settings" position="topRight" />
        <PositionItem label="Bottom Left" tooltip="Tooltip Bottom Left" icon="calendar" position="bottomLeft" />
        <PositionItem label="Bottom Right" tooltip="Tooltip Bottom Right" icon="profile" position="bottomRight" />
      </div>
    </StoryCanvas>
  ),
};

export const SimpleNavbarPreview: Story = {
  render: () => (
    <StoryCanvas>
      <SimpleNavbar />
    </StoryCanvas>
  ),
};
