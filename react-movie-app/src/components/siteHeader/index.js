import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import img from "../../images/headerLogo.png";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const StyledAppBar = styled(AppBar)({
    backgroundColor: "black",
    color: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
});

const StyledTypography = styled(Typography)({
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
});

const StyledImg = styled("img")(({ theme }) => ({
    height: 50,
    padding: 1,
    marginRight: "8px",
    marginBottom: "3px",
    [theme.breakpoints.down("md")]: {
        height: 60,
    },
    [theme.breakpoints.down("sm")]: {
        height: 40,
    },
}));

const StyledButton = styled(Button)({
    color: "white",
    "&:hover": {
        color: "#FF3131",
        fontWeight: "bold",
        transform: "scale(1.2)",
        marginLeft: 15,
        transition: "all 0.2s ease",
    },
});

const SiteHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { isAuthenticated, userName, signout } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const menuOptions = [
        { label: "Discover Movies", path: "/", showWhenAuth: null },
        { label: "Upcoming Movies", path: "/react-movie-app/upcoming", showWhenAuth: null },
        { label: "Now in Cinemas", path: "/react-movie-app/nowShowing", showWhenAuth: null },
        { label: "Must Watch", path: "/react-movie-app/mustWatch", showWhenAuth: true },
        { label: "Favorite Movies", path: "/react-movie-app/favorites", showWhenAuth: true },
        { label: "Login", path: "/login", showWhenAuth: false },
        { label: "Sign Up", path: "/signup", showWhenAuth: false },
        { label: "Log Out", action: signout, showWhenAuth: true },
    ];

    const handleMenuSelect = (option) => {
        if (option.action) {
            option.action();
        } else {
            navigate(option.path, { replace: true });
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <StyledAppBar position="fixed">
                <Toolbar>
                    <StyledTypography variant="h4">
                        <StyledImg
                            src={img}
                            alt="Logo"
                            onClick={() => navigate("/")}
                        />
                    </StyledTypography>

                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
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
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions
                                    .filter((opt) => opt.showWhenAuth === null || opt.showWhenAuth === isAuthenticated)
                                    .map((opt, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={() => handleMenuSelect(opt)}
                                        >
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions
                                .filter((opt) => opt.showWhenAuth === null || opt.showWhenAuth === isAuthenticated)
                                .map((opt, index) => (
                                    <StyledButton
                                        key={index}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt)}
                                    >
                                        {opt.label}
                                    </StyledButton>
                                ))}
                        </>
                    )}
                </Toolbar>
            </StyledAppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
