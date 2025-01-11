import React, { useContext, useState } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

const StyledCard = styled("div")({
    minHeight: "400px",
    width: "400px",
    borderRadius: "15px",
    backgroundColor: "#202020",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
});

const formControl = {
    margin: "10px 0",
    width: "100%",
    borderRadius: "12px",
};

const LoginPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const location = useLocation();


    const handleSnackClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleLogin = async () => {
        if (!userName || !password) {
            setSnackbar({
                open: true,
                message: "Username and password are required.",
                severity: "error",
            });
            return;
        }

        try {
            const isAuthenticated = await context.authenticate(userName, password);

            if (!isAuthenticated) {
                setSnackbar({
                    open: true,
                    message: "Invalid username or password.",
                    severity: "error",
                });
                return;
            }

            setSnackbar({
                open: true,
                message: "Login successful! Redirecting...",
                severity: "success",
            });

        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || "Something went wrong. Please try again.",
                severity: "error",
            });
        }
    };





    if (context.isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    backgroundImage: `url('https://wallpapercave.com/wp/wp10615910.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <StyledCard>
                    <Typography variant="h4" component="h2" style={{ color: "white", marginBottom: "20px" }}>
                        Log In
                    </Typography>
                    <TextField
                        sx={formControl}
                        label="Username"
                        variant="filled"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        sx={formControl}
                        label="Password"
                        type="password"
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: "20px", width: "100%" }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Typography variant="body2" style={{ color: "white", marginTop: "10px" }}>
                        Not Registered?{" "}
                        <Link to="/signup" style={{ color: "#FF3131", textDecoration: "none" }}>
                            Sign Up!
                        </Link>
                    </Typography>
                </StyledCard>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbar.severity}
                    onClose={handleSnackClose}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default LoginPage;