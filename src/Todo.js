import React, {useState} from "react"
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);

    //리스트 삭제 함수
    const deleteItem = props.deleteItem;

    const deleteEventHandler = () => {
        deleteItem(item);
    };

    return(
        <ListItem>
            <Checkbox checked={item.done} />
            <ListItemText className="todo-list">
                <InputBase
                    inputProps={{ "aria-label": "naked", style: { fontFamily: 'Ownglyph_UNZ-Rg', fontSize: '27px' }}}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton aria-label = "리스트 삭제하기" onClick = {deleteEventHandler}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Todo;