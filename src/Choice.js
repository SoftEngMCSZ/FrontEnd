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
import { Card, IconButton, Tooltip, Typography } from '@material-ui/core';
import { ThumbUpRounded, ThumbDownRounded, GradeRounded, ChatBubbleRounded } from '@material-ui/icons';

const theme = createMuiTheme({
    spacing: 8,
    palette: {
        type: 'light',
        primary: {
            main: "#7e57c2", //purple
        },
        secondary: {
            main: '#ba68c8', //green
        },
    },
    formControl: {
      minWidth: 120,
    }
});

export default class Choice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            choiceID: '',
            question: '',
            finalDecision: {},
            alternatives: [],
            maxCollabs: 0,
            collaborators: []
        }
    }

    componentDidMount(){}

    componentWillUnmount(){}

    render() {
        let alts = this.state.alternatives;
        return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='sm'>
            <Grid container spacing={1} direction='column'>
                <Grid container xs={12} direction='row' align-content-xs-center justify='center' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
                    <Typography variant='h5'>What should we do about...</Typography>
                    <Typography variant='h4'>The choice we have to make?</Typography>
                </Grid>
                <Grid container xs={12} direction='row'>
                        <Paper elevation={2}>
                            <Grid container xs wrap='nowrap' direction='column' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
                                <Grid container item xs direction='row' alignItems='center'>
                                    <Typography variant='h5'>Alternative 1</Typography>
                                    <Tooltip title='Mark as final' placement='right'>
                                        <IconButton>
                                            <GradeRounded />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid container item xs>
                                    <Typography>The description of the alternative can be somewhat long. I allowed for up to four lines of text in the input. The text will wrap accordingly.</Typography>
                                </Grid>
                                <Grid container item direction='row'>
                                    <Grid container xs justify='center'>
                                        <Tooltip title='Liked by:'>
                                            <IconButton>
                                                <ThumbUpRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid container xs justify='center'>
                                        <Tooltip title='Disliked by:'>
                                            <IconButton>
                                                <ThumbDownRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid container xs justify='center'>
                                        <Tooltip title='Feedback'>
                                            <IconButton>
                                                <ChatBubbleRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
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