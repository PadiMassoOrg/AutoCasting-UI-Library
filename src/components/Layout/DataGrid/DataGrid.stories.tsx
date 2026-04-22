import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import type { OverflowMenuItem } from '../../Actions/Menus/OverflowMenu';
import { Icon } from '../../Brand/Identity/Icon';
import { ChevronUpDown } from '../../Navigation/Indicators/Chevron';
import DataGrid, { type DataGridColumn } from './DataGrid';

type ApplicantRow = {
  id: string;
  stageName: string;
  role: string;
  requirements: Array<'audio' | 'video'>;
  status: string;
  avatarUrl: string;
};

const rows: ApplicantRow[] = [
  {
    id: 'a-1',
    stageName: 'Aldana Martínez',
    role: 'Mujer Golfista',
    requirements: ['audio', 'video'],
    status: 'Preseleccionado',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&q=80',
  },
  {
    id: 'a-2',
    stageName: 'Juan R. Méndez',
    role: 'Tenista',
    requirements: ['video'],
    status: 'Visto',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
  },
  {
    id: 'a-3',
    stageName: 'Marina Lopez',
    role: 'Doble de Riesgo',
    requirements: ['audio'],
    status: 'Seleccionado',
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&q=80',
  },
];

const STATUS_COLOR_BY_LABEL: Record<string, string> = {
  Preseleccionado: 'var(--casting-application-status-preselected)',
  Visto: 'var(--casting-application-status-viewed)',
  Seleccionado: 'var(--casting-application-status-selected)',
};

function StaticStatusDropdown({ label }: { label: string }) {
  const dotColor = STATUS_COLOR_BY_LABEL[label] ?? 'var(--color-secondary-grey-fonts)';

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-light-grey)] px-1.5 py-1 pl-2.5">
      <span className="inline-flex items-center gap-2 text-[var(--color-primary-black)]">
        <span className="text-sm">{label}</span>
        <span className="inline-block h-4 w-4 shrink-0 rounded-full" style={{ background: dotColor }} />
      </span>
      <ChevronUpDown open={false} sizePx={18} className="text-[var(--color-primary-black)]" />
    </div>
  );
}

const columns: DataGridColumn<ApplicantRow>[] = [
  {
    id: 'stageName',
    header: 'Postulante',
    render: (row) => (
      <div className="inline-flex items-center gap-3">
        <img src={row.avatarUrl} alt={row.stageName} className="h-10 w-10 rounded-full object-cover" />
        <span className="font-semibold">{row.stageName}</span>
      </div>
    ),
  },
  {
    id: 'role',
    header: 'Rol',
    name: 'role',
  },
  {
    id: 'requirements',
    header: 'Requerimientos',
    render: (row) => (
      <div className="inline-flex items-center justify-center gap-2">
        {row.requirements.map((requirement) => (
          <span
            key={`${row.id}-${requirement}`}
            className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary-light-grey)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-purple)]"
          >
            <Icon name="play" variant="primary" size={12} />
            {requirement === 'audio' ? 'Audio' : 'Video'}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Estado',
    width: 200,
    contentAlignment: 'right',
    render: (row) => <StaticStatusDropdown label={row.status} />,
  },
];

const meta: Meta<typeof DataGrid<ApplicantRow>> = {
  title: 'Layout/DataGrid',
  component: DataGrid<ApplicantRow>,
  tags: ['autodocs'],
  render: () => {
    const [page, setPage] = useState(0);

    const actions = useMemo(
      () => ({
        header: 'Acciones',
        items: (row: ApplicantRow): OverflowMenuItem[] => [
          { key: `email-${row.id}`, label: 'Enviar Email', iconName: 'mail' },
          { key: `profile-${row.id}`, label: 'Ver Perfil', iconName: 'view' },
        ],
      }),
      []
    );

    return (
      <div className="p-4">
        <DataGrid
          columns={columns}
          data={rows}
          rowKey="id"
          actions={actions}
          pagination={{
            page,
            hasNext: page === 0,
            onPageChange: setPage,
            pageLabel: ({ page: currentPage }) => `Página ${currentPage + 1}`,
            previousLabel: 'Anterior',
            nextLabel: 'Siguiente',
          }}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
