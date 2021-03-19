import React, { Fragment } from 'react';
import { ImageDisplay } from "./ImageDisplay";

export const Client = ({ task, onCheckBoxClick, onDeleteClick }) => {
    // console.log(task._id);
    return (
        <li>
            <input type="checkbox" checked={!!task.isChecked} onClick={() => onCheckBoxClick(task)} readOnly />
            <span>{task.text}</span> 
            <ImageDisplay clientid={task && task._id} />
            <button onClick={() => onDeleteClick(task)}>Delete Client</button>
        </li>
    );
};
