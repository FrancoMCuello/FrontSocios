import { useState } from "react";

import React from "react";
import styled from "styled-components";
import BurguerButton from "./BurguerButton";

function Nav() {
  const [clicked, setClicket] = useState(false);

  const handleClick = () => {
    setClicket(!clicked);
  };

  return (
    <NavContainer>
      <h1>
        Navbar
        <span>Responsive</span>
      </h1>
      <div className={`links ${clicked ? "active" : ""}`}>
        <a href="/register">Nuevo Registro</a>
        <a href="/viewVehiculo">Ver Vehicuos</a>
        <a href="/viewUser">Ver Usuarios</a>
        <a href="/">Dashboard</a>
        <a href="/">Cerra Sesion</a>
      </div>
      <div className="burguer">
        <BurguerButton clicked={clicked} handleClick={handleClick} />
      </div>
    </NavContainer>
  );
}

export default Nav;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  h1 {
    color: white;
    font-weight: 400;
    span {
      padding: 0.3rem;
      font-weight: bold;
    }
  }
  a {
    text-decoration: none;
    color: black;
    margin: 0 0.5rem;
  }
  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    a {
      color: green;
      font-size: 2rem;
      display: block;
    }
    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        color: white;
        display: inline;
      }
    }
  }
  .links.active {
    width: 35%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    top: 45%;
    right: 0;
    left: 62%;
    text-align: center;
    background-color: #333;
    a {
      color: white;
    }
  }
  .burguer {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;
