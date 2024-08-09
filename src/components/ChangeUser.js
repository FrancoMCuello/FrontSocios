import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ChangeUser() {
  const apiURL = "http://localhost:3000";

  const navigate = useNavigate(); // para navegar
  const location = useLocation(); // para obtener estado
  const selectUser = location?.state?.user;

  const navigateHome = () => {
    navigate("/");
  };
  const navigateBack = () => {
    navigate("/viewUser");
  };

  const [user, setUser] = useState({
    nombre: selectUser?.nombre || "",
    apellido: selectUser?.apellido || "",
    contacto: selectUser?.contacto || "",
  });

  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${apiURL}/user/${selectUser.id}`, user);
      console.log("Usuario modificado con exito: ", response.data);
      alert("Modificacion con exito");

      setTimeout(() => {
        navigate("/viewUser");
      }, 1000);
    } catch (error) {
      console.log("Error: ", error);
      alert("Error al modificar el usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <div className="modificarUsuario">
        <button onClick={navigateHome}>Home</button>
        <button onClick={navigateBack}>Back</button>
        <h1>Modificar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <h2>Complete los cambios</h2>

          <h3>{`Usuario a modificar: ${selectUser?.nombre} ${selectUser?.apellido}`}</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={user.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={user.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contacto"
            placeholder="Contacto"
            value={user.contacto}
            onChange={handleChange}
            required
          />

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </>
  );
}

export default ChangeUser;
