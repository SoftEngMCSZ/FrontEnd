import React from 'react'
import {createMuiTheme, ThemeProvider, Paper, Typography, Grid} from '@material-ui/core'

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

export default class ChoiceTableItem extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let choice = this.props.data;
        return (
            <ThemeProvider theme={theme}>
                <Paper elevation={2}>
                    <Grid container item xs direction='row' alignItems='center' justify='space-between' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(1)}}>
                        <Typography variant='h6'>{choice.choiceID}</Typography>
                        <Typography variant='h6'>{choice.creationDate}</Typography>
                        <Typography variant='h6'>{choice.completed}</Typography>
                    </Grid>
                </Paper>
            </ThemeProvider>
        );
    }
}