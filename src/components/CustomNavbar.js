import {
    Navbar,
    Nav,
} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
import styles from './CustomNavbar.module.css';

function CustomNavbar() {
    return (
        <Navbar bg="light" expand="lg" className={styles.navbar}>
            <Navbar.Brand>
                <Link className={styles.navLink} to="/">
                    <img className={styles.marsIcon} src='/img/mars-icon.png'></img>
                    Mars Exploration
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className={styles.navLink} to="/">Home</Link>
                    <Link className={styles.navLink} to="/instructions">Instructions</Link>
                    <Link className={styles.navLink} to="/docs">Docs</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;
