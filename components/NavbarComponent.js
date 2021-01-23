import React from "react";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../store/auth/action";

const NavbarComponent = ({ isLoggedIn, email, logout }) => {
    const router = useRouter();
    const isActive = (href) => {
        if (router.pathname.split("/")[1] == href.split("/")[1]) {
            return true;
        } else {
            return false;
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };

    const loginNav = (
        <React.Fragment>
            <Link href="/login" passHref>
                <Nav.Link active={isActive("/login")}>Login</Nav.Link>
            </Link>
            <Link href="/register" passHref>
                <Nav.Link active={isActive("/register")}>Register</Nav.Link>
            </Link>
        </React.Fragment>
    );

    const userNav = isLoggedIn && (
        <NavDropdown title={email} id="nav-dropdown">
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
    );
    return (
        <React.Fragment>
            <Navbar bg="light" expand="sm">
                <Link href="/" passHref>
                    <Navbar.Brand>Number Charts</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/" passHref>
                            <Nav.Link active={isActive("/")}>Home</Nav.Link>
                        </Link>
                        <Link href="/about" passHref>
                            <Nav.Link active={isActive("/about")}>
                                About
                            </Nav.Link>
                        </Link>
                        <Link href="/charts" passHref>
                            <Nav.Link active={isActive("/charts")}>
                                Charts
                            </Nav.Link>
                        </Link>
                        <Link href="/contact" passHref>
                            <Nav.Link active={isActive("/contact")}>
                                Contact
                            </Nav.Link>
                        </Link>
                    </Nav>
                    <Nav>{isLoggedIn ? userNav : loginNav}</Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    email: state.auth.email,
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: bindActionCreators(logout, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
