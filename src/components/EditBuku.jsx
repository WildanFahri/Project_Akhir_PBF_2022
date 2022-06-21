import React, { Component } from 'react';
import Post from './Post';
import axios from "axios";
import { API_URL } from "../utils/constants";
// import BukuEdit from './BukuEdit';
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from "react-bootstrap";
// import TabelBuku from './TabelBuku'

class EditBuku extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     // showModalBuku: false,
  //     // bukuDetail: false,
  //     // categoryId: 0,
  //     // categoryNama: "",
  //     harga: 1000,
  //   };
  // }
  state = {
    listBuku: [],
    editBuku: {
      userId: 1,
      id: 1,
      judul: "",
      pengarang: "",
      tahun: "",
      harga: 1000,
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
    let formEditBuku = { ...this.state.editBuku };
    let timestamp = new Date().getTime();
    formEditBuku['id'] = timestamp
    formEditBuku[event.target.name] = event.target.value;
    this.setState({
      editBuku: formEditBuku
    })
  }

  tambahBuku = () => {
    this.setState({
      editHarga: this.state.harga + 1000,
      harga:
        this.state.bukuDetail.harga + (this.state.editHarga),
    });
  };

  kurangBuku = () => {
    if (this.state.harga !== 1000) {
      this.setState({
        editHarga: this.state.harga - 1000,
        harga:
          this.state.bukuDetail.harga - (this.state.harga),
      });
    }
  };

  handleTombolSimpan = () => {
    fetch('http://localhost:3001/buku', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.editBuku)
    })
      .then(res => {
        this.ambilDataDariServerAPI()
      })
  }

  render() {
    const { buku } = this.state;
    // function ManajemenBuku() {
    // axios
    //         .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
    //         .then((res) => {

    //         })

    return (
      <div className='container'>

        <h1 className='text-center'>Manajemen Buku</h1>

        <button className='btn btn-primary my-2'>Tambah Buku</button>

        {/* input form */}
        <div id="form" className='card bg-secondary'>
          <div className="card-body">
            <h4>Form Buku</h4>
            <form className='row'>
              {/* <div className="col-4">
                <input type="text" name="judul" placeholder='Judul' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="pengarang" placeholder='Pengarang' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div>
              <div className="col-4">
                <input type="text" name="tahun" placeholder='Tahun Terbit' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div> */}
              <div className="col-4">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Harga :</Form.Label>
                  <br />
                  <Button variant="primary" size="sm" className="mr-2" onClick={() => this.kurangBuku()}>
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>

                  <strong>harga</strong>

                  <Button variant="primary" size="sm" className="ml-2" onClick={() => this.tambahBuku()}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Form.Group>
              </div>
              {/* <div className="col-4">
                <input type="text" name="category" placeholder='Kategori' className='form-control mx-2' onChange={this.handleTambahBuku} />
              </div> */}
              {/* <div className="col-4">
                <input type="text" name="harga" placeholder='Harga' className='form-control mx-2' onChange={this.handleTambahBuku} />
                <option value="" disabled selected>choose your Service</option>
                <option value="{{ category->id }}"> {{ $service->name }}</option>
              </div> */}
              <div className="col-2">
                <input type="submit" className='btn btn-success' value="Submit" onClick={this.handleTombolSimpan} />
              </div>
            </form>
          </div>
        </div>


        {/* table daftar buku */}
        {/* <TabelBuku/> */}
        <h2>Table Daftar Buku</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th> Judul </th>
              <th> Pengarag </th>
              <th> Tahun </th>
              <th> Aksi </th>
            </tr>
          </thead>{
            this.state.listBuku.map(buku => {
              return <Post key={buku.id} judul={buku.judul} pengarang={buku.pengarang} tahun={buku.tahun} hapusBuku={this.handleHapusBuku} idBuku={buku.id} />
            })
          }
        </table>
        {/* <BukuEdit buku={buku} {...this.props} /> */}
      </div>
    );
  }
}

export default EditBuku;