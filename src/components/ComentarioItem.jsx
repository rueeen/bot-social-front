export function postura(valor) { return valor === 'favor' || valor === 'a_favor' || Number(valor) > 0 ? 'favor' : valor === 'contra' || valor === 'en_contra' || Number(valor) < 0 ? 'contra' : 'neutral'; }
export default function ComentarioItem({ comentario: c }) {
  const tipo = postura(c.postura_bot);
  return <article className={`comentario ${c.es_bot ? tipo : ''}`}><div className="fila"><strong>{c.autor_nombre}</strong>{c.es_bot && <span className={`insignia ${tipo}`}>🤖 bot · {tipo === 'favor' ? 'a favor' : tipo === 'contra' ? 'en contra' : 'neutral'}</span>}<time dateTime={c.fecha}>{c.fecha && new Date(c.fecha).toLocaleString('es-CL')}</time></div><p className="texto-comentario">{c.texto}</p></article>;
}
