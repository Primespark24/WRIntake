import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import {
    Button, Checkbox, Grid, InputLabel, MenuItem, Paper, Select,
} from "@material-ui/core";
import { useTrackerSubscription } from "../../api/customHooks";
import { FormsCollection } from "../../db/FormsCollection";
import { NavBar } from "../Frequents.jsx";
import { fieldTypes } from "../../api/formConstants";

const useStyles = makeStyles({
    root: {
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
    },
});

export function FormManagementPage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const { data, loading } = useTrackerSubscription('forms', () => FormsCollection.find({}).fetch());
    const formFields = loading ? [] : data;
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    const renderTree = (nodes) => (
        <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.name}>
            {data.filter((f) => (f.parentId === nodes._id)).map((f) => renderTree(f))}
        </TreeItem>
    );
    const selectedJson = (data && data[data.findIndex((i) => i._id === selected)]) || {};
    return (
        <NavBar>
            <Paper style={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TreeView
                            className={classes.root}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            expanded={expanded}
                            selected={selected}
                            onNodeToggle={handleToggle}
                            onNodeSelect={handleSelect}
                        >
                            {formFields && formFields.filter((f) => !f.parentId).map((f) => renderTree(f))}
                        </TreeView>

                    </Grid>
                    <Grid item container xs={4} spacing={3} direction="column">
                        <Grid item style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <InputLabel>Required</InputLabel>
                            <Checkbox />
                        </Grid>
                        <Grid item>
                            <InputLabel id="demo-simple-select-helper-label">Field Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                value={selectedJson.type || fieldTypes.none}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    Meteor.call('forms.update', { _id: selectedJson._id }, { $set: { type: e.target.value } });
                                }}
                            >
                                <MenuItem value={fieldTypes.none}>None</MenuItem>
                                <MenuItem value={fieldTypes.bool}>Checkbox</MenuItem>
                                <MenuItem value={fieldTypes.string}>Text</MenuItem>
                                <MenuItem value={fieldTypes.file}>File</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button>Add Child</Button>
                        </Grid>
                        <Grid item>
                            <Button>Delete This</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </NavBar>
    );
}