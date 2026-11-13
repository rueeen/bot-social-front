import { useEffect, useState } from 'react';
export default function Toast() {
  const [mensaje, setMensaje] = useState('');
  useEffect(() => { let temporizador; const mostrar = e => { setMensaje(e.detail); clearTimeout(temporizador); temporizador = setTimeout(() => setMensaje(''), 6500); }; window.addEventListener('aviso', mostrar); return () => { clearTimeout(temporizador); window.removeEventListener('aviso', mostrar); }; }, []);
  return mensaje && <div className="toast" role="alert">{mensaje}<button aria-label="Cerrar aviso" onClick={() => setMensaje('')}>×</button></div>;
}
