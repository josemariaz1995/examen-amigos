import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Formulario } from "./componentes/Formulario";
import { Tarjeta } from "./componentes/Tarjeta";

function App() {
  const urlApi = "http://localhost:3001/amigos/";
  const [amigos, setAmigos] = useState([]);

  const numeroAmigos = amigos.length;
  const [editar, setEditar] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [valoracion, setValoracion] = useState(0);
  const [modificar, setModificar] = useState(false);
  const [id, setId] = useState(0);
  const llamadaAmigosApi = async (url) => {
    const response = await fetch(url);
    const amigosApi = await response.json();
    setAmigos(amigosApi);
  };
  useEffect(() => llamadaAmigosApi(urlApi), []);
  const toggleEditar = (e) => {
    e.preventDefault();
    setEditar(!editar);
  };

  const borrarAmigo = async (id) => {
    const response = await fetch(urlApi + id, { method: "DELETE" });
    console.log(urlApi + id);
    if (response) {
      setAmigos(amigos.filter((amigo) => amigo.id !== id));
    }
  };
  const crearAmigo = useCallback(async () => {
    const response = await fetch(urlApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        valoracion: valoracion,
      }),
    });
    if (response) {
      llamadaAmigosApi(urlApi);
    }
  }, [apellido, nombre, valoracion]);
  const modificarAmigo = useCallback(
    async (id) => {
      const response = await fetch(urlApi + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          valoracion: valoracion,
        }),
      });
      if (response) {
        llamadaAmigosApi(urlApi);
      }
    },
    [apellido, nombre, valoracion]
  );
  const editarAmigo = (e) => {
    e.preventDefault();
    setEditar(true);
    setModificar(false);
    setNombre("");
    setApellido("");
    setValoracion(0);
  };
  return (
    <>
      <main className="container vw-100">
        <header>
          <h1>Gestión de mis {numeroAmigos} amigos</h1>
        </header>
        <form className="form-group row align-items-center justify-content-between">
          {editar && (
            <Formulario
              setNombre={setNombre}
              setApellido={setApellido}
              setValoracion={setValoracion}
              crearAmigo={crearAmigo}
              modificar={modificar}
              nombre={nombre}
              apellido={apellido}
              valoracion={valoracion}
            />
          )}
          <div className="col-3 row ">
            {!editar && (
              <button
                className="boton rounded mb-3 w-100"
                onClick={editarAmigo}
              >
                Crear
              </button>
            )}

            {editar && (
              <>
                <button
                  className="boton rounded mb-3 w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    modificar ? modificarAmigo(id) : crearAmigo();
                  }}
                >
                  {modificar ? "Modificar" : "Crear"}
                </button>
                <button className="boton rounded w-100" onClick={toggleEditar}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>

        <section className="row ">
          {amigos.map((amigo) => (
            <Tarjeta
              key={amigo.id}
              amigo={amigo}
              borrarAmigo={borrarAmigo}
              setModificar={setModificar}
              setEditar={setEditar}
              setNombre={setNombre}
              setApellido={setApellido}
              setValoracion={setValoracion}
              setId={setId}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
