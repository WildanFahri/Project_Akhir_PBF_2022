import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from "../utils/constants";
import axios from "axios";

class Create extends Component {
    state = {
        listBuku: [],
        insertBuku: {
            userId: 1,
            id: 1,
            judul: "",
            pengarang: "",
            tahun: "",
            harga: 0,
            is_ready: true,
            category: {
                id: "",
                nama: ""
            }
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

    kembali() {
        axios
            .get(API_URL + "buku")
            .then((res) => {
                const buku = res.data;
                this.setState({ buku });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    handleHapusBuku = (data) => {
        fetch(`http://localhost:3001/buku/${data}`, { method: 'delete' })
            .then(res => {
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahBuku = (event) => {
        let formInsertBuku = { ...this.state.insertBuku };
        let timestamp = new Date().getTime();
        formInsertBuku['id'] = timestamp
        formInsertBuku[event.target.name] = event.target.value;
        this.setState({
            insertBuku: formInsertBuku
        })
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/buku', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertBuku)
        })
            .then(res => {
                this.kembali()
            })
    }

    componentDidMountCategory() {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }


    render() {
        const { judul, pengarang, tahun, harga, categories } = this.state;
        const { changeCategory, categoriYangDipilih } = this.props;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Add buku
                        </h3>
                    </div>
                    <div class="panel-body">
                        {/* <h4><Link to="/" class="btn btn-primary">buku List</Link></h4> */}
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="judul">Judul:</label>
                                <input type="text" class="form-control"
                                    name="judul" value={judul} onChange={this.handleTambahBuku}
                                    placeholder="Judul" />
                            </div>
                            <div class="form-group">
                                <label for="pengarang">Pengarang:</label>
                                <input type="text" class="form-control"
                                    name="pengarang" value={pengarang} onChange={this.handleTambahBuku}
                                    placeholder="Pengarang" />
                            </div>
                            <div class="form-group">
                                <label for="tahun">Tahun:</label>
                                <input type="text" class="form-control"
                                    name="tahun" value={tahun} onChange={this.handleTambahBuku}
                                    placeholder="Tahun" />
                            </div>
                            <div class="form-group">
                                <label for="harga">Harga:</label>
                                <input type="text" class="form-control"
                                    name="harga" value={harga} onChange={this.handleTambahBuku}
                                    placeholder="Harga" />
                            </div>
                            <div class="form-group">
                                <label for="category">Kategori:</label>
                                <select class="form-control"
                                    name="category" onChange={this.handleTambahBuku}
                                    placeholder="Kategori">
                                    <option disabled selected>Kategori</option>
                                    {this.state.listBuku.map(kategori =>
                                        <option value={categories}> {kategori.category.nama}</option>
                                    )}
                                </select>
                            </div>
                            <button type="submit" class="btn btn-success" value="Submit" style={{ marginTop: 10 }} onClick={this.handleTombolSimpan}>Submit</button>&nbsp;
                            <Link to="/buku" class="btn btn-danger" style={{ marginTop: 10 }}>Cancle</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create;