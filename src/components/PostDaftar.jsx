import React from 'react';

const Post = (props) => {
    return (
        <tbody>
            <tr>
                <td> {props.judul} </td>
                <td> {props.pengarang} </td>
                <td> {props.tahun} </td>
            </tr>
        </tbody>
    );
}
export default Post;