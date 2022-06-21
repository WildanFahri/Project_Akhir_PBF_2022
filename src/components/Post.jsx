import React from 'react';

const Post = (props) => {
    return (
        <tbody>
            <tr>
                <td> {props.judul} </td>
                <td> {props.pengarang} </td>
                <td> {props.tahun} </td>
                <td> <button className='btn btn-sm btn-danger' onClick={() => props.hapusBuku(props.idBuku)}>Hapus</button>
                    <button className='btn btn-sm btn-primary' onClick={() => props.editBuku(props.idBuku)}>Edit</button></td>
            </tr>
        </tbody>
    );
}

// function TabelBuku() {
//   return (
//     <div>
//         <h4>Tabel Data Buku</h4>
//         <table className='table table-bordered'>
//             <thead>
//                 <tr>
//                     <th>No.</th>
//                     <th>Judul</th>
//                     <th>Pengarang</th>
//                     <th>Aksi</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>1.</td>
//                     <td>Laskar Pelangi</td>
//                     <td>Andrea Hirata</td>
//                     <td>
//                         <button className='btn-sm btn-warning mx-2'>Edit</button>
//                         <button className='btn-sm btn-danger mx-2'>Delete</button>
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//     </div>
//   )
// }

export default Post;