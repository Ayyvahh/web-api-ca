import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";


const Header = (props ) => {
    const title = props.title
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 1.5,
                padding:'5px',
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h4" sx={{
                fontStyle: 'italic',
                fontSize: {xs: "1.5rem", sm: "2rem", md: "2.2rem"},
            }}>
                {title}
            </Typography>
            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;