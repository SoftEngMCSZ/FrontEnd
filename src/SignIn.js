import React from 'react'
import { Typography , Grid, TextField, Button, Paper, ThemeProvider, createMuiTheme, Container } from '@material-ui/core'
import  { Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Choice from './Choice.js'

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

export default class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            id : '',
            badRegister : false,
            badLogin : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount () {
        if (this.props.match.params.id != null) {
            const { match: {params}} = this.props;
            this.setState({id : params.id})
        }
    }

    handleChange  = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    signIn = async (e) => {
        
        let url = '';

        if (this.state.password === ''){
            url = `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}/login?username=${this.state.username}`;
        } else {
            url = `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}/login?username=${this.state.username}&password=${this.state.password}`
        }
        let response2 = '';
        const response = await axios({
            method: 'POST',
            url: url
        });

        if ((response.data.statusCode === 200)) {

            let theuser = JSON.parse(response.data.body);

            response2 = await axios({
                method: 'GET',
                url : `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}?authentication=${theuser.authentication}`
            });

            let thechoice = JSON.parse(response2.data.body);
        
            this.props.updateChoice(thechoice);
            this.props.updateUser({username :  this.state.username, password : this.state.password, id : theuser.id});

            this.props.history.push(`/choice/${thechoice.id}/view`);
        } else {
            this.setState({badLogin : true});
        }
    }

    signUp = async (e) => {
        let url = '';

        if (this.state.password === ''){
            url = `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}/login?username=${this.state.username}`;
        } else {
            url = `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}/login?username=${this.state.username}&password=${this.state.password}`
        }
        let response2 = '';

        const response = await axios({
            method: 'POST',
            url: url
        });

        if ((response.data.statusCode === 201)) {

            let theuser = JSON.parse(response.data.body);

            response2 = await axios({
                method: 'GET',
                url : `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.state.id}?authentication=${theuser.authentication}`
            });

            let thechoice = JSON.parse(response2.data.body);
            
            this.props.updateChoice(thechoice);
            this.props.updateUser({username :  this.state.username, password : this.state.password, id : theuser.id});

            this.props.history.push(`/choice/${thechoice.id}/view`);
        } else {
            this.setState({badRegister : true});
        }

    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <Container maxWidth='sm'>
            <Grid container sm direction='column' alignItems='center' justify='center'>
            <Grid item xs style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
            <Paper elevation={2}>
                <Grid container item xs direction='column' alignItems='center' justify='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
                    <Typography variant='h6'>Sign in to view a choice.</Typography>
                    <Grid container item xs direction='column'>
                    <TextField margin='dense' 
                                label='Your Name' 
                                name='username'
                                InputLabelProps={{shrink: true}}
                                value={this.state.name}
                                onChange={this.handleChange}
                                ></TextField>
                        <TextField margin='dense' 
                                label='Password (optional)' 
                                name='password'
                                type='password'
                                InputLabelProps={{shrink: true}}
                                value={this.state.password}
                                onChange={this.handleChange}
                                ></TextField>
                        <TextField margin='dense' 
                                label='Choice Code' 
                                name='id'
                                InputLabelProps={{shrink: true}}
                                value={this.state.id}
                                onChange={this.handleChange}
                                ></TextField>
                    </Grid>
                    <Grid container item xs direction='row' alignItems='center' justify='center'>
                        <Grid container item xs alignItems='center' justify='center' style={{marginTop: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}}>
                            <Button variant='contained' onClick={this.signIn}>Login</Button>
                        </Grid>
                        <Grid container item xs alignItems='center' justify='center' style={{marginTop: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}} >
                            <Button variant='contained' onClick={this.signUp}>Register</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs alignItems='center' wrap='nowrap' justify='center' style={{marginTop: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}} >
                            { this.state.badRegister
                                ? <Typography variant='caption'>User already registered.</Typography>
                                : null
                            }
                            { this.state.badLogin
                                ? <Typography variant='caption'>Username or password is not correct.</Typography>
                                : null
                            }
                    </Grid>
                </Grid>
            </Paper>
            </Grid>
            </Grid>
            </Container>
            </ThemeProvider>
        );
    } 
}