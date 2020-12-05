import React from 'react'
import {Container, Grid, Button, TextField, Typography, ThemeProvider, createMuiTheme} from '@material-ui/core'
import ChoiceTableItem from './ChoiceTableItem.js'
import axios from 'axios';

const theme = createMuiTheme({
    spacing: 8,
    palette: {
        type: 'light',
        primary: {
            main: "#009688", //teal
        },
        secondary: {
            main: '#ffb74d', //orange
        },
    },
    formControl: {
      minWidth: 120,
    }
});

export default class Admin extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            choices : []
        }

        this.retrieveChoices.bind(this);
    }

    componentDidMount() {
        this.retrieveChoices();
    }

    async retrieveChoices() {
        let body = {} // what you need to send, as a dictionary

        const response = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/admin`, // the endpoint url
            data: JSON.stringify(body)
        });


        let choicesToList = Object.values(JSON.parse(response.data.body))[0]

        this.setState({choices : choicesToList})
    }

    render() {
        let choices = this.state.choices;
        console.log(choices)
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth='sm'>
                <Grid container spacing={1} direction='column'>
                    <Grid container item xs={12} direction='row' justify='flex-start' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}}>
                        <Typography variant='h4'>Manage</Typography>
                    </Grid>
                    <Grid container item xs direction='row' wrap='nowrap' alignItems='baseline'>
                        <Grid container item xs={4}>
                            <Typography variant='subtitle1'>
                                Clear Choices more than
                            </Typography>
                        </Grid>
                        <Grid container item xs={1}>
                            <TextField
                                type='number'
                                variant='standard'
                                margin='dense'
                                size='small'
                                style={{width: 40}}></TextField>
                        </Grid>
                        <Grid container item xs>
                            <Typography variant='subtitle1'>
                                days old.
                            </Typography>
                        </Grid>
                        <Grid container item xs>
                            <Button
                                variant='contained'
                                size='small'>
                                Delete</Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs>
                        <Typography variant='h6'>
                            Current Choices:
                        </Typography>
                    </Grid>
                    <Grid>
                    {choices.map((choice, idx) => {
                        return (
                            <ChoiceTableItem data={choice} id={idx}/>
                        );
                    })}
                </Grid>
                </Grid>
                </Container>
            </ThemeProvider>
        );
    } 
}