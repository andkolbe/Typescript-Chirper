import * as React from 'react'

class Layout extends React.Component { 
    render() {
        return (
            <main className="container">
                <section className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        {this.props.children}
                    </div>
                </section>
            </main>
        );
    }
}





export default Layout;

// props.children // children is a property built into props