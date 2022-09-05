import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { memo } from "react";
const ToDoList = (props) => {
  const items = props.items;
  const editHandler = props.editHandler;
  const removeHandler = props.removeHandler;
  return (
    <table>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item.id}>
              <td
                style={{
                  textAlign: "left",
                  verticalAlign: "middle",
                  textOverflow: "ellipsis"
                }}
              >
                <li>{item.text}</li>
              </td>
              <td style={{ width: "2em" }}>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => editHandler(item.id)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </td>
              <td style={{ width: "2em" }}>
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => removeHandler(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(ToDoList);
