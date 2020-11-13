import * as React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => { // convert to class
    return(
        <div>
            <nav className="nav justify-content-center p-3 mb-2 shadow">
                <Link className="btn btn-outline-secondary mx-3 py-2" to="/">Home</Link>
                <Link className="btn btn-outline-secondary mx-3 py-2 " to="/chirp/add">New Chirp</Link>
            </nav>
        </div>
    );
}

export default NavBar;