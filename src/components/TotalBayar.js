import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants'
import swal from "sweetalert";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    const pesanan = {
      total_bayar: totalBayar,
      tanggal: today,
      items: this.props.keranjangs
    }

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      // this.props.history.push("/")
      // this.props.pesanan.push("/thePath")
      swal({
        title: "Pesanan Berhasil",
        text: "Pesanan Berhasil ",
        icon: "success",
        button: false,
        timer: 1500,
      });
    })
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h4>
                Total Harga :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h4>
              <Button
                variant="success"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                href="/sukses"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
