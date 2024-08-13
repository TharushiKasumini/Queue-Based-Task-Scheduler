import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Add Tasks", path: "/" },
  { label: "View Tasks Status", path: "/view" },
];

function DrawerAppBar(props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#D1F0FF", // Change to desired color
          minHeight: 70, // Increase height
          height: 70, // Optional: set exact height
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "5px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "serif",
              color: "darkblue",
            }}
          >
            Queue Based Task Scheduler
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "darkblue",
                  fontSize: 20,
                  fontFamily: "serif",
                  mx: 2,
                  "&:hover": {
                    color: "white",
                    backgroundColor: "darkblue",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
