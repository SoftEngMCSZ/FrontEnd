import React from 'react'
import {Container, Grid, Button, TextField, Typography, Paper, IconButton, ThemeProvider, createMuiTheme, Tooltip, Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core'
import SyncRoundedIcon from '@material-ui/icons/SyncRounded';
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

       this.retrieveChoices = this.retrieveChoices.bind(this);
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
                <Container maxWidth='md'>
                <Grid container spacing={1} direction='column'>
                    <Grid container item xs direction='row' justify='flex-start' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, paddingTop: theme.spacing(2)}}>
                        <Typography variant='h4'>Manage</Typography>
                    </Grid>
                    <Grid container item xs={12} direction='row' wrap='nowrap' alignItems='baseline' style={{margin: `${theme.spacing(1)}px auto`, paddingBottom: theme.spacing(2)}}>
                        <Grid container item xs={3}>
                            <Typography variant='subtitle1'>
                                Remove Choices more than
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
                        <Grid container item xs={2}>
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
                    <Grid container item xs={12} direction='row' wrap='nowrap' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, paddingBottom: theme.spacing(2)}}>
                        <Typography variant='h5'>Current Choices</Typography>
                        <Tooltip title='Sync Choices' placement='right'>
                            <IconButton className='refreshButton' onClick={this.retrieveChoices}>
                                <SyncRoundedIcon 
                                    color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid>
                    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell>Choice ID</TableCell>
                            <TableCell align="right">Choice Description</TableCell>
                            <TableCell align="right">Creation Date</TableCell>
                            <TableCell align="right">Completed?</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {choices.map((choice) => (
                            <TableRow key={choice.id}>
                            <TableCell component="th" scope="row">
                                {choice.id}
                            </TableCell>
                            <TableCell align="right">Pass Me Questions PLS</TableCell>
                            <TableCell align="right">{choice.creationTime}</TableCell>
                            <TableCell align="right">{choice.isCompleted ? 'Completed' : 'Incomplete'}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Grid>
                </Grid>
                </Container>
            </ThemeProvider>
        );
    } 
}