import * as React from 'react';
import { IRawDataChirp } from '../../server/utils/chirpstore';
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
        console.log({ name: this.state.name, text: this.state.text }); // try console logging before making the fetch request
        const res = await fetch('/api/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.name, text: this.state.text })
        })
        this.setState({ name: '', text: ''}); // clears the forms after submitting data
    }

    componentDidMount() {
        fetch('/apo/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Odie',
                text: 'I like to eat cat poop'
            })
        })
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

interface INewChirpProps { }
interface INewChirpState {
    name: string;
    text: string;
}

export default NewChirp;