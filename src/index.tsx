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

if (process.env.NODE_ENV==="development"){
  initGreeter();
}
else{
  window.addEventListener("GreeterReady", () => {
    initGreeter();
  });
}
