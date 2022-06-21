import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'


const NavbarComponent = () => {
    return (
        <Navbar variant="dark" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <img src={logo} style={{ height: "40px" }} />
                        <Nav.Link href="/">Beranda</Nav.Link>
                        <Nav.Link href="/buku">Buku</Nav.Link>
                        <Nav.Link href="/category">Kategori</Nav.Link>
                        {/* <Nav.Link href="/daftar">Daftar Buku</Nav.Link> */}
                        <Nav.Link href="/peminjaman">Pembelian</Nav.Link>
                        <Nav.Link href="/history">History</Nav.Link>
                        {/* <Nav.Link href="/edit">Edit</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent