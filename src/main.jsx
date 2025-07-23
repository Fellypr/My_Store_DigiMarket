import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import TelaHome from './Pages/TelaHome/TelaHome.jsx'
import TelaAdmin from './Pages/TelaAdmin/TelaHome/AdminHome.jsx'
import Detalhe from './Pages/DetalheDoProduto/Detalhe.jsx'
import Categoria from './Pages/Categoria/Categoria.jsx'
import TelaLoginAdmin from './Pages/Login/TelaLoginAdmin.jsx'
import Protection from './Components/Protection/Protection.jsx'
import Found from './Components/ErroFound/Found.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
          <Route path="/" element={<TelaHome />} />
          <Route path="detalhe/:id" element={<Detalhe />} />
          <Route path="categoria" element={<Categoria />} />
          <Route path="login" element={<TelaLoginAdmin />} /> 

          <Route element={<Protection />}>
            <Route path="2012200519901985" element={<TelaAdmin />} />
          </Route>

          <Route path="*" element={<Found />} />       
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
