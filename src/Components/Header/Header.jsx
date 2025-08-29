import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/btimage.jpg";
import simon from "../../assets/simon.png";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import SearchBox from "../SearchBox/SearchBox";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    if(!localStorage.getItem("admin_token")){
      window.location.reload();
      navigate("/login")
    }
    };
  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid">
          <div className="row align-items-center">

            <div className="logo col-4 flex-grow-1  d-flex justify-content-start">
            <img src={logo} alt="logo" className="logo img-fluid" />
            </div>

            <div className="middle col-4 d-none d-md-block">
            <SearchBox className="pr-2"/>
            </div>

            <div className="right col-4 flex-grow-1 d-flex justify-content-end align-items-center">
                <Button
                className="myAcc d-flex align-items-center"
                onClick={handleClick}
              >
                <div className="userImg pr-2">
                  <img src={simon} alt="user_profile" />
                </div>

                <div className="userInfo">
                  <h4>Super Admin</h4>
                  <p className="mb-0">superadmin@gmail.com</p>
                </div>
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar />
                  My Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Reset Password
                </MenuItem>
                <MenuItem  style={{ color: "red" }} onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "red" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>


            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
