import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Hilo from './pages/Hilo';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Toast from './components/Toast';
export default function App() {
  return <BrowserRouter><header className="navegacion"><Link className="marca" to="/">◉ {import.meta.env.VITE_NOMBRE_APP || 'EcoForo'}</Link><span className="sello">LABORATORIO DE OPINIÓN</span><nav><NavLink to="/" end>Foro</NavLink><NavLink to="/presentador">Presentador</NavLink></nav></header><Routes><Route path="/" element={<Inicio/>}/><Route path="/h/:id" element={<Hilo/>}/><Route path="/h/:id/panel" element={<Dashboard/>}/><Route path="/presentador/login" element={<Login/>}/><Route path="/presentador" element={<Panel/>}/><Route path="*" element={<main><h1>Página no encontrada</h1><Link to="/">Volver al foro</Link></main>}/></Routes><Toast/></BrowserRouter>;
}
