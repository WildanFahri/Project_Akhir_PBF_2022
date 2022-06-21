import React, { Component } from 'react';
import Post from './PostDaftar';

class Daftar extends Component {
    state = {
        listBuku: [],
        insertBuku: {
            userId: 1,
            id: 1,
            judul: "",
            pengarang: "",
            tahun: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/buku')

            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listBuku: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    render() {
        const { buku } = this.state;
        // function ManajemenBuku() {
        return (
            <div className='container'>
                <h1 className='text-center'>Table Daftar Buku</h1><br />
                <table class="table table-stripe">
                    <thead>
                        <tr>
                            <th>Judul</th>
                            <th>Pengarang</th>
                            <th>Tahun Terbit</th>
                            <th>Harga</th>
                            <th>Kategori</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listBuku.map(buku =>
                            <tr>
                                {/* <td><Link to={`/show/${buku.key}`}>{buku.judul}</Link></td> */}
                                <td>{buku.judul}</td>
                                <td>{buku.pengarang}</td>
                                <td>{buku.tahun}</td>
                                <td>Rp. {buku.harga}</td>
                                <td>{buku.category.nama}</td>
                                {/* <td><Link to={`/show/${buku.key}`} class="btn btn-info">Detail</Link>&nbsp;
                  <Link to={`/edit/${buku.key}`} class="btn btn-secondary">Edit</Link>&nbsp;
                  <Link class="btn btn-danger" onClick={this.delete.bind(this, buku.key)} >Delete</Link>
                </td> */}
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* <BukuEdit buku={buku} {...this.props} /> */}
            </div >
        );
    }
}

export default Daftar;