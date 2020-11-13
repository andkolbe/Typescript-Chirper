import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Admin from './views/Admin';
import Home from './views/Home';
import NewChirp from './views/NewChirp';
import NotFound from './views/NotFound';

class App extends React.Component<IAppProps, IAppState> { // order is always props, state

	render() {
		return (
			<BrowserRouter>
				<NavBar />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/chirp/add' component={NewChirp} />
					<Route exact path='/chirp/:id/admin' component={Admin} />
					<Route path='*' component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

// interface is a way to define a type
interface IAppProps { } // this is blank because App in index.tsx is recieving no props

interface IAppState { } // interfaces describes a component's props (if it has any)

export default App;

// BrowserRouter can be renamed anything
// think of Switch like a switch board
// Route is self closing
// Route always has two props attached to it, path and component
// path reads the url bar
// you tell component which component you want to show up on the path
// Route paths need to have the word exact or they will only route in alphbetical order
// Link replaces any anchor or button element that has to lead you to a different page
// Link needs to have a prop called 'to' that needs to a string of some kind
// you can render NavBar above Switch. Switch acts like the body of the page
// NavBar won't re render because it is above the Switch

// hitting enter on a url bar executes a GET request to a server


