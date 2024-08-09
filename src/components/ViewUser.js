import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function ViewUser() {
  const [users, setUsers] = useState([]);

  const apiURL = "http://localhost:3000";

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  const modificarU = (user) => {
    navigate("/changeUser", { state: { user } });
  };

  const deleteU = async (user) => {
    try {
      const response = await axios.delete(`${apiURL}/user/${user.id}`);
      console.log("Usuario eliminado con exito: ", response.data);
      alert("Se elimino usuario con exito");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log("Error: ", error);
      alert("Error al eliminar el usuario.");
    }
  };

  useEffect(() => {
    Promise.all([fetch(`${apiURL}/user`).then((response) => response.json())])
      .then(([usersData]) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="usersContainer">
      <button onClick={navigateHome}>Home</button>
      <h1>Usuarios Registrados</h1>
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nombre</StyledTh>
              <StyledTh>Apellido</StyledTh>
              <StyledTh>Contacto</StyledTh>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <StyledTd>{user.nombre}</StyledTd>
                <StyledTd>{user.apellido}</StyledTd>
                <StyledTd>{user.contacto}</StyledTd>
                <td>
                  <button onClick={() => modificarU(user)}>Modificar</button>
                </td>
                <td>
                  <button onClick={() => deleteU(user)}>Eliminar</button>
                </td>
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

export default ViewUser;
