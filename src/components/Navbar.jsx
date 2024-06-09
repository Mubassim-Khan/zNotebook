import { useEffect, useState } from 'react';
import { Container, Navbar as NavBar, Nav } from 'react-bootstrap';
import toast from 'react-hot-toast';
// import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from "react-router-dom"

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

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out")
  }

  return (
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
            <Nav.Link href="/notes" className={activeLink === 'notes' ? "active navbar-link" : "navbar-link"} onClick={() => onUpdateActiveLink('notes')}>Notes</Nav.Link>
          </Nav>
          {!localStorage.getItem("token") ?
            <span className="navbar-text">
              <Link to='/login'>
                <button className="vvd" type="button">Log in</button>
              </Link>
              <Link to='/register'>
                <button className="vvd" type='button'>Register</button>
              </Link>
            </span> :
            (<div>
              <button className='vvd' type='button' onClick={handleLogout}>Log out</button>
              <Navbar.Text>
                Signed in as: Mark Otto
              </Navbar.Text>
            </div>
            )
          }
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
}