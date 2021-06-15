import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie/es6";
import { useHistory } from "react-router-dom";

export const Navbar = () => {

    const cookie = new Cookies();
    const history = useHistory();

    const LogOut = () => {
        cookie.remove('token');
        history.push('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand">Panel del Administrador</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>
                            { !cookie.get('token') &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            }
                            {
                                cookie.get('token') &&
                                <Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">Ordenes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-block btn-danger" onClick={LogOut}>Cerrar Sesión</button>
                                    </li>
                                </Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}