import * as React from 'react';
import * as moment from 'moment';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'
import type { IChirp } from '../../server/utils/chirpstore'; // type means only import typescript data instead of compiled javascript. Easier on the system


class Home extends React.Component<IHomeProps, IHomeState> { // order is always props, state

    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            chirps: []
        }
    }

    async componentDidMount() {
        const res = await fetch('/api/chirp'); // fetch your list of chirps
        const chirps: IChirp[] = await res.json(); // parse json to javascript
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
                                <small className="card-text text-secondary">{moment(chirp.written_at).format('h:mm a - MMMM Do YYYY')}</small>
                                <div className="d-flex justify-content-end">
                                    <Link className="btn text-success font-weight-bold" to={`/chirp/${chirp.id}/admin`}>Edit Chirp</Link>
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
    chirps: IChirp[]; // this.state.chirps is an array of each individual chirps
}

export default Home;