import * as React from 'react'

const Layout = ({ children }) => { // convert to class
    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-md-6">
                    {children}
                </div>
            </section>
        </main>
    );
}

export default Layout;