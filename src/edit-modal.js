import React, { memo } from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const EditTaskDialog = (props) => {
  const [taskContent, setTaskContent] = useState("");
  const updateTask = () => {
    props.handleSave(props.task.id, taskContent);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter task content and click on the 'Save' button, to cancel updating
          this task click on the 'Cancel' button
        </DialogContentText>
        <TextField
          id="outlined-helperText"
          label="Task Detail"
          defaultValue={props.task.text}
          variant="outlined"
          fullWidth
          onChange={(event) => setTaskContent(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={updateTask} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(EditTaskDialog);
