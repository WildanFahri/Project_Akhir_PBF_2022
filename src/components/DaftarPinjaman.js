import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Items = ({ buku, item, masukKeranjang }) => {
  return (
    <div class="row">
      <div class="col-12">
        <Card className="shadow-none p-3 mb-5 bg-light rounded" onClick={() => masukKeranjang(item)}>
          <Card.Body>
            {/* <table className='table table-bordered'>
            <thead>
              <tr>
                <th> Judul </th>
                <th> Pengarag </th>
                <th> Tahun </th>
              </tr>
            </thead>
            <tr>
              <td> {buku.judul} </td>
              <td> {buku.pengarang} </td>
              <td> {buku.tahun} </td>
            </tr>
          </table> */}
            <Card.Title>{item.judul} <strong>({item.pengarang})</strong></Card.Title>
            <Card.Text>Rp. {numberWithCommas(item.harga)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Items;
