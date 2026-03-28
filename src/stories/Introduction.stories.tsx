import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Actions/Buttons/Button';

const meta: Meta = {
  title: 'Start Here/Introduction',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const IntroductionComponent = () => (
  <div className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-violet-100 p-6 text-zinc-900">
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="p-6 overflow-hidden rounded-4xl border border-zinc-200 bg-(--color-primary-white) shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)]">
        <div className="flex flex-col gap-2">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">AutoCasting UI Library</h1>
            <p className="text-base leading-7 text-zinc-600 md:text-lg">
              Este Storybook es la guía visual del sistema de componentes. Está pensado para diseño y producto: podés
              entrar, comparar variantes, revisar estados y entender rápidamente cómo se usa cada pieza.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[28px] border border-zinc-200 bg-(--color-primary-white) p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Cómo usar este Storybook</h2>
          <div className="mt-5 space-y-4 text-zinc-600">
            <p>
              1. Elegí una categoría en la barra lateral izquierda, por ejemplo <strong>Actions</strong> o{' '}
              <strong>Forms</strong>.
            </p>
            <p>2. Abrí una story para ver el componente en su estado base y en sus variantes más importantes.</p>
            <p>
              3. Usá la pestaña <strong>Controls</strong> para cambiar props sin escribir código.
            </p>
            <p>
              4. Si necesitás entender implementación real, tomá la story como referencia y luego mirá el código del
              componente.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <h3 className="text-lg font-semibold">Ejemplo: Button</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              El componente <strong>Button</strong> vive en <strong>Actions / Buttons / Button</strong>. Ahí podés
              revisar su aspecto principal, la versión outline, el estado danger y el estado disabled.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button variant="primary" className="px-4 py-3">
                Guardar cambios
              </Button>
              <Button variant="primaryOutline" className="px-4 py-3">
                Volver
              </Button>
            </div>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-zinc-200 bg-(--color-primary-white) p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Mapa de dominios</h2>
            <div className="mt-5 grid gap-3 text-sm text-zinc-700">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <strong>Actions</strong>
                <p className="mt-1 text-zinc-600">Botones, menús y triggers.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <strong>Forms</strong>
                <p className="mt-1 text-zinc-600">Inputs, fields, búsqueda y upload.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <strong>Media</strong>
                <p className="mt-1 text-zinc-600">Imágenes, zoom y video.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <strong>Overlays</strong>
                <p className="mt-1 text-zinc-600">Modales y paneles.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <strong>Feedback / Navigation / Flows / Brand / Layout</strong>
                <p className="mt-1 text-zinc-600">Estados, navegación, identidad visual y estructura.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-violet-200 bg-violet-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-violet-950">Qué revisar en cada componente</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-violet-950/80">
              <li>Variant principal y variantes secundarias.</li>
              <li>Estado normal, hover, disabled o error si existe.</li>
              <li>Tamaños, labels y textos reales de producto.</li>
              <li>Consistencia visual con el resto del sistema.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  </div>
);

type Story = StoryObj;

export const Home: Story = {
  render: () => <IntroductionComponent />,
};
