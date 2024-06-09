import { useEffect, useState } from 'react';
import { Container, Navbar as NavBar, Nav } from 'react-bootstrap';
// import Logo from '../assets/images/logo.png';
import { BrowserRouter, Link } from "react-router-dom"

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <BrowserRouter>
      <NavBar expand="md" className={scrolled ? "scrolled" : ''}>
        <Container>
          {/* <NavBar.Brand to="/">
          <img className="navbar-logo" src={Logo} alt="Logo" />
        </NavBar.Brand> */}
          <NavBar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggle-icon"></span>
          </NavBar.Toggle>
          <NavBar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className={activeLink === 'home' ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#about" className={activeLink === 'about' ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <Link to='/login'>
                <button className="vvd" type="button">Log in</button>
              </Link>
              <Link to='/register'>
                <button className="vvd" type='button'>Register</button>
              </Link>
            </span>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </BrowserRouter>
  );
}