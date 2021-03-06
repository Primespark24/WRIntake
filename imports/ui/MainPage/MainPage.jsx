import React, { useState } from "react";
import { List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ClientForm } from "./ClientForm";
import { Client } from "./Client";
import { ClientsCollection } from "/imports/db/ClientsCollection";
import { NavBar } from "../Frequents";
import { useTrackerSubscription } from "../../api/customHooks";
import { SearchBar } from "/imports/ui/SearchBar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('clients.set', _id, {
        isChecked: !isChecked,
    });  
};

const filterClients = (clients, query) => {
    if (!query || clients === undefined) {
        return clients;
    }

    return clients.filter((client) => {
        const clientName = client.fullName.toLowerCase();
        return clientName.includes(query.toLowerCase());
    });
};

export const MainPage = () => {
    /// //
    // This part is for  logic
    const deleteClient = ({ _id }) => Meteor.call('clients.remove', _id);
    const { data: clients, isLoading } = useTrackerSubscription("clients",
        () => ClientsCollection.find({}, { sort: { createdAt: -1 } }).fetch());

    /// ////////////This part is for display
    const classes = useStyles();

    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState("");
    const filteredClients = filterClients(clients, searchQuery)

    return (
        <NavBar>
            {/* Add New Clients */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <ClientForm />
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchUpdate={setSearchQuery}
                    />
                </Paper>
            </Grid>
            {/* Display Clients */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <h1>
                        Potential Clients
                    </h1>
                    <List style={{
                        width: '100%',
                    }}
                    >
                        { isLoading
                            ? <Typography>Loading Information...</Typography>
                            : filteredClients.map((client) => (
                                <Client
                                    key={client._id}
                                    clientData={client}
                                    onCheckBoxClick={toggleChecked}
                                    onDeleteClick={deleteClient}
                                />
                            ))}
                    </List>
                </Paper>
            </Grid>
        </NavBar>
    );
};
