import React, {useContext} from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/authContext";

const WriteReviewIcon = ({ movie }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const {navigate} = useNavigate();

    if (!isAuthenticated) {
        navigate("/login");
        return;
    }
    return (
        <Link
            to={`/reviews/form`}
            state={{
                movieId: movie.id,
            }}
        >
            <RateReviewIcon color="primary" fontSize="large" />
        </Link>
    );
};

export default WriteReviewIcon;