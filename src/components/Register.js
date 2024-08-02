import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {
  const apiURL = "http://localhost:3000";

  const navigate = useNavigate();

  const [patente, setPatente] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateNewRegister = () => {
    navigate("/newRegister");
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `${apiURL}/vehiculos/patente/${patente}`
      );
      const vehiculo = response.data;

      if (vehiculo) {
        const { user } = vehiculo;
        const registroData = {
          user: {
            nombre: user.nombre,
            apellido: user.apellido,
            contacto: user.contacto,
          },
          vehiculo: {
            patente: vehiculo.patente,
            modelo: vehiculo.modelo,
            marca: vehiculo.marca,
          },
          registro: {
            fecha_ingreso: new Date().toISOString(),
            estado_pago: "0",
            tipo_pago: "0",
            estado_lavado: "0",
            estado_vehiculo: "0",
            vehiculoId: vehiculo.id,
          },
        };

        await axios.post(`${apiURL}/registros`, registroData);

        console.log("Registro con exito: ", response.data);
        alert("Registro creado correctamente");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("No se encontró patente");
        navigate("/newRegister");
      } else {
        console.error("Error al consultar vehículo o crear registro.", error);
        alert("Hubo un error al generar el registro.");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <h1>Generar registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patente"
          placeholder="Ingrese su patente"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
          required
        />
        <button type="submit" disable={loading}>
          {loading ? "Cargando..." : "Crear Registro"}
        </button>
      </form>
      <button onClick={navigateNewRegister}>Nuevo Usuario</button>
      <button onClick={navigateHome}>Home</button>
    </>
  );
}

export default Register;
