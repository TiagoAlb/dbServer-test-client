import React from 'react';
import DBLogo from '../../assets/img/dbLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: 'helvetica'
  },
  toolbar: {
    backgroundColor: '#233170'
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {props.backButton ?
            <IconButton edge="start" onClick={props.logout} className={classes.menuButton} color="inherit" aria-label="menu">
              <ArrowBack />
            </IconButton>
            :
            <div></div>
          }

          <Typography variant="subtitle1" fontFamily="Arial" className={classes.title}>
            Aos famintos da DBServer
          </Typography>
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            target="blank"
            href="https://www.dbserver.com.br/"
          >
            <img src={DBLogo} alt="DBServer" height="50px" width="auto" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}