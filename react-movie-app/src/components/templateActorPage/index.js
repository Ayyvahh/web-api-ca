import React from "react";
import ActorHeader from "../actorPageHeader";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {useQuery} from "react-query";
import Spinner from "../spinner";
import {getActorImages} from "../../api/tmdb-api";

const TemplateActorPage = ({actor, children}) => {
    const {data, error, isLoading, isError} = useQuery(
        ["images", {id: actor.id}],
        getActorImages
    );

    if (isLoading) return <Spinner/>;
    if (isError) return <h1>{error.message}</h1>;

    const images = data?.profiles || [];

    return (
        <>
            <ActorHeader actor={actor}/>
            <Grid container spacing={5} style={{padding: "15px"}}>
                <Grid size={{xs: 3}}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                        }}
                    >
                        <ImageList
                            sx={{
                                height: "100vh",
                                width: "90%",

                            }}
                            cols={1}
                        >
                            {images.map((image) => (
                                <ImageListItem key={image.file_path} cols={1}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={actor.name || "Actor Image"}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid size={{xs: 9}}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateActorPage;
