import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/Store.js';
import App from './App.jsx';
import './index.css';

function handleNarrowScreen() {
  // Calculates zoom out for screen that smaller then 500px
  const currentWidth = window.innerWidth;
  if (currentWidth < 500 && currentWidth > 100) {
    const zoomOutModificator = (8.5 - (8 - currentWidth / 50)) / 10;
    document.body.style.zoom = `${zoomOutModificator}`;
  } else if (currentWidth >= 500) {
    document.body.style.zoom = `1.0`;
  }
}
handleNarrowScreen();
window.addEventListener('resize', handleNarrowScreen);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
