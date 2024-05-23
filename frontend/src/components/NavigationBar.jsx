import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="warning" variant="light">
      <Navbar.Brand href="/">interecipe</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/create">Create Recipe</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
