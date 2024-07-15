import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { activeTab } from "../../redux/authslice";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((state) => state.tab.name);
  const isManager = useSelector((state) => state.tab.isManager);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSidebar, setAnchorElSidebar] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuSidebar = (event) => {
    setAnchorElSidebar(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSideMenu = (index) => {
    setAnchorElSidebar(null);
    if (index !== 0) dispatch(activeTab(index));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuSidebar}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-sidebar"
            anchorEl={anchorElSidebar}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElSidebar)}
            onClose={() => handleCloseSideMenu(0)}
          >
            {name !== "admin" && <MenuItem onClick={() => handleCloseSideMenu(1)}>Clock-in/out</MenuItem>}
            {(name === "admin" || isManager) && <MenuItem onClick={() => handleCloseSideMenu(2)}>Messages</MenuItem>}
            {name === "admin" && <MenuItem onClick={() => handleCloseSideMenu(3)}>Assignments</MenuItem>}
            {name === "admin" && <MenuItem onClick={() => handleCloseSideMenu(4)}>Breaks</MenuItem>}
            {name === "admin" && <MenuItem onClick={() => handleCloseSideMenu(5)}>Work Orders</MenuItem>}
            {name === "admin" && <MenuItem onClick={() => handleCloseSideMenu(6)}>Work Shifts</MenuItem>}
            {name === "admin" && <MenuItem onClick={() => handleCloseSideMenu(7)}>Employees</MenuItem>}
            {name !== "admin" && <MenuItem onClick={() => handleCloseSideMenu(8)}>Settings</MenuItem>}
            {(name === "admin" || isManager) && <MenuItem onClick={() => handleCloseSideMenu(9)}>TimeSheet</MenuItem>}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clock-in/out
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  navigate("/");
                }}
              >
                LogOut
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
