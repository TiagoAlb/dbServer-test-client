import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, 
    TextField, Button } from '@material-ui/core';
import UserService from '../../Services/UserService/UserService';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        fontFamily: 'helvetica'
    },

    list: {
        backgroundColor: theme.palette.background.paper,
        maxHeight: 200,
        overflow: 'auto'
    },

    title: {
        color: '#233170',
        padding: theme.spacing(1)
    },

    subTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
}));


const UserList = props => {
    const classes = useStyles();
    const userService = new UserService();
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [user, setUser] = useState({ id: 0, name: '', lastVote: '' });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        listUser();
    }, []);

    const addUser = () => { 
        userService.post(user, 
        success => {
            props.onLogin();
        }, error => {
            alert("Erro ao gravar usuario!");
        }
        );
    };

    const listUser = () => { 
        userService.get((success) => {
            console.log(success);
            setUsers(success);
        }, 
        (error) => {
            alert(error);
        });
    };

    function handleUserChange(e) {
        setUser({ id: 0, name: e.target.value });
    }

    return (
        <div className={classes.root}>
            <Typography align="left" variant="h6" className={classes.title}>
                Qual faminto você é?
            </Typography>
            <div className={classes.list}>
                <List component="nav" aria-label="secondary mailbox folder">
                    {
                        users.length > 0 ?
                            users.map(prop => (
                                <ListItem
                                    key={prop.id}
                                    button
                                    selected={selectedIndex === 2}
                                    onClick={addUser}
                                >
                                    <ListItemText primary={prop.name.toUpperCase()} />
                                </ListItem>
                            ))
                        : <div>Não existem usuários cadastrados</div>
                    }
                </List>
            </div>
            <div>
                <Typography align="left" color="textPrimary" variant="subtitle2" className={classes.subTitle}>
                    Caso não esteja na lista, adicione um novo:
                </Typography>
                <TextField id="outlined-search" label="Diga seu nome" 
                    type="text" fullWidth variant="outlined" 
                    onChange={handleUserChange}/>
                {user.name ?
                    <Button variant="contained" color="secondary" 
                        className={classes.subTitle} disableElevation fullWidth
                        onClick={addUser}>
                        Adicionar
                    </Button>
                        :
                    ''
                }
            </div>
        </div>
    );
};

export default UserList;