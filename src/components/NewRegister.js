import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewRegister() {
  const apiURL = "http://localhost:3000";

  const navigate = useNavigate(); // para redireccionar

  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    contacto: "",
  });

  const [vehiculo, setVehiculo] = useState({
    patente: "",
    modelo: "",
    marca: "",
  });

  const [registro, setRegistro] = useState({
    fecha_ingreso: new Date(),
    estado_pago: "0",
    tipo_pago: "0",
    estado_lavado: "0",
    estado_vehiculo: "0",
  });

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      user,
      vehiculo,
      registro,
    };

    setRegistro((prevRegistro) => ({
      ...prevRegistro,
      fecha_ingreso: new Date(),
    }));

    try {
      const response = await axios.post(`${apiURL}/registros`, datos);
      console.log("Registro con exito: ", response.data);
      alert("Cargado con exito");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="nuevoRegistro">
        <h1>New Register Funciona</h1>
        <form onSubmit={handleSubmit}>
          <h2>Crear Registro</h2>

          <h3>Usuario</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={user.nombre}
            onChange={(e) => handleChange(e, setUser)}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={user.apellido}
            onChange={(e) => handleChange(e, setUser)}
            required
          />
          <input
            type="text"
            name="contacto"
            placeholder="Contacto"
            value={user.contacto}
            onChange={(e) => handleChange(e, setUser)}
            required
          />

          <h3>Vehículo</h3>
          <input
            type="text"
            name="patente"
            placeholder="Patente"
            value={vehiculo.patente}
            onChange={(e) => handleChange(e, setVehiculo)}
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={vehiculo.marca}
            onChange={(e) => handleChange(e, setVehiculo)}
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={vehiculo.modelo}
            onChange={(e) => handleChange(e, setVehiculo)}
            required
          />

          <h3>Registro</h3>
          <input
            type="text"
            name="fecha_ingreso"
            placeholder={new Date()}
            value={registro.fecha_ingreso.toLocaleString()}
            required
            readOnly
          />

          <button type="submit">Crear Registro</button>
        </form>
      </div>
    </>
  );
}

export default NewRegister;
