import React, {Component} from 'react';
import DBLogo from '../../assets/img/dbLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Aos famintos da DBServer
          </Typography>
            <div>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                target="blank"
                href="https://www.dbserver.com.br/"
              >
                <img src={DBLogo} height="50px" width="auto"/>
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}