import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../Actions/Buttons/Button';
import { Icon } from '../../Brand/Identity/Icon';
import MasterDetailShell from './MasterDetailShell';

const meta: Meta<typeof MasterDetailShell> = {
  title: 'Layout/MasterDetailShell',
  component: MasterDetailShell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCastings = Array.from({ length: 8 }).map((_, index) => ({
  id: `casting-${index + 1}`,
  title: `Casting ${index + 1}`,
  subtitle: 'Temporada Verano Crucero',
}));

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState(sampleCastings[1]?.id ?? sampleCastings[0].id);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const selectedCasting = sampleCastings.find((item) => item.id === selectedId) ?? sampleCastings[0];

    return (
      <div className="bg-(--color-secondary-white) p-4">
        <MasterDetailShell
          desktopPaneHeight="70vh"
          menu={
            <div className="flex min-h-full flex-col gap-4 bg-(--color-secondary-white) p-4">
              <div className="sticky top-0 z-10 flex items-center justify-between bg-(--color-secondary-white) pb-4">
                <h2 className="text-2xl font-semibold text-(--color-primary-black)">Castings</h2>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-(--color-secondary-outline) bg-(--color-primary-white)"
                  onClick={() => setFiltersOpen((value) => !value)}
                  aria-pressed={filtersOpen}
                  aria-label={filtersOpen ? 'Cerrar filtros' : 'Abrir filtros'}
                >
                  <Icon name="filter" variant="primary" />
                </button>
              </div>

              {filtersOpen ? (
                <section className="rounded-2xl border border-dashed border-(--color-secondary-outline) bg-(--color-primary-white) p-4 text-sm text-(--color-secondary-grey-fonts)">
                  Panel de filtros de ejemplo.
                </section>
              ) : null}

              {sampleCastings.map((item) => {
                const isSelected = item.id === selectedId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={[
                      'w-full rounded-2xl border bg-(--color-primary-white) p-4 text-left transition-colors',
                      isSelected
                        ? 'border-(--color-primary-purple)'
                        : 'border-(--color-secondary-outline) hover:border-(--color-primary-purple)',
                    ].join(' ')}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <h3 className="font-semibold text-(--color-primary-black)">{item.title}</h3>
                    <p className="text-sm text-(--color-secondary-grey-fonts)">{item.subtitle}</p>
                  </button>
                );
              })}
            </div>
          }
          content={
            <div className="flex min-h-full flex-col gap-5 p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <section key={`content-block-${index}`} className="rounded-2xl bg-(--color-secondary-white) p-5">
                  <h3 className="font-semibold text-(--color-primary-black)">
                    {selectedCasting.title} - Sección {index + 1}
                  </h3>
                  <p className="mt-2 text-sm text-(--color-secondary-grey-fonts)">
                    Este bloque existe para demostrar el scroll interno independiente del content.
                  </p>
                </section>
              ))}
            </div>
          }
          contentHeader={
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-(--color-primary-black)">{selectedCasting.title}</h2>
              <p className="text-sm font-light text-(--color-secondary-grey-fonts)">{selectedCasting.subtitle}</p>
            </div>
          }
          contentActions={
            <Button variant="primary" onClick={() => window.alert(`Aplicar en ${selectedCasting.title}`)}>
              Aplicar
            </Button>
          }
        />
      </div>
    );
  },
};
