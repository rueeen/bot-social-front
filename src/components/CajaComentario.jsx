import { useState } from 'react';
export default function CajaComentario({ cerrado, enviar }) {
  const [autor, setAutor] = useState(''); const [texto, setTexto] = useState(''); const [ocupado, setOcupado] = useState(false);
  async function publicar(e) { e.preventDefault(); setOcupado(true); try { await enviar({ autor_nombre: autor.trim(), texto: texto.trim() }); setTexto(''); } catch { /* El interceptor muestra el error. */ } finally { setOcupado(false); } }
  return <form className="tarjeta" onSubmit={publicar}><h2>Participa en la conversación</h2>{cerrado && <p role="status" className="banner">Hilo cerrado</p>}<fieldset disabled={cerrado || ocupado}><label>Tu nombre<input name="autor_nombre" required maxLength={30} value={autor} onChange={e => setAutor(e.target.value)}/></label><label>Tu comentario<textarea name="texto" required maxLength={400} value={texto} onChange={e => setTexto(e.target.value)}/></label><button type="submit" disabled={!autor.trim() || !texto.trim()}>{ocupado ? 'Publicando…' : 'Publicar comentario'}</button></fieldset></form>;
}
