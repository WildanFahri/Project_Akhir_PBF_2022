import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Hasil from "./Hasil";
import ListCategories from "./ListCategories";
import Items from "./DaftarPinjaman";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            categoriYangDipilih: "Novel",
            keranjangs: [],
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + "buku?category.nama=" + this.state.categoriYangDipilih)
            .then((res) => {
                const items = res.data;
                this.setState({ items });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });

        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                this.setState({ keranjangs });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }

    componentDidUpdate(prevState) {
        if (this.state.keranjangs !== prevState.keranjangs) {
            axios
                .get(API_URL + "keranjangs")
                .then((res) => {
                    const keranjangs = res.data;
                    this.setState({ keranjangs });
                })
                .catch((error) => {
                    console.log("Error yaa ", error);
                });
        }
    }

    changeCategory = (value) => {
        this.setState({
            categoriYangDipilih: value,
            items: [],
        });

        axios
            .get(API_URL + "buku?category.nama=" + value)
            .then((res) => {
                const items = res.data;
                this.setState({ items });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    masukKeranjang = (value) => {
        axios
            .get(API_URL + "keranjangs?item.id=" + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        tanggal: new Date().getTime(),
                        item: value,
                    };

                    axios
                        .post(API_URL + "keranjangs", keranjang)
                        .then((res) => {
                            swal({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang " + keranjang.item.judul,
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch((error) => {
                            console.log("Error yaa ", error);
                        });
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        tanggal: new Date().getTime(),
                        item: value,
                    };

                    axios
                        .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
                        .then((res) => {
                            swal({
                                title: "Sukses Masuk Keranjang",
                                text: "Sukses Masuk Keranjang " + keranjang.item.judul,
                                icon: "success",
                                button: false,
                                timer: 1500,
                            });
                        })
                        .catch((error) => {
                            console.log("Error yaa ", error);
                        });
                }
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };

    render() {
        const { items, categoriYangDipilih, keranjangs } = this.state;
        return (
            <div className="mt-3">
                <Container fluid>
                    <Row>
                        <ListCategories
                            changeCategory={this.changeCategory}
                            categoriYangDipilih={categoriYangDipilih}
                        />
                        <Col className="mt-3">
                            <h4>
                                <strong>Daftar Buku</strong>
                            </h4>
                            <hr />
                            <Row className="overflow-auto item">
                                {items &&
                                    items.map((item) => (
                                        <Items
                                            key={item.id}
                                            item={item}
                                            masukKeranjang={this.masukKeranjang}
                                        />
                                    ))}
                            </Row>
                        </Col>
                        <Hasil keranjangs={keranjangs} {...this.props} />
                    </Row>
                </Container>
            </div>
        );
    }
}
