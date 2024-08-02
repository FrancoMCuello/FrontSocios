import { useEffect, useState } from "react";
import Nav from "./Nav";
import { FaCircle } from "react-icons/fa";
import styled from "styled-components";

function Home() {
  // Logica
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

  const renderState = (state) => {
    let color;
    switch (state) {
      case 0:
        color = "red";
        break;
      case 1:
        color = "green";
        break;
      case 2:
        color = "yellow";
        break;
      default:
        color = "grey"; // Color por defecto si el estado no coincide con 0, 1 o 2
    }
    return <FaCircle color={color} />;
  };

  //DOM
  return (
    <>
      <>
        <Nav />
      </>
      <div className="registerContainer">
        <h1>Registros de Vehículos</h1>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Estado del Vehículo</StyledTh>
              <StyledTh>Estado de Lavado</StyledTh>
              <StyledTh>Fecha de Ingreso</StyledTh>
              <StyledTh>Dominio</StyledTh>
              <StyledTh>Nombre del Dueño</StyledTh>
              <StyledTh>Apellido del Dueño</StyledTh>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <StyledTd>{renderState(registro.estado_vehiculo)}</StyledTd>
                <StyledTd>{renderState(registro.estado_lavado)}</StyledTd>
                <StyledTd>
                  {new Date(registro.fecha_ingreso).toLocaleString()}
                </StyledTd>
                <StyledTd>{registro.vehiculo?.patente}</StyledTd>
                <StyledTd>{registro.vehiculo?.user?.nombre}</StyledTd>
                <StyledTd>{registro.vehiculo?.user?.apellido}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </>
  );
}

//Estilos
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const StyledTd = styled.td`
  background-color: #646363;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

export default Home;
