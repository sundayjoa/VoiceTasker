import React, {useState} from "react"
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    //리스트 삭제 함수
    const deleteItem = props.deleteItem;

    const deleteEventHandler = () => {
        deleteItem(item);
    };

    //리스트 수정 함수
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    const turnOnReadOnly = (e) => {
        if (e.key == "Enter"){
            setReadOnly(true);
        }
    };

    const editItem = props.editItem;

    const editEventHandler = (e) => {
        item.title = e.target.value;
        editItem();
    };

    //체크박스 함수
    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem();
    }

    return(
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler} />
            <ListItemText className="todo-list">
                <InputBase
                    inputProps={{ "aria-label": "naked", readOnly: readOnly, style: { fontFamily: 'Ownglyph_UNZ-Rg', fontSize: '27px' }}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
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