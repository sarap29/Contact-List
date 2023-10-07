import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import phone from "../../img/phone.png";

export const Home = () => {
 
  return (
    <div className="main-container">
     <div className="row header">
    <div className="col hora">
    9:41
    </div>
    <div className="col">
    <i className="fa-solid fa-battery-half"></i> <i class="fa-solid fa-wifi"></i>
    </div>
   
  </div>

  <div className="row ">
  <div className="col-12 presentacion" >
    <img className="phone" src={phone}></img>
    </div>
    <div className="col-12 descripcion" >
    <h1>Hello</h1>
    <p><span>Welcome</span> to de the contact list. Are you ready?</p>
    <Link to="/parteuno">
    <button>Start</button>
            </Link>
    </div>
  </div>
    
    </div>
  );
};




