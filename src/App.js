import './App.css';
import Create from './Create.js';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import Choice from './Choice.js';
import SignIn from './SignIn.js';

const theme = createMuiTheme({
  spacing: 8,
  palette: {
      type: 'light',
      primary: {
        main: '#009688', //teal
      },
      secondary: {
          main: '#ffb74d', //orange
      },
  },
  formControl: {
    minWidth: 120,
  }
});

export default function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5'>
              WhatDo?
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} xs container direction='row'>
                <Button color="inherit" component={Link} to='/'>Home</Button>
                <Button color="inherit" component={Link} to='/create'>Create</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <div>
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/choice">
            <Choice />
          </Route>
          <Route path="/">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}




