export default function SelectorCorridas({corridas, seleccion, cambiar}) {
  return <fieldset className="selector"><legend>Comparar escenarios</legend>{corridas.map(c => <label key={c.id}><input type="checkbox" checked={seleccion.includes(String(c.id))} onChange={() => cambiar(seleccion.includes(String(c.id)) ? seleccion.filter(id => id !== String(c.id)) : [...seleccion,String(c.id)])}/>{c.etiqueta}</label>)}</fieldset>;
}
