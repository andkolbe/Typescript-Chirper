import * as React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component { 
    render() {
        return(
            <div>
                <nav className="nav justify-content-center p-3 mb-2 shadow bg-secondary">
                    <Link className="btn mx-3 py-2 font-weight-bold text-white text-uppercase" to="/">Home</Link>
                    <Link className="btn mx-3 py-2 font-weight-bold text-white text-uppercase" to="/chirp/add">New Chirp</Link>
                </nav>
            </div>
        );
    }
}

export default NavBar;