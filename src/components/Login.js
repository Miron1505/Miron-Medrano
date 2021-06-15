import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import 'sweetalert2/dist/sweetalert2';
import Swal from "sweetalert2";
const image = require('../images/myApp.png');

const api = "http://192.168.1.10:3030/api";

export const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');

    const cookie = new Cookies();
    const history = useHistory();

    const handleSubmit = async (e) => {

        e.preventDefault();

        await fetch(api + '/signin', {
            method: 'POST',
            headers: { 'Content-Type':  'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        }).then(async (response) => {
            const data = await response.json();
            cookie.set('token', data.token, {path: '/'});
            history.push('/admin');
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                text: 'Usuario o contraseña incorrectos',
                timer: 1100,
                showConfirmButton: false
            })
        });
    }

    return (
        <div>
            {cookie.get('token') && history.push('/')}
            <div className="container mt-5">
                <div className="row">
                <div className="col-md-6">
                    <img className="img-fluid" src={image.default} alt="loginImg"/>
                </div>
                    <div className="col-md-6">
                        <div className="card border-secondary mb-3">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <div className="p-3">
                                    <form className="form-group" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="mb-2"><strong>Nombre de usuario</strong></label>
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    onChange={e => setUsername(e.target.value)} 
                                                    value={username} 
                                                    required
                                                />
                                                <div className="mb-3"/>
                                                <label className="mb-2"><strong>Contraseña</strong></label>
                                                <input 
                                                    className="form-control" 
                                                    type="password" 
                                                    onChange={e => setPassowrd(e.target.value)} 
                                                    value={password} 
                                                    required
                                                />
                                                <div className="mb-4"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 d-grid gap-2">
                                                <button className="btn btn-block btn-primary">Iniciar Sesión</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}