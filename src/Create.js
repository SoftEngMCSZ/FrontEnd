import React from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
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
        alternatives: [{alternativeID: uuid1, description: '', approvals: [], disapprovals: [], feedback: []},
                       {alternativeID: uuid2, description: '', approvals: [], disapprovals: [], feedback: []}],
        maxCollabs: 0
      }
  
      this.handleChange= this.handleChange.bind(this);
  
    }

    componentDidMount(){}

    componentWillUnmount(){}

    createChoice = async (event) => {
        const choice = this.state;
        if (choice.question === '' || choice.maxCollabs === 0) return;

        const response = await axios({
            method: 'POST',
            url: `/choice/make`,
            body: JSON.stringify(choice)
        });
        
        console.log(response);
    }
  
    addAlternative = (e) => {
        if (this.state.alternatives.length < 5) {
            let uuid = uuidv4();
            this.setState((prevState) => ({
                alternatives:[...prevState.alternatives, {alternativeID: {uuid}, description: '', approvals: [], disapprovals: [], feedback: []}],
            }));
        }
    }
  
    handleChange = (e) => {
      if (['description'].includes(e.target.className)) {
        let alternatives = [...this.state.alternatives];
        alternatives[e.target.dataset.id][e.target.className] = e.target.value;
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
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                  </Select>
                  <FormHelperText>How many people you can invite</FormHelperText>
                </FormControl>
              </Grid>
              { alts.map((val, idx) => {
                let altDescId = `description-${idx}`;
                return (
                  <Grid item xs={12}>
                    <Paper elevation={2}>
                      <Grid item xs={12} style={{margin: 20, paddingBottom: 20, paddingTop: 5}}>
                        <Grid item xs={12}>
                          <h2 className='subtitle'>{`Alternative ${idx+1}`}</h2>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField label='Alternative description'
                                      className='description'
                                      data-id={idx}
                                      name={altDescId}
                                      id={altDescId}
                                      htmlFor={altDescId}
                                      variant='standard'
                                      margin='dense'
                                      fullWidth='true'
                                      multiline
                                      rowsMax={4}
                                      InputLabelProps={{shrink: true}}
                                      value={alts[idx].contents}
                                      onChange={this.handleChange}
                                      type='text'>Description</TextField>
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