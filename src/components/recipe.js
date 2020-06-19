import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import {
    Favorite,
    MoreVert,
    BookmarkBorder,
    FavoriteBorder,
} from "@material-ui/icons";

class recipe extends Component {
    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                maxWidth: 345,
            },
            media: {
                height: 0,
                paddingTop: "56.25%", // 16:9
            },
            expand: {
                transform: "rotate(0deg)",
                marginLeft: "auto",
                transition: theme.transitions.create("transform", {
                    duration: theme.transitions.duration.shortest,
                }),
            },
            expandOpen: {
                transform: "rotate(180deg)",
            },
            avatar: {
                backgroundColor: red[500],
            },
        }));

        return (
            <div>
                <div>
                    <Link to="/write">글쓰기</Link>
                </div>
                <div>
                    <Card className={useStyles.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={useStyles.avatar}>
                                    R
                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVert />
                                </IconButton>
                            }
                            title="제목"
                            subheader="날짜"
                        />
                        <CardMedia
                            className={useStyles.media}
                            image="/img/add_icon.png"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                요리 소개
              </Typography>
                        </CardContent>
                        <CardActions disableSpacing style={{ float: "right" }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorder />
                            </IconButton>
                            <IconButton aria-label="share">
                                <BookmarkBorder />
                            </IconButton>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default recipe;
