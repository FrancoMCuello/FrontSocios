import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ChangeVehiculo() {
  const apiURL = "http://localhost:3000";

  const navigate = useNavigate(); // para navegar
  const location = useLocation(); // para obtener estado
  const selectVehiculo = location?.state?.vehiculo;

  const navigateHome = () => {
    navigate("/");
  };
  const navigateBack = () => {
    navigate("/viewVehiculo");
  };

  const [vehiculo, setVehiculo] = useState({
    patente: selectVehiculo?.patente || "",
    modelo: selectVehiculo?.modelo || "",
    marca: selectVehiculo?.marca || "",
  });

  console.log(vehiculo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${apiURL}/vehiculos/${selectVehiculo.id}`,
        vehiculo
      );
      console.log("Vehiculo modificado con exito: ", response.data);
      alert("Modificacion con exito");

      setTimeout(() => {
        navigate("/viewVehiculo");
      }, 1000);
    } catch (error) {
      console.log("Error: ", error);
      alert("Error al modificar el vehículo. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <div className="modificarVehiculo">
        <button onClick={navigateHome}>Home</button>
        <button onClick={navigateBack}>Back</button>
        <h1>Modificar Vehiculo</h1>
        <form onSubmit={handleSubmit}>
          <h2>Complete los cambios</h2>

          <h3>{`Vehículo a modificar: ${selectVehiculo?.patente}`}</h3>
          <input
            type="text"
            name="patente"
            placeholder="Patente"
            value={vehiculo.patente}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={vehiculo.marca}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={vehiculo.modelo}
            onChange={handleChange}
            required
          />

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </>
  );
}

export default ChangeVehiculo;
