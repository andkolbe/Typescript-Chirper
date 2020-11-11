import * as React from 'react';

class Template extends React.Component<ITemplateProps, ITemplateState> {
    render() {
        return(
            <div className="container">
                <section className="row mt-3 justify-content-center">
                    <div className="col-12">
                        <h1 className="text-center">Template View</h1>
                    </div>
                </section>
            </div>
        );
    }
}

interface ITemplateProps {} // every page must have its own props and state interfaces
interface ITemplateState {}


export default Template;