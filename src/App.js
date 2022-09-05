import "./styles.css";
import { useState, useReducer, useRef, useCallback } from "react";
import Button from "@material-ui/core/Button";
import EditTaskDialog from "./edit-modal";
import TextField from "@material-ui/core/TextField";
import ToDoList from "./todos";

export default function App() {
  const findMaxId = (array) => Math.max(...array);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskDetail, setTaskDetail] = useState({});
  const newTaskInput = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const refInput = useRef();
  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        let taskId =
          state.length === 0 ? 0 : findMaxId(state.map((t) => t.id)) + 1;
        return state.concat([{ id: taskId, text: action.text }]);
      case "remove":
        return state.filter((task) => task.id !== action.id);
      case "update":
        return state.map((task) => {
          if (task.id === action.id) {
            return { ...task, text: action.text };
          } else {
            return task;
          }
        });
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const handleOpenDialog = useCallback(
    (taskId) => {
      setOpenDialog(true);
      setTaskDetail(state.filter((t) => t.id === taskId)[0]);
    },
    [state]
  );

  const removeTask = useCallback((taskId) => {
    dispatch({ type: "remove", id: taskId });
  }, []);

  const saveTask = (id, text) => {
    dispatch({ type: "update", id: id, text: text });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNewTask = (event) => {
    //event.preventDefault();
    switch (event.keyCode) {
      case 13:
        newTaskInput.current.style.display = "none";
        dispatch({ type: "add", text: event.target.value });
        setInputValue("");
        break;
      default:
        break;
    }
  };

  const handleAddTask = (event) => {
    //event.preventDefault();
    newTaskInput.current.style.display = "block";
    refInput.current.focus();
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ToDoList
        items={state}
        editHandler={handleOpenDialog}
        removeHandler={removeTask}
      />
      <TextField
        ref={newTaskInput}
        inputRef={refInput}
        style={{ marginBottom: "1em", display: "none" }}
        id="standard-basic"
        label="Standard"
        value={inputValue}
        onChange={(event) => handleInputChange(event)}
        onKeyUp={(event) => handleNewTask(event)}
        fullWidth
      />
      <Button
        size="small"
        onClick={(event) => handleAddTask(event)}
        variant="outlined"
        color="primary"
      >
        Add new task
      </Button>
      <EditTaskDialog
        isOpen={openDialog}
        task={taskDetail}
        handleClose={() => setOpenDialog(false)}
        handleSave={saveTask}
      />
    </div>
  );
}
