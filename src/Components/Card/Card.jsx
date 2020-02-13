import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardContent, CardMedia, CardActions, Paper,
    Typography, Card, CardHeader, Avatar, Tooltip, Zoom
} from '@material-ui/core';
import { red, green, yellow, blue, grey, pink, brown, orange } from '@material-ui/core/colors';
import ShowMoreText from 'react-show-more-text';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    phone_number: {
        marginLeft: 'auto',
        paddingRight: theme.spacing(2)
    },
    cardContent: {
        minHeight: theme.spacing(5),
        fontSize: '12pt'
    },
    countVotes: {
        backgroundColor: green[400],
        width: '50%',
        color: 'white',
        padding: theme.spacing(1)
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: grey[800]
    },
    favorite: {
        '&:hover': {
            color: red[400]
        }
    },
    open: {
        color: 'green'
    },
    close: {
        color: red[400]
    }
}));

export default function RestaurantsList(props) {
    const classes = useStyles();

    let prop = props.prop;
    let count = 0;

    if (props.voteDisabled) {
        prop = props.prop.restaurant;
        count = props.prop.countVotes;
    }

    function selectAvatarColor(name) {
        let value = 400;
        if (name.startsWith('P'))
            return red[value];
        else if (name.startsWith('G'))
            return orange[value];
        else if (name.startsWith('B'))
            return brown[value];
        else if (name.startsWith('L'))
            return yellow[value];
        else if (name.startsWith('C'))
            return pink[value];
        else if (name.startsWith('I'))
            return blue[value];
        else if (name.startsWith('V'))
            return green[value];
        else
            return grey[value];
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe"
                        style={{ backgroundColor: selectAvatarColor(prop.name) }}
                    >
                        {prop.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={prop.name.substring(0, 34)}
                subheader={
                    prop.open_now ?
                        <Typography variant="subtitle2" component="p" className={classes.open}>ABERTO</Typography>
                        :
                        <Typography variant="subtitle2" component="p" className={classes.close}>FECHADO</Typography>
                }

            />
            <CardMedia
                className={classes.media}
                image={prop.urlImage}
                alt={'ERRO AO CARREGAR IMAGEM'}
            />
            <CardContent className={classes.cardContent}>
                <ShowMoreText
                    lines={2}
                    more='Ver mais'
                    less='Ver menos'
                    anchorClass=''
                    expanded={false}
                    width={250}>
                    {prop.vicinity}
                </ShowMoreText>
            </CardContent>
            <CardActions disableSpacing>
                {!props.voteDisabled ?
                    <Tooltip title="Votar" TransitionComponent={Zoom} placement="right" onClick={() => props.vote(props.prop.place_id)}>
                        <IconButton className={classes.favorite} aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    : <Paper className={classes.countVotes}>{count + ' votos'}</Paper>}
                <Typography className={classes.phone_number} variant="subtitle2">
                    {prop.formatted_phone_number ?
                        prop.formatted_phone_number
                        : 'SEM TELEFONE'
                    }
                </Typography>
            </CardActions>
        </Card>
    );
}