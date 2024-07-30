import { useEffect, useState } from "react";
import Nav from "./Nav";

function Home() {
  const [registros, setRegistros] = useState([]);

  const apiURL = "http://localhost:3000";

  useEffect(() => {
    Promise.all([
      fetch(`${apiURL}/registros`).then((response) => response.json()),
    ])
      .then(([registrosData]) => {
        setRegistros(registrosData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <>
        <Nav />
      </>
      <div className="registerContainer">
        <h1>Registros de Vehículos</h1>
        <table>
          <thead>
            <tr>
              <th>Estado del Vehículo</th>
              <th>Estado de Lavado</th>
              <th>Fecha de Ingreso</th>
              <th>Fecha de Egreso</th>
              <th>Dominio</th>
              <th>Nombre del Dueño</th>
              <th>Apellido del Dueño</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.estado_vehiculo}</td>
                <td>{registro.estado_lavado}</td>
                <td>{new Date(registro.fecha_ingreso).toLocaleString()}</td>
                <td>{new Date(registro.fecha_egreso).toLocaleString()}</td>
                <td>{registro.vehiculo?.patente}</td>
                <td>{registro.vehiculo?.user?.nombre}</td>
                <td>{registro.vehiculo?.user?.apellido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
