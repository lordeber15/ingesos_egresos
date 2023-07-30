import style from "./navbar.module.css";
import imagen from "../../assets/react.svg";
import { Link } from "react-router-dom";

export default function navbar() {
  return (
    <div className={style.container}>
      <img src={imagen} alt="Falta la Imagen" />
      <div className={style.containerLinks}>
        <Link to={"/ingresos"}>Ingresos</Link>
        <Link to={"/egresos"}>Egresos</Link>
        <Link to={"/consultas"}>Consultas</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/reportes"}>Report</Link>
      </div>
    </div>
  );
}
