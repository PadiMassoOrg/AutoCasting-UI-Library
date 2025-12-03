import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: '📘 Introduction/Home',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

const IntroductionComponent = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
    <div className="bg-[var(--color-primary-white)] rounded-xl shadow-md p-10 max-w-3xl w-full space-y-6 border border-gray-200">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">AutoCasting UI Library</h1>
        <p className="text-gray-600 text-lg">Componentes reutilizables para un ecosistema visual sólido y coherente.</p>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">🚀 ¿Qué es esto?</h2>
          <p className="text-gray-600">
            Una librería de componentes visuales construida con <strong>React</strong> y <strong>TailwindCSS</strong>,
            diseñada para cubrir las necesidades de diseño del equipo de AutoCasting.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">📦 Instalación</h2>
          <pre className="bg-gray-100 text-base text-gray-800 p-3 rounded-md overflow-x-auto">
            <code>npm install autocasting-ui-library-padimasso</code>
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700">🔧 Uso básico</h2>
          <pre className="bg-gray-100 text-base text-gray-800 p-3 rounded-md overflow-x-auto">
            <code>
              {`import { Button, Input } from 'autocasting-ui-library-padimasso';
import 'autocasting-ui-library-padimasso/dist/styles.css';`}
            </code>
          </pre>
        </div>
      </section>

      <footer className="pt-4 border-t text-center text-base text-gray-400">
        © 2025 AutoCasting. Desarrollado por Padimasso.
      </footer>
    </div>
  </div>
);

type Story = StoryObj;

export const Home: Story = {
  render: () => <IntroductionComponent />,
};
