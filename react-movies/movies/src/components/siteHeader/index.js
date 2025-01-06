import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import {styled, useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import img from "../../images/headerLogo.png";
import {auth} from "../../services/firebase";
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import Avatar from "@mui/material/Avatar";

const Offset = styled("div")(({theme}) => theme.mixins.toolbar);

// https://www.smashingmagazine.com/2020/07/styled-components-react/
const StyledAppBar = styled(AppBar)({
    backgroundColor: "black",
    color: "white",
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.7)',
});

const StyledTypography = styled(Typography)({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
});

const StyledImg = styled("img")(({theme}) => ({
    height: 50,
    padding: 1,
    marginRight: '8px',
    marginBottom: '3px',
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

const SiteHeader = ({history}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    const menuOptions = [
        { label: "Discover Movies", path: "/" },
        {label: "Upcoming Movies", path: "/movies/upcoming"},
        {label: "Now in Cinemas", path: "/movies/nowShowing"},
        { label: "Must Watch", path: "/movies/mustWatch" },
        {label: "Favorite Movies", path: "/movies/favorites"},
        {label: "Actors", path: "/actors"},
        {label: "Favorite Actors", path: "/actors/favorites"},
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

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
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <StyledButton
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </StyledButton>
                            ))}

                            {user ? (
                                <Avatar
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    onClick={handleSignOut}
                                    sx={{cursor: "pointer", marginLeft: 2}}
                                />
                            ) : (
                                <StyledButton color="inherit" onClick={handleSignIn}>
                                    Sign In
                                </StyledButton>
                            )}
                        </>
                    )}
                </Toolbar>
            </StyledAppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
