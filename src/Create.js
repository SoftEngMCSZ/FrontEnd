import React from 'react';
import axios from 'axios';
import {createMuiTheme, ThemeProvider, Container, Grid, Paper, InputLabel, MenuItem, FormHelperText, FormControl, TextField, Button, Select} from '@material-ui/core';
import { v4 as uuidv4} from 'uuid';

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

let uuid1 = uuidv4();
let uuid2 = uuidv4();

export default class Create extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        question: '',
        alternatives: [{alternativeID: uuid1, contents: '', approvals: [], disapprovals: [], feedback: []},
                       {alternativeID: uuid2, contents: '', approvals: [], disapprovals: [], feedback: []}],
        maxCollabs: 0,
        username : '',
        password : ''
      }
  
      this.handleChange= this.handleChange.bind(this);
  
    }

    componentDidMount(){}

    componentWillUnmount(){}

    createChoice = async (event) => {

        const choice = { question : this.state.question,
                         alternatives : this.state.alternatives,
                         maxCollaborators : this.state.maxCollabs}
        if (choice.question === '' 
            || choice.maxCollaborators === 0
            || choice.alternatives[0].contents === ''
            || choice.alternatives[1].contents === '') { 
                console.log('Error: missing required fields');
                return; }

            
        choice.alternatives = this.state.alternatives.filter(alt => alt.contents != '');

        let test = {
            "question": "Hello Worl",
            "alternatives": [
                     { "alternativeID": "a0be58cf-74c2-4a66-9c22-8f3dd97a4da7", 
                     "contents": "Habachi",
                     "approvals": [],
                     "disapprovals": [],
                     "feedback": []},
                     { "alternativeID": "93dd797f-6e1b-43b0-85b1-82f047e77014", 
                     "contents": "McDonalds. I cant believe you made me add hibachi Jimmy.",
                     "approvals": [],
                     "disapprovals": [],
                     "feedback": []}],
             "maxCollaborators": 1
         }


         console.log(test);

        try {
            const response = await axios({
                method: 'POST',
                url: `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/make`,
                body: test
            });

            // const response = await fetch(`https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/make`, {
            //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //     body: JSON.stringify(data) // body data type must match "Content-Type" header
            //   });
            //   //return response.json(); // parses JSON response into native JavaScript objects
            // }

        console.log('got response');
        console.log(response);
        
        this.props.updateChoice(response);

        this.props.history.push(`/choice/${this.state.choiceID}/view`);
        console.log('redirect failed');

        } catch (err) {
            console.log(err);
        }

        // let body = {
        //     choiceID : this.state.choiceID,
        //     username : this.state.username,
        //     password : this.state.password
        // }

        // const response2 = await axios({
        //     method: 'POST',
        //     url: `/choice/login`,
        //     body: JSON.stringify(body)
        // });

        // if (response2.code === 200) {
        //     this.updateUser({username : this.state.username, password : this.state.password});
            
        // }
    }
  
    addAlternative = (e) => {
        if (this.state.alternatives.length < 5) {
            let uuid = uuidv4();
            this.setState((prevState) => ({
                alternatives:[...prevState.alternatives, {alternativeID: {uuid}, contents: '', approvals: [], disapprovals: [], feedback: []}],
            }));
        }
    }
  
    handleChange = (e) => {
      if (['contents'].includes(e.target.name)) {
        let alternatives = [...this.state.alternatives];
        alternatives[e.target.id][e.target.name] = e.target.value;
        this.setState({ alternatives }, () => console.log(this.state.alternatives));
      } else {
        this.setState({[e.target.name]: e.target.value });
      }
    }

    submit = (e) => {
        e.preventDefault();

    }
  
    render() {
      let alts = this.state.alternatives;
      return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="sm">
            <Grid container spacing={1}>
              <Grid item xs={12} align-content-xs-center>
                <h1 className='title'>
                  Create Choice
                </h1>
              </Grid>
              <Grid item xs={6}>
              <TextField label='Your Name' 
                          className='username'
                          name='username'
                          variant='standard' 
                          margin='dense' 
                          InputLabelProps={{shrink: true}} 
                          type='text'
                          value={this.state.username}
                          onChange={this.handleChange}></TextField>
              </Grid>
              <Grid item xs={6}>
              <TextField label='Password (optional)' 
                          className='password'
                          name='password'
                          variant='standard' 
                          margin='dense' 
                          InputLabelProps={{shrink: true}} 
                          type='password'
                          value={this.state.password}
                          onChange={this.handleChange}></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField label='Question' 
                          className='question'
                          name='question'
                          variant='standard' 
                          margin='dense' 
                          InputLabelProps={{shrink: true}} 
                          type='text'
                          value={this.state.question}
                          onChange={this.handleChange}></TextField>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id='select-num-collaborators-label'>Number of Collaborators</InputLabel>
                  <Select labelId='select-num-collaborators-label'
                          id='select-num-collaborators'
                          name='maxCollabs'
                          className='maxCollabs'
                          margin='dense' 
                          value={this.state.maxCollabs}
                          onChange={this.handleChange}>
                    <MenuItem value=''><em>Select</em></MenuItem>
                    <MenuItem value={2}>One</MenuItem>
                    <MenuItem value={3}>Two</MenuItem>
                    <MenuItem value={4}>Three</MenuItem>
                    <MenuItem value={5}>Four</MenuItem>
                  </Select>
                  <FormHelperText>How many people you can invite</FormHelperText>
                </FormControl>
              </Grid>
              { alts.map((val, idx) => {
                let altDescId = `contents-${idx}`;
                return (
                  <Grid item xs={12}>
                    <Paper elevation={2}>
                      <Grid item xs={12} style={{margin: 20, paddingBottom: 20, paddingTop: 5}}>
                        <Grid item xs={12}>
                          <h2 className='subtitle'>{`Alternative ${idx+1}`}</h2>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField label='Alternative description'
                                      className='contents'
                                      data-id={idx}
                                      name='contents'
                                      id={idx}
                                      htmlFor={altDescId}
                                      variant='standard'
                                      margin='dense'
                                      fullWidth='true'
                                      multiline
                                      rowsMax={4}
                                      type='text'
                                      InputLabelProps={{shrink: true}}
                                      value={this.state.alternatives[idx].contents}
                                      onChange={this.handleChange}>Description</TextField>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )
              })}
              <Grid item xs={12} container direction='row-reverse'>
                <Button size='small' onClick={this.addAlternative}>+ Add Alternative</Button>
              </Grid>
              <Grid item xs={12}>
                <Button size='large' variant='contained' onClick={this.createChoice}>Create</Button>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      );
    }
  }