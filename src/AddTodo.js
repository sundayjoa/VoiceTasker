import React, {useState} from "react";

import {Grid, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const AddTodo = (props) =>{
    //사용자 입력 저장 오브젝트
    const [item, setItem] = useState({title:""});
    const addItem = props.addItem;

    //추가 버튼 클릭 함수
    const onButtonClick = () => {
        addItem(item);
        setItem({title: ""});
    }

    //엔터키를 눌러도 추가 가능
    const enterKeyEventHandler = (e) => {
        if (e.key == 'Enter') {
            onButtonClick();
        }
    };

    const onInputChange = (e) => {
        setItem({title: e.target.value});
    };

    return(
        <Grid container style={{marginTop: 20}}>
            <Grid xs={11} md={10} item style={{paddingRight: 5}}>
                <TextField placeholder="할 일을 입력해주세요." fullWidth
                onChange = {onInputChange} onKeyPress = {enterKeyEventHandler} value = {item.title} />
            </Grid>
            <Grid xs={1} md={1} item style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={onButtonClick}/>
                </Fab>
            </Grid>
                <KeyboardVoiceIcon className="voiceIcon" />
        </Grid>
    );
}

export default AddTodo;