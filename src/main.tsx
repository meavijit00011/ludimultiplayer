import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import BoardCtxProvider from './context/BoardCtx.tsx';
import GameCtxProvider from './context/GameCtx.tsx';
createRoot(document.getElementById('root')!).render(
  <BoardCtxProvider>
    <GameCtxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameCtxProvider>
  </BoardCtxProvider>
)
