import { Route, Routes } from 'react-router'
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import PageNotFound from './pages/PageNotFound';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/gamePlay' element={<GamePlay />}></Route>
      <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
  )
}

export default App
