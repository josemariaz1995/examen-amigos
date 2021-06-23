import { useContext } from "react";
import { FaTimes, FaPencilAlt, FaStar } from "react-icons/fa";
import { DatosAmigosContext } from "../context/DatosAmigosContext";

export const Tarjeta = (props) => {
  const {
    amigo: { id, nombre, apellido, valoracion },
    borrarAmigo,
    setModificar,
    setEditar,
    setId,
  } = props;
  const { setNombre, setApellido, setValoracion } =
    useContext(DatosAmigosContext);
  const estrellas = [];
  for (let i = 0; i < valoracion; i++) {
    estrellas.push(i);
  }
  const modificar = () => {
    setModificar(true);
    setEditar(true);
    setNombre(nombre);
    setApellido(apellido);
    setValoracion(valoracion);
    setId(id);
  };
  return (
    <div className="col-4 contenedor-tarjeta mr-4">
      <ul className="row mt-4 list-group tarjeta align-items-center text-light position-relative">
        <FaTimes
          className="position-absolute icono-x"
          onClick={() => borrarAmigo(id)}
        />
        <FaPencilAlt
          className="position-absolute icono-lapiz"
          onClick={modificar}
        />

        <li className="col-12 mb-4">
          <span className="mr-2">Nombre:</span>
          <span>{nombre}</span>
        </li>
        <li className="col-12  mb-4">
          <span className="mr-2">Apellido:</span>
          <span>{apellido}</span>
        </li>
        <li className="col-12  mb-4">
          <span className="mr-2">Valoración:</span>
          <span>
            {estrellas.map((estrella) => (
              <FaStar className="mr-1" key={estrella} />
            ))}
          </span>
        </li>
      </ul>
    </div>
  );
};
