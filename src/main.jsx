import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import TelaHome from './Pages/TelaHome/TelaHome.jsx'
import TelaAdmin from './Pages/TelaAdmin/TelaHome/AdminHome.jsx'
import Detalhe from './Pages/DetalheDoProduto/Detalhe.jsx'
import Categoria from './Pages/Categoria/Categoria.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
          <Route path="/" element={<TelaHome />} />
          <Route path="detalhe/:id" element={<Detalhe />} />
          <Route path="admin" element={<TelaAdmin />} />
          <Route path="categoria" element={<Categoria />} />        
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
