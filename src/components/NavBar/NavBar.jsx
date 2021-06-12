import React,{useState} from 'react'
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import flibii from "./flibii_logo.png";
import "./Navbar.css";
// import MenuIcon from '@material-ui/icons/Menu';




const NavBar = ({ basketItems, totalCost }) => {
  const location = useLocation();
  const[open,setOpen]=useState(false);

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className="custom-title"
              color="inherit"
            >
              <img
                src={flibii}
                alt="Flibii logo"
                height="20px"
                className="logo"
              />
            </Typography>
            {location.pathname === "/basket" ? (
              <div className="basket-wrapper">
                <h2 className="total">
                  Total cost: <strong>{totalCost}</strong>
                </h2>
              </div>
            ):(
              <div className="basket-wrapper">
                <IconButton
                  component={Link}
                  to="/basket"
                  aria-label="Show basket contents"
                  color="inherit"
                >
                  <Badge badgeContent={basketItems} color="secondary">
                    <ShoppingCart className="custom-basket" />
                  </Badge>
                </IconButton>
              </div>

            )}
<nav>

<ul className="nav-links" style={{transform:open ? "translateX(0px)" : "" }}>
    
    <Link to='./'>
         <li className="link"><a>HOME</a></li>
    </Link>

    <Link to='/basket'>
         <li className="link"><a>ORDERS</a></li>
    </Link>

    <Link to='./'>
         <li className="link"><a>RETURN</a></li>
    </Link>


</ul>
<i onClick={()=>setOpen(!open)} className="fas fa-bars burger"/>
</nav>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
