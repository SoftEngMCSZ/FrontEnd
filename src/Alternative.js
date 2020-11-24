import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { ThumbUpRounded, ThumbDownRounded, GradeRounded, ModeCommentRounded } from '@material-ui/icons';
import Feedback from './Feedback.js'

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

export default class Alternative extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            viewFeedback: false,
            feedbackColor:  '',
            liked: '',
            disliked: '',
        }

        this.showFeedback = this.showFeedback.bind(this)
        this.updateApproval = this.updateApproval.bind(this)
        this.updateDisapproval = this.updateDisapproval.bind(this)
    }

    showFeedback = (e) => {
        if (this.state.viewFeedback) { 
            this.setState({viewFeedback: false})
            this.setState({feedbackColor: ''})
        } else {
            this.setState({viewFeedback: true})
            this.setState({feedbackColor: 'primary'})
        }
    }

    updateApproval = (e) => {
        if (this.state.liked === '') {
            this.setState({liked : 'primary'})
            this.setState({disliked : ''})
        } else {
            this.setState({liked : ''})
        }
    }

    updateDisapproval = (e) => {
        if (this.state.disliked === '') {
            this.setState({disliked : 'primary'})
            this.setState({liked : ''})
        } else {
            this.setState({disliked : ''})
        }
    }

    render(){
    let altId = this.props.id;
    let alt = this.props.data;
    return (
        <ThemeProvider theme={theme}>
        <Grid item xs spacing={2}>
        <Paper elevation={2}>
            <Grid container xs htmlFor={altId} wrap='nowrap' direction='column' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
                <Grid container item xs direction='row' alignItems='center'>
                    <Typography variant='h5'>{`Alternative ${altId+1}`}</Typography>
                    <Tooltip title='Mark as final' placement='right'>
                        <IconButton>
                            <GradeRounded />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container item xs>
                    <Typography variant='body1'>{alt.contents}</Typography>
                </Grid>
                <Grid container item direction='row'>
                    <Grid container xs justify='center'>
                        <Tooltip title={`Liked by: ${alt.approvals.map((approval, idx) => {return approval.name})} `}>
                            <IconButton className='approvals' id={altId} onClick={this.updateApproval}>
                                <ThumbUpRounded 
                                    color={this.state.liked}
                                    onClick={this.updateApproval}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid container xs justify='center'>
                        <Tooltip title={`Disliked by: ${alt.disapprovals.map((disapproval, idx) => {return ' ' + disapproval.name})}`}>
                            <IconButton className='disapprovals' id={altId} onClick={this.updateDisapproval}>
                                <ThumbDownRounded 
                                    color={this.state.disliked}
                                    onClick={this.updateDisapproval}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid container xs justify='center'>
                        <Tooltip title='Feedback'>
                            <IconButton className='feedbackButton' id={altId} onClick={this.showFeedback}>
                                <ModeCommentRounded 
                                    color={this.state.feedbackColor} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                 { this.state.viewFeedback
                    ? <Feedback data={alt.feedback} />
                    : null
                }
            </Grid>
        </Paper>
        </Grid>
        </ThemeProvider>
    )
    }
}