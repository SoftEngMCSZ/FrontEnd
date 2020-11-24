import React from 'react';
import axios from 'axios';
import {createMuiTheme, ThemeProvider, Container, Grid, Typography} from '@material-ui/core';
import Feedback from './Feedback.js'
import Alternative from './Alternative.js'

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

export default class Choice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {name: 'charlotte'},
            choiceID: 'ABCDEFG',
            question: 'What should we get for lunch?',
            finalDecision: {},
            alternatives: [
                {alternativeID: 'ABC123', 
                 contents: 'Habachi',
                 approvals: [{name: 'Jimmy'}],
                 disapprovals: [{name: 'Bobby'},
                                {name: 'Lucy'}],
                 feedback: [{author: 'Bobby',
                             content: 'Habachi sux',
                             timestamp: '11-11-2020'},
                            {author: 'Miranda C.',
                             content: 'What is wrong with you. Hibachi is excellent. We should totally go.',
                             timestamp: '11-12-2020'}]},
                {alternativeID: 'ABC789', 
                 contents: 'McDonalds. I cant believe you made me add hibachi Jimmy.',
                 approvals: [{name: 'Bobby'}],
                 disapprovals: [{name: 'Jimmy'},
                                {name: 'Lucy'}],
                 feedback: [{author: 'Bobby',
                             content: 'McDonalds clearly superior',
                             timestamp: '11-11-2020'}]}            ],
            maxCollabs: 0,
            collaborators: []
        }

        this.updateApproval = this.updateApproval.bind(this);
        this.updateDisapproval = this.updateDisapproval.bind(this);
        this.showFeedback= this.showFeedback.bind(this);
    }

    componentDidMount(){}

    componentWillUnmount(){}

    updateApproval = (e) => {}

    updateDisapproval = (e) => {}

    showFeedback = (e) => {
        return ( <Feedback alternative={this.state.alternatives[e.target.id]}/> );
    }

    render() {
        let alts = this.state.alternatives;
        return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='sm'>
            <Grid container spacing={1} direction='column'>
                <Grid container xs={12} direction='row' align-content-xs-center justify='center' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(2)}}>
                    <Typography variant='h5'>What should we do about...</Typography>
                    <Typography variant='h4'>{this.state.question}</Typography>
                    <Typography variant='overline'>{`Choice Code: ${this.state.choiceID}`}</Typography>
                </Grid>
                <Grid item xs direction='row'>
                    {alts.map((alt, idx) => {
                        return (
                            <Alternative data={alt} id={idx}/>
                        );
                    })}
                </Grid>
            </Grid>
            </Container>
        </ThemeProvider>
        );
    }
}
