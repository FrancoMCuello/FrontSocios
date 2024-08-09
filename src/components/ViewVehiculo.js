import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ViewVehiculo() {
  const [vehiculos, setVehiculos] = useState([]);

  const apiURL = "http://localhost:3000";

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    Promise.all([
      fetch(`${apiURL}/vehiculos`).then((response) => response.json()),
    ])
      .then(([vehiculosData]) => {
        setVehiculos(vehiculosData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="vehiculosContainer">
      <button onClick={navigateHome}>Home</button>
      <h1>Vehículos Registrados</h1>
      {vehiculos.length === 0 ? (
        <p>No hay vehiculos disponibles</p>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Patente</StyledTh>
              <StyledTh>Marca</StyledTh>
              <StyledTh>Modelo</StyledTh>
              <StyledTh>Nombre</StyledTh>
              <StyledTh>Apellido</StyledTh>
              <StyledTh>Contacto</StyledTh>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo, index) => (
              <tr key={index}>
                <StyledTd>{vehiculo.patente}</StyledTd>
                <StyledTd>{vehiculo.marca}</StyledTd>
                <StyledTd>{vehiculo.modelo}</StyledTd>
                <StyledTd>{vehiculo.user?.nombre}</StyledTd>
                <StyledTd>{vehiculo.user?.apellido}</StyledTd>
                <StyledTd>{vehiculo.user?.contacto}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </div>
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

export default ViewVehiculo;
