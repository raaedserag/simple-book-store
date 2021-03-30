
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink ,NavbarBrand} from 'reactstrap';

const NavBar = (props) => {
  return (
    <div>
     
      <Nav>
      <NavbarBrand href="/">Book Store</NavbarBrand>
        <NavItem>
          <NavLink ><Link to='/'>Customer</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Link to='/publisherScreen'>Publisher</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Link to='/author'>Author</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Link to='/book'>Books</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Link to='/wrote'>Wrotes</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink ><Link to='/sale'>Sales</Link></NavLink>
        </NavItem>
        
      </Nav>
      <hr />
      
    </div>
  );
}

export default NavBar;