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
    const [salas, setSalas] = useState([]);

    const getSalas = async () => {
        try {
            const salas = await DataStore.query(Sala);
            setSalas(salas);
        } catch (error) {
            console.log("Error retrieving posts", error);
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
                    <div className="card">
                        <div className="card-header d-flex">
                            <button className="btn btn-success">Novo</button>
                        </div>
                        <div className="card-body">
                            {JSON.stringify(salas)}
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
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