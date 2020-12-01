import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import {DataStore} from '@aws-amplify/datastore';
import { Sala } from './models';

Amplify.configure(awsconfig);

function App() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [salas, setSalas] = useState([]);

    const getSalas = async () => {
        try {
            const salas = await DataStore.query(Sala);
            setSalas(salas);
        } catch (error) {
            console.log("Error retrieving posts", error);
        }
    }

    const handdleAddSala = async (event) => {
        event.preventDefault();

        try {
            const dados = new Sala({
                name: titulo,
                description: descricao
            });

            await DataStore.save(dados);
            
            getSalas();
        } catch (error) {
            console.log("Error saving post", error);
        }
    }

    useEffect(() => {
        getSalas();
    }, []);

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="app#">Meu App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="app#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="app#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="app#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="app#">Action</a>
                                <a className="dropdown-item" href="app#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="app#">Something else here</a>
                            </div>
                        </li>
                    </ul>
                    <div className="ml-auto">
                        <AmplifySignOut />
                    </div>
                </div>
            </nav>
            <main>
                <div className="container my-4">
                    <form className="card shadow-sm mb-3" onSubmit={handdleAddSala}>
                        <div className="card-header">
                            <h5 className="card-title m-0">Nova sala</h5>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group d-flex flex-column align-items-start">
                                        <label>Titulo:</label>
                                        <input className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group d-flex flex-column align-items-start">
                                        <label>Descricao:</label>
                                        <textarea className="form-control" value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer d-flex justify-content-end">
                            <button className="btn btn-success" type="submit">Salvar</button>
                        </div>
                    </form>

                    <hr/>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Descricao</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        salas.map(sala => {
                                            return (
                                                <tr key={sala.id}>
                                                    <th scope="row">{sala.id}</th>
                                                    <td>{sala.name}</td>
                                                    <td>{sala.description}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default withAuthenticator(App);