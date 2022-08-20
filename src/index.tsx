import { lightdm } from 'nody-greeter-types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initGreeter = async (): Promise<void> => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

window.addEventListener("GreeterReady", () => {
  initGreeter();
});
