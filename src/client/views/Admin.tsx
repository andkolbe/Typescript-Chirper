import * as React from 'react';
import Layout from '../components/Layout';
import type { IRawDataChirp } from '../../server/utils/chirpstore'; // type means only import typescript data instead of compiled javascript. Easier on the system


class Admin extends React.Component<IAdminProps, IAdminState> {
    render() {
        return (
            <Layout>
                <form className="border p-3 shadow">
                    <div className="form-group">
                        <label>Edit Name</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Edit Message</label>
                        <input type="password" className="form-control" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Save Edit</button>
                        <button type="submit" className="btn btn-primary">Delete</button>
                    </div>
                </form>
            </Layout>
        )
    }
}

interface IAdminProps { }
interface IAdminState { }

export default Admin;