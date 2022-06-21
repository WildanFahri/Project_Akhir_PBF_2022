import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Create extends Component {
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
                // this.ambilDataDariServerAPI()
                this.props.history.push("/category")
            })
    }

    render() {
        const { nama } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Add Category
                        </h3>
                    </div>
                    <div class="panel-body">
                        {/* <h4><Link to="/" class="btn btn-primary">buku List</Link></h4> */}
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="nama">Kategori:</label>
                                <input type="text" class="form-control"
                                    name="nama" value={nama} onChange={this.handleTambahCategory}
                                    placeholder="Kategori" />
                            </div>
                            <button type="submit" class="btn btn-success" value="Submit" style={{ marginTop: 10 }} onClick={this.handleTombolSimpan}>Submit</button>&nbsp;
                            <Link to="/category" class="btn btn-danger" style={{ marginTop: 10 }}>Cancle</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create;