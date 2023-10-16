import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 导入store
import store from './store';
// 导入store提供组件Provider
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
)
