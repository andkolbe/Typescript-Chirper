import * as React from 'react';
import { Link } from 'react-router-dom'
import type { IRawDataChirp } from '../../server/utils/chirpstore'; // type means only import typescript data instead of compiled javascript. Easier on the system
import Layout from '../components/Layout';

class Home extends React.Component<IHomeProps, IHomeState> { // order is always props, state

    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            chirps: []
        }
    }

    async componentDidMount() {
        const res = await fetch('/api/chirps'); // fetch your list of chirps
        const chirps: IRawDataChirp[] = await res.json(); // parse json to javascript
        this.setState({ chirps });
    }

    render() {
        return (
            <Layout>
                {this.state.chirps.map(chirp => ( // shorthand multi line return with ()
                    <div key={`Chirp: ${chirp.id}`}>
                        <div className="card my-2 shadow">
                            <div className="card-body">
                                <h5 className="card-title">{chirp.name}</h5>
                                <p className="card-text">{chirp.text}</p>
                                <div className="d-flex justify-content-end">
                                    <Link className="btn btn-outline-success" to="/chirp/:id/admin">Admin Options</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Layout>
        );
    }
}

interface IHomeProps { }
interface IHomeState {
    chirps: IRawDataChirp[]; // this.state.chirps is an array of each individual chirps
}

export default Home;