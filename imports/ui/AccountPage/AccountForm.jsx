import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Chart from './Files/ClientChart';
import Deposits from './Files/ClientTotal';
import Orders from './Files/ClientList';
import { NavBar, useStyles } from "../Frequents";

const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     toolbar: {
//         paddingRight: 24, // keep right padding when drawer closed
//     },
//     toolbarIcon: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         padding: '0 8px',
//         ...theme.mixins.toolbar,
//     },
//     appBar: {
//         zIndex: theme.zIndex.drawer + 1,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//     },
//     appBarShift: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },
//     menuButton: {
//         marginRight: 36,
//     },
//     menuButtonHidden: {
//         display: 'none',
//     },
//     title: {
//         flexGrow: 1,
//     },
//     drawerPaper: {
//         position: 'relative',
//         whiteSpace: 'nowrap',
//         width: drawerWidth,
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     },
//     drawerPaperClose: {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//             width: theme.spacing(9),
//         },
//     },
//     appBarSpacer: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         height: '100vh',
//         overflow: 'auto',
//     },
//     container: {
//         paddingTop: theme.spacing(4),
//         paddingBottom: theme.spacing(4),
//     },
//     paper: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         overflow: 'auto',
//         flexDirection: 'column',
//     },
//     fixedHeight: {
//         height: 240,
//     },
// }));

export function AccountForm() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <NavBar>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Orders />
                </Paper>
            </Grid>
            <Grid>
                <TextField
                    label="Username"
                    value="Average Joe"
                    onChange={(e) => {
                        e.preventDefault();
                        setFullName(e.target.value);
                    }}
                />
                <TextField
                    label="Email"
                    value="defaultemail@email.com"
                    onChange={(e) => {
                        e.preventDefault();
                        setFullName(e.target.value);
                    }}
                />
                <TextField
                    label="Password"
                    value="123456"
                    onChange={(e) => {
                        e.preventDefault();
                        setFullName(e.target.value);
                    }}
                />
                <TextField
                    label="Location"
                    value="NewCastle, UK"
                    onChange={(e) => {
                        e.preventDefault();
                        setFullName(e.target.value);
                    }}
                />
            </Grid>
        </NavBar>

    );
}