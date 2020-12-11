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
            main: '#ffca28', //orange
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
            collaboratorId : this.props.user.id,
            alternativeId : this.props.data.alternativeId,
            contents : '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.postFeedback = this.postFeedback.bind(this);
    }

    componentDidMount(){}

    componentWillUnmount(){}

    postFeedback = async (e) => {
        let feedback = this.state;

        console.log(JSON.stringify(feedback))
        console.log(`https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.props.choice.id}/feedback`)

        if (feedback.contents === '') { return; }

        const response = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            url: `https://xqzvoxzs7g.execute-api.us-east-1.amazonaws.com/beta/choice/${this.props.choice.id}/feedback`,
            data: JSON.stringify(feedback)
        });

        this.props.updateChoice(JSON.parse(response.data.body));
    }

    handleChange = (e) => {
          this.setState({[e.target.name]: e.target.value });
      }

    render() {
        let comments = this.props.data.feedback;
        return (
            <ThemeProvider theme={theme}>
            <Grid container xs direction='column'>
                {
                    this.props.choice.finalAlternative === undefined ? 
                    <Grid container item wrap='nowrap' direction='row'>
                        <Grid container item xs={11}>
                        <TextField
                            label='Add feedback to this alternative'
                            name='contents'
                            variant='outlined'
                            margin='dense'
                            fullWidth='true'
                            value={this.state.contents}
                            onChange={this.handleChange}
                            multiline
                            rowsMax={2}
                            InputLabelProps={{shrink: true}}></TextField>
                        </Grid>
                        <IconButton onClick={this.postFeedback}>
                            <SendRoundedIcon />
                        </IconButton>
                    </Grid> : null
                }
                <Grid>
                    {comments.map((comment, idx) => {
                        return (
                            <Comment choice={this.props.choice} data={comment} id={idx}/>
                        );
                    })}
                </Grid>
            </Grid>
            </ThemeProvider>
        );
    }
}