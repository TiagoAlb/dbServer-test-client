import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Typography, CircularProgress
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import RestaurantsVotingService from '../../Services/RestaurantsService/RestaurantsVotingService';
import Card from '../../Components/Card/Card';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    loading: {
        '& span': {
            padding: theme.spacing(2)
        },

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12pt',
        color: grey[800]
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: grey[800]
    }
}));

export default function RestaurantsVotesList(props) {
    const classes = useStyles();
    const [restaurants, setRestaurants] = useState([]);
    const [message, setMessage] = useState(
        <div className={classes.loading}>
            <CircularProgress color="secondary" />
            <span>CARREGANDO RESTAURANTES...</span>
        </div>);
    const restaurantsVotingService = new RestaurantsVotingService();

    const listRestaurants = () => {
        restaurantsVotingService.get(
            (success) => {
                if (success.length > 0)
                    setRestaurants(success);
                else
                    setMessage(<div>Não existem restaurantes para exibir</div>);
            }, (error) => {
                alert(error);
            });
    };

    useEffect(() => {
        listRestaurants();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="subtitle1">PARABÉNS {props.userName.toUpperCase()}! VOTO REALIZADO.
                    VOCÊ NÃO PODE MAIS PARTICIPAR HOJE, MAS VEJA O ANDAMENTO DA VOTAÇÃO:</Typography>
            </div>
            <Grid container>
                {
                    restaurants.length > 0 ?
                        restaurants.map(prop => (
                            <Grid item md={3} sm={6} xs={12}>
                                <Card key={prop.place_id} prop={prop} voteDisabled />
                            </Grid>
                        ))
                        : message}
            </Grid>
        </div>
    );
}