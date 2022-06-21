import React, { Component } from 'react';
import Post from './Post';
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
// import BukuEdit from './BukuEdit';
// import TabelBuku from './TabelBuku'

class Category extends Component {
    state = {
        listCategory: [],
        insertCategory: {
            nama: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/categories')

            .then(response => response.json())
            .then(jsonHasilAmbilDariAPI => {
                this.setState({
                    listCategory: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleHapusCategory = (data) => {
        fetch(`http://localhost:3001/categories/${data}`, { method: 'delete' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahCategory = (event) => {
        let formInsertCategory = { ...this.state.insertCategory };
        // let timestamp = new Date().getTime();
        // formInsertCategory['id'] = timestamp
        formInsertCategory[event.target.name] = event.target.value;
        this.setState({
            insertCategory: formInsertCategory
        })
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/categories', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertCategory)
        })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    render() {

        return (
            <div className="mt-3">
                <Container fluid>
                    <h1 className='text-center'>Manajemen Kategori</h1>

                    <Link to="/createCategory" class="btn btn-primary" style={{ marginBottom: 10 }}>Tambah Kategori</Link>

                    <h2>Table Daftar Kategori</h2>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th> ID </th>
                                <th> Judul </th>
                                <th> Aksi </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listCategory.map(item =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.nama}</td>
                                    <td>
                                        <button className='btn btn-sm btn-danger' onClick={() => this.handleHapusCategory(item.id)}>Hapus</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Container>
            </div>
        );
    }
}

export default Category;