import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
export default function Login() {
  const [usuario,setUsuario]=useState(''); const [clave,setClave]=useState(''); const [ocupado,setOcupado]=useState(false); const navegar=useNavigate();
  async function entrar(e) {e.preventDefault(); setOcupado(true); try {const {data}=await api.post('/token/',{username:usuario,password:clave},{humano:true}); localStorage.setItem('access_token',data.access); localStorage.setItem('refresh_token',data.refresh); navegar('/presentador',{replace:true});} catch { /* Aviso centralizado. */ } finally {setOcupado(false);} }
  return <main className="acceso"><form className="tarjeta" onSubmit={entrar}><span className="eyebrow">ACCESO DOCENTE</span><h1>Hola, presentador.</h1><p>Prepara las conversaciones de tu próxima clase.</p><label>Usuario<input autoComplete="username" required value={usuario} onChange={e => setUsuario(e.target.value)}/></label><label>Contraseña<input type="password" autoComplete="current-password" required value={clave} onChange={e => setClave(e.target.value)}/></label><button disabled={ocupado}>{ocupado ? 'Ingresando…' : 'Entrar al panel →'}</button></form></main>;
}
