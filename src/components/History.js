import React, { Component } from 'react';
import { numberWithCommas } from "../utils/utils";

class History extends Component {
    state = {
        pesanan: [],
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/pesanans')

            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    pesanan: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleHapus = (data) => {
        fetch(`http://localhost:3001/pesanans/${data}`, { method: 'delete' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }


    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>History Pemesanan</h1><br />
                <table class="table table-stripe">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total Bayar</th>
                            <th>Tanggal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pesanan.map(item =>
                            <tr>
                                {/* <td><Link to={`/show/${buku.key}`}>{buku.judul}</Link></td> */}
                                <td>{item.id}</td>
                                <td>Rp. {numberWithCommas(item.total_bayar)}</td>
                                <td>{item.tanggal}</td>
                                <td><button className='btn btn-sm btn-danger' onClick={() => this.handleHapus(item.id)}>Hapus</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        );
    }
}

export default History;