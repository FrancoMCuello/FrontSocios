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
    fecha_ingreso: "",
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
          type="datetime-local"
          name="fecha_ingreso"
          value={registro.fecha_ingreso}
          onChange={(e) => handleChange(e, setRegistro)}
          required
        />
        <input
          type="number"
          name="estado_pago"
          placeholder="Estado de Pago"
          value={registro.estado_pago}
          onChange={(e) => handleChange(e, setRegistro)}
          required
        />
        <input
          type="number"
          name="tipo_pago"
          placeholder="Tipo de Pago"
          value={registro.tipo_pago}
          onChange={(e) => handleChange(e, setRegistro)}
          required
        />
        <input
          type="number"
          name="estado_lavado"
          placeholder="Estado de Lavado"
          value={registro.estado_lavado}
          onChange={(e) => handleChange(e, setRegistro)}
          required
        />
        <input
          type="number"
          name="estado_vehiculo"
          placeholder="Estado del Vehículo"
          value={registro.estado_vehiculo}
          onChange={(e) => handleChange(e, setRegistro)}
          required
        />

        <button type="submit">Crear Registro</button>
      </form>
    </>
  );
}

export default NewRegister;
