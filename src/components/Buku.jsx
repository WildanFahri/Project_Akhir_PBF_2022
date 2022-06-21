import React, { Component } from 'react';
import Post from './Post';
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
// import BukuEdit from './BukuEdit';
// import TabelBuku from './TabelBuku'

class Buku extends Component {
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
        this.ambilDataDariServerAPI()
      })
  }

  handleShowBuku = (buku) => {
    fetch('http://localhost:3001/buku')
    this.setState({
      showModalBuku: true,
      bukuDetail: buku,
      // categoryId: itemBuku.category.id,
      // categoryNama: itemBuku.category.nama,
      editHarga: buku.harga,
    });
  };

  render() {
    const { buku } = this.state;

    return (
      <div className="mt-3">
        <Container fluid>
          <h1 className='text-center'>Manajemen Buku</h1>

          <Link to="/create" class="btn btn-primary" style={{ marginBottom: 10 }}>Tambah Buku</Link>
          {/* <button className='btn btn-primary my-2'>Tambah Buku</button> */}

          {/* input form */}
          {/* <div id="form" className='card bg-secondary'>
          <div className="card-body">
            <h4>Form Buku</h4>
            <form className='row'>
              <div className="col-4">
                <input type="text" name="judul" placeholder='Judul' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="pengarang" placeholder='Pengarang' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="tahun" placeholder='Tahun Terbit' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="harga" placeholder='Harga' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="category" placeholder='Kategori' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="harga" placeholder='Harga' className='form-control mx-2' onChange={this.handleTambahBuku} />
                <option value="" disabled selected>choose your Service</option>
                <option value="{{ category->id }}"> {{ $service->name }}</option>
              </div>
              <div className="col-2">
                <input type="submit" className='btn btn-success' value="Submit" onClick={this.handleTombolSimpan} />
              </div>
            </form>
          </div>
        </div> */}


          {/* table daftar buku */}
          {/* <TabelBuku/> */}
          <h2>Table Daftar Buku</h2>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th> Judul </th>
                <th> Pengarag </th>
                <th> Tahun </th>
                <th> Harga </th>
                <th> Kategori </th>
                <th> Aksi </th>
              </tr>
            </thead>
            <tbody>
              {this.state.listBuku.map(buku =>
                <tr>
                  {/* <td><Link to={`/show/${buku.key}`}>{buku.judul}</Link></td> */}
                  <td>{buku.judul}</td>
                  <td>{buku.pengarang}</td>
                  <td>{buku.tahun}</td>
                  <td>Rp. {numberWithCommas(buku.harga)}</td>
                  <td>{buku.category.nama}</td>
                  <td>
                    {/* <Link to={`/edit/${buku.id}`} class="btn btn-sm btn-secondary">Edit</Link>&nbsp; */}
                    {/* <button onClick={() => this.handleShowBuku(buku.id)} class="btn btn-sm btn-secondary">Edit</button>&nbsp; */}
                    <button className='btn btn-sm btn-danger' onClick={() => this.handleHapusBuku(buku.id)}>Hapus</button>
                    {/* <Link class="btn btn-danger" onClick={this.handleHapusBuku(this, buku.key)} >Delete</Link> */}
                  </td>
                </tr>
              )}
            </tbody>
            {/* {this.state.listBuku.map(buku => {
              return <Post key={buku.id} judul={buku.judul} pengarang={buku.pengarang} tahun={buku.tahun} hapusBuku={this.handleHapusBuku} idBuku={buku.id} />
            })
          } */}
          </table>
          {/* <BukuEdit buku={buku} {...this.props} /> */}
        </Container>
      </div>
    );
  }
}

export default Buku;