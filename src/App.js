import './App.css';
import Create from './Create.js';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import {createMuiTheme, ThemeProvider, Grid, Button, AppBar, Toolbar, Typography} from '@material-ui/core';
import Choice from './Choice.js';
import SignIn from './SignIn.js';
import Admin from './Admin.js';

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
          <Route path="/create" component={Create} />
          <Route path="/choice/:choiceID" component={SignIn} />
          <Route path="/choice" component={Choice} />
          <Route path='/admin' component={Admin} />
          <Route path="/" component={SignIn}/>
        </Switch>
      </div>
    </Router>
  );
}




