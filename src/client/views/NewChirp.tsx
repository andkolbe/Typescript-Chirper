import * as React from 'react';
import { RouteComponentProps} from 'react-router-dom';
import Layout from '../components/Layout';

class NewChirp extends React.Component<INewChirpProps, INewChirpState> {

    constructor(props: INewChirpProps) {
        super(props);
        this.state = { // you need name and text for a POST request
            name: '',
            text: ''
        }
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { // how to strongtype an event inside of react
        this.setState({ name: e.target.value });
    }

    handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
        this.setState({ text: e.target.value });
    }

    handleChirpSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => { // clicking on a button is a mouse event
        e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute
        const res = await fetch('/api/chirp', {
            method: 'POST', // this will default to GET unless you specify otherwise
            headers: {
                'Content-Type': 'application/json' // kicks on express.json middleware
            },
            body: JSON.stringify({ name: this.state.name, text: this.state.text }) // body = the json data you submitted
        })
        const serverResponse = await res.json();
        console.log(serverResponse.msg); // this is the msg on the post route back in chirps.ts
        this.props.history.push('/'); // this takes you back to the homepage after adding a new chirp
    }

    render() {
        return (
            <Layout>
                <form className="form-group border p-3 shadow">
                    <label>Name</label>
                    <input value={this.state.name} onChange={this.handleNameChange} type="text" className="form-control" />
                    <label>Message</label>
                    <textarea value={this.state.text} onChange={this.handleTextChange} rows={6} className="form-control my-1" />
                    <button onClick={this.handleChirpSubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Layout>
        );
    }
}

interface INewChirpProps extends RouteComponentProps{ } // extend RouteComponentProps to access history, location, and match
interface INewChirpState {
    name: string;
    text: string;
}

export default NewChirp;