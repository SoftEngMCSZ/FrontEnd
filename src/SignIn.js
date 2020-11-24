import React from 'react'
import { Typography , Grid, TextField, Button, Paper, ThemeProvider, createMuiTheme, Container } from '@material-ui/core'

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
            choiceID : ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        if (this.props.match != null) {
            const { match: {params}} = this.props;
            this.setState({choiceID : params.choiceID})
        }
    }

    handleChange  = (e) => {
        this.setState({[e.target.name]: e.target.value });
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
                                name='choiceID'
                                InputLabelProps={{shrink: true}}
                                value={this.state.choiceID}
                                onChange={this.handleChange}
                                ></TextField>
                    </Grid>
                    <Grid container item xs alignItems='center' justify='center' style={{marginTop: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}}>
                        <Button variant='contained'>View Choice</Button>
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