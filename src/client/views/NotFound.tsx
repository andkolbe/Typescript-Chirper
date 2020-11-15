import React from 'react';
import Layout from '../components/Layout';

class NotFound extends React.Component { 
    render() {
        return (
            <Layout>
                <h1 className="text-center">404 Not Found</h1>
            </Layout>
        );
    }
}

export default NotFound;