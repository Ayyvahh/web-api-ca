import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

const SignUpPage = () => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const handleSnackClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleRegister = async () => {
        if (!userName || !password || !passwordAgain) {
            setSnackbar({
                open: true,
                message: "Please fill in all fields.",
                severity: "error",
            });
            return;
        }

        if (password !== passwordAgain) {
            setSnackbar({
                open: true,
                message: "Passwords do not match.",
                severity: "error",
            });
            return;
        }

        try {
            const success = await context.register(userName, password);
            if (success) {
                setSnackbar({
                    open: true,
                    message: "Signup successful! Redirecting ...",
                    severity: "success",
                });

                setTimeout(() => {
                    setRegistered(true);
                }, 1000);
            } else {
                setSnackbar({
                    open: true,
                    message: "Username might already exist.",
                    severity: "error",
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || "Error occurred. Please try again.",
                severity: "error",
            });
        }
    };

    if (registered) {
        return <Navigate to="/login" />;
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
                    backgroundPosition: "center"
                }}
            >
                <StyledCard>
                    <Typography variant="h4" component="h2" style={{ color: "white", marginBottom: "20px", margin: "10px" }}>
                        Sign Up
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
                    <TextField
                        sx={formControl}
                        label="Confirm Password"
                        type="password"
                        variant="filled"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: "20px", width: "100%" }}
                        onClick={handleRegister}
                    >
                        Sign Up
                    </Button>
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

export default SignUpPage;
