export default function TarjetasResumen({actual, inicial}) {
  const numero = n => Number.isFinite(Number(n)) ? Number(n).toFixed(1) : '—';
  return <div className="resumen"><article className="tarjeta"><span>Promedio actual</span><strong>{actual ? numero(actual.promedio) : '—'}</strong><small>Escala de −100 a +100</small></article><article className="tarjeta"><span>Cambio desde ronda 0</span><strong>{actual && inicial ? numero(actual.promedio-inicial.promedio) : '—'}</strong><small>Puntos de postura</small></article><article className="tarjeta"><span>Comentarios de bots</span><strong>{actual?.n_comentarios_bot ?? '—'}</strong><small>Favor {actual?.n_favor ?? '—'} · Contra {actual?.n_contra ?? '—'} · Neutral {actual?.n_neutral ?? '—'}</small></article></div>;
}
