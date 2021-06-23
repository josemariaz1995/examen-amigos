import { useContext } from "react";
import { DatosAmigosContext } from "../context/DatosAmigosContext";

export const Formulario = () => {
  const {
    setNombre,
    setApellido,
    setValoracion,
    nombre,
    apellido,
    valoracion,
  } = useContext(DatosAmigosContext);

  return (
    <>
      <div className=" col-3">
        <label className="form-text" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="col-3" s>
        <label className="form-text" htmlFor="apellido">
          Apellido
        </label>
        <input
          className="form-control"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="col-3" s>
        <label className="form-text" htmlFor="valoración">
          Valoración
        </label>
        <select
          className="form-control"
          id="valoración"
          value={valoracion}
          onChange={(e) => setValoracion(e.target.value)}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </>
  );
};
