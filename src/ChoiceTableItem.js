import React from 'react'
import {createMuiTheme, ThemeProvider, Typography, Grid, Divider} from '@material-ui/core'

const theme = createMuiTheme({
    spacing: 8,
    palette: {
        type: 'light',
        primary: {
            main: "#009688", //teal
        },
        secondary: {
            main: '##ffca28', //orange
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
                    <Grid container xs direction='column' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(1)}}>
                        <Grid container item xs direction='row' alignItems='center' justify='space-around'>
                            <Typography variant='body1'>{choice.id}</Typography>
                            <Divider />
                            <Typography variant='body1'>{choice.creationTime}</Typography>
                            <Typography variant='body1'>{completed(choice.isCompleted)}</Typography>
                        </Grid>
                        <Divider />
                    </Grid>
            </ThemeProvider>
        );
    }
}