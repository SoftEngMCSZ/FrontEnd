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

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      choice : {
        id: 'ABCDEFG',
        question: 'What should we get for lunch BUT IN APP?',
        selectedAlternative: {},
        alternatives: [
            {alternativeID: 'ABC123', 
            contents: 'Habachi',
            approvals: [{name: 'Jimmy'}],
            disapprovals: [{name: 'Bobby'},
                            {name: 'Lucy'}],
            feedback: [{author: 'Bobby',
                        content: 'Habachi sux',
                        timestamp: '11-11-2020'},
                        {author: 'Miranda C.',
                        content: 'What is wrong with you. Hibachi is excellent. We should totally go.',
                        timestamp: '11-12-2020'}]},
            {alternativeID: 'ABC789', 
            contents: 'McDonalds. I cant believe you made me add hibachi Jimmy.',
            approvals: [{name: 'Bobby'}],
            disapprovals: [{name: 'Jimmy'},
                            {name: 'Lucy'}],
            feedback: [{author: 'Bobby',
                        content: 'McDonalds clearly superior',
                        timestamp: '11-11-2020'}]}            ],
        maxCollaborators: 0,
        collaborators: []
      },
      currentUser : {}
    }

    this.updateChoice = this.updateChoice.bind(this);
    this.updateUser = this.updateUser.bind(this);

  }

  updateChoice = (response) => {
    this.setState({ choice : response });
    console.log("APP " + JSON.stringify(this.state.choice));
  }

  updateUser = (auth) => {
    this.setState({currentUser : auth });
    console.log("APP " + this.state.currentUser);
  }
  
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h5'>
                WhatDo?
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} container direction='row'>
                  <Button color="inherit" component={Link} to='/'>Home</Button>
                  <Button color="inherit" component={Link} to='/create'>Create</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <div>
          <Switch>
            <Route path="/create" render={(props) => (<Create {...props} updateChoice={this.updateChoice} updateUser={this.updateUser}/>)} />
            <Route path='/choice/:id/view' render={(props) => (<Choice {...props} choice={this.state.choice} user={this.state.currentUser} updateChoice={this.updateChoice}/>)}/>
            <Route path="/choice/:id" render={(props) => (<SignIn {...props} updateChoice={this.updateChoice} updateUser={this.updateUser}/>)} />
            <Route path="/choice" component={Choice} />
            <Route path='/admin' component={Admin} />
            <Route path="/" render={(props) => (<SignIn {...props} updateChoice={this.updateChoice} updateUser={this.updateUser}/>)}/>
          </Switch>
        </div>
      </Router>
    );
  }
}




