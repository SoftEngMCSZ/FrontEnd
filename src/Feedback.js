import { createMuiTheme, ThemeProvider, Grid, TextField, IconButton} from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import React from 'react'
import axios from 'axios'
import Comment from './Comment.js'
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

export default class Feedback extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            feedbackID : uuidv4(),
            alternativeID : this.props.data.alternativeID,
            contents : '',
            author : this.props.currentUser.name,
            timestamp : ''
        }
    }

    componentDidMount(){}

    componentWillUnmount(){}

    postFeedback = async (e) => {
        let feedback = this.state;
        feedback.timestamp = new Date().toISOString();

        if (feedback.contents === '') { return; }

        const response = await axios({
            method: 'POST',
            url: `/choice/feedback`,
            body: JSON.stringify(feedback)
        });

        this.props.updateChoice(response);
    }

    render() {
        let comments = this.props.data.feedback;
        return (
            <ThemeProvider theme={theme}>
            <Grid container xs direction='column'>
                <Grid container item wrap='nowrap' direction='row'>
                    <Grid container item xs={11}>
                    <TextField
                        label='Add feedback to this alternative'
                        variant='outlined'
                        margin='dense'
                        fullWidth='true'
                        multiline
                        rowsMax={2}
                        InputLabelProps={{shrink: true}}></TextField>
                    </Grid>
                    <IconButton onClick={this.postFeedback}>
                        <SendRoundedIcon />
                    </IconButton>
                </Grid>
                <Grid>
                    {comments.map((comment, idx) => {
                        return (
                            <Comment data={comment} id={idx}/>
                        );
                    })}
                </Grid>
            </Grid>
            </ThemeProvider>
        );
    }
}