import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    GridList, Grid, Paper, Collapse, CardContent,
    CardMedia, CardActions, Typography, Card, CardHeader,
    Avatar
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import tileData from './tileData';
import imageTest from '../../images/grid-list/breakfast.jpg';
import RestaurantsService from '../../Services/RestaurantsService/RestaurantsService';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '10px',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: 1200,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function RestaurantsList() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [restaurants, setRestaurants] = React.useState(false);
    const restaurantsService = new RestaurantsService();

    useEffect(() => {
        listRestaurants();
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const listRestaurants = () => {
        restaurantsService.get((success) => {
            console.log(success);
            setRestaurants(success);
        },
            (error) => {
                alert(error);
            });
    };

    return (
        <div className={classes.root}>
            <Grid container>
                {
                    restaurants.length > 0 ?
                        restaurants.map(prop => (
                            <Grid item md={3} sm={6} xs={12}>
                                <Card className={classes.root}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={imageTest}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>
                                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                                minutes.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                        ))
                        : <div>Não existem restaurantes para exibir</div>}
      </Grid>
        </div>
    );
}