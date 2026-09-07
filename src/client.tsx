import { createRoot } from 'react-dom/client';
import { Home } from './pages/Home.js';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root');

createRoot(root).render(<Home config={{ origin: window.location.origin, basePath: '' }} />);

requestAnimationFrame(() => {
  const interaction = document.createElement('script');
  interaction.src = '/program-focus.js';
  document.head.append(interaction);
});
