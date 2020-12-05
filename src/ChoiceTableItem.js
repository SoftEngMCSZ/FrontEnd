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

function completed(bool) {
    if (bool) {
        return "Completed";
    }
    else {
        return "Incomplete";
    }
}

export default class ChoiceTableItem extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        let choice = this.props.data;
        return (
            <ThemeProvider theme={theme}>
                <Paper elevation={2}>
                    <Grid container xs direction='column' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(1)}}>
                        <Grid container item xs direction='row' alignItems='center' justify='flex-start'>
                            <Typography variant='h6'>{choice.id}</Typography>
                        </Grid>
                        <Grid container item xs direction='row' alignItems='center' justify='space-between'>
                            <Typography variant='body1'>{choice.creationTime}</Typography>
                            <Typography variant='body1'>{completed(choice.isCompleted)}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </ThemeProvider>
        );
    }
}