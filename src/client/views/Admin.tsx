import * as React from 'react';
import Layout from '../components/Layout';
import type { IChirp } from '../../server/utils/chirpstore'; // type means only import typescript data instead of compiled javascript. Easier on the system
import { RouteComponentProps } from 'react-router';


class Admin extends React.Component<IAdminProps, IAdminState> {

    constructor(props: IAdminProps) {
        super(props);
        this.state = { // you need name and text for a POST request
            name: '',
            text: ''
        }
    }

    async componentDidMount() {
        const res = await fetch(`/api/chirp/${this.props.match.params.id}`); // fetch your list of chirps
        const chirp: IChirp = await res.json(); // parse json to javascript
        this.setState({ name: chirp.name, text: chirp.text }); // sets a new state from name: '', text: '' to name: chirp.name, text: chirp.text
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { // how to strongtype an event inside of react
        this.setState({ name: e.target.value });
    }

    handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        this.setState({ text: e.target.value });
    }

    handleEditChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log({ name: this.state.name, text: this.state.text });
        const res = await fetch(`/api/chirp/${this.props.match.params.id}`, { // fire await this promise 1st
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // kicks on express.json middleware
            },
            body: JSON.stringify({ name: this.state.name, text: this.state.text })
        })
        const pepperoni = await res.json(); // fire await this promise 2nd
        console.log(pepperoni.msg); // fire 3rd
        this.props.history.push('/'); // fire 3rd
    }   

    handleDeleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => { // clicking the mouse is a mouse event
        e.preventDefault();
        const res = await fetch(`/api/chirp/${this.props.match.params.id}`, {
            method: 'DELETE'
        })
        const ramen = await res.json();
        console.log(ramen.msg)
        this.props.history.push('/');
    }

    render() {
        return (
            <Layout>
                <form className="border p-4 shadow form-group bg-white">
                    <label htmlFor="editName" className="font-weight-bold">Edit Name</label>
                    <input value={this.state.name} onChange={this.handleNameChange} id="editName" type="text" className="form-control bg-warning" />
                    <label htmlFor="editMessage" className="mt-4 font-weight-bold">Edit Message</label>
                    <input value={this.state.text} onChange={this.handleTextChange} id="editMessage" type="text" className="form-control bg-warning" />
                    <div className="d-flex justify-content-between mt-4">
                        <button onClick={this.handleEditChirp} className="btn btn-success font-weight-bold text-white">Save Edit</button>
                        <button onClick={this.handleDeleteChirp} className="btn text-danger font-weight-bold text-white">Delete</button>
                    </div>
                </form>
            </Layout>
        )
    }
}

interface IAdminProps extends RouteComponentProps<{ id: string }> { }
interface IAdminState { // identifying your state and props first will help you with intellisence as you write the rest of your code
    name: string;
    text: string;
}

export default Admin;


// the state of the name and text are initially blank strings
// it mounts to the dom and renders a blank form
// it will then run async componentDidMount
// fetch the individual chirp and set name to chirp.name and text to chirp.text
// state updates from blank strings to chirp.name and chirp.text
// once state changes, the component rerenders and the values of the inputs are updated with state.name and state.text