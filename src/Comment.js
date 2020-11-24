import React from 'react'
import { Typography, Grid, ThemeProvider, createMuiTheme} from '@material-ui/core';

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

export default class Comment extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){}

    componentWillUnmount(){}

    render() {
        let comment = this.props.data;
        return (
        <ThemeProvider>
                <Grid container xs direction='column' alignItems='center' style={{margin: `${theme.spacing(1)}px auto`, padding: theme.spacing(1)}}>
                    <Grid container item xs direction='row' alignItems='center' justify='space-between'>
                        <Typography variant='h6'>{comment.author + ' '}</Typography>
                        <Grid container item xs style={{marginBottom: `${theme.spacing(1)}px auto`, paddingLeft: theme.spacing(1)}}>
                            <Typography variant='caption'>{comment.timestamp}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs style={{marginBottom: `${theme.spacing(1)}px auto`, paddingBottom: theme.spacing(1)}}>
                        <Typography variant='body2'>{comment.content}</Typography>
                    </Grid>
                </Grid>
        </ThemeProvider>
        );
    }
}