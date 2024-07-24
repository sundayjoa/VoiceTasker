import React, {useState, useEffect} from "react";

import {Grid, TextField, Dialog, DialogTitle, DialogContent} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import recognitionAudio from './audio/recognition.mp3';

//음성 인식 추가
const SpeechRecognition = window.SpecchRecodgnition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "ko-KR";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const AddTodo = (props) =>{
    //사용자 입력 저장 오브젝트
    const [item, setItem] = useState({title:""});
    const addItem = props.addItem;
    const [isRecognizing, setIsRecognizing] = useState(false);

    //추가 버튼 클릭 함수
    const onButtonClick = () => {
        addItem(item);
        setItem({title: ""});
    }

    //엔터키를 눌러도 추가 가능
    const enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            onButtonClick();
        }
    };

    //음성 인식 추가 함수
    const startRecognition = () => {
        if (!isRecognizing) {
            //시작음 재생
            const beep = new Audio(recognitionAudio)
            beep.play();

            //짧은 지연 시간 후 음성 인식 시작
            setTimeout(() => {
                recognition.start();
                setIsRecognizing(true);
            }, 300);
        }
    };

    useEffect(() => {
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setItem({title: transcript})
            setIsRecognizing(false);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service disconnected');
            setIsRecognizing(false);
        };
    }, []);

    const onInputChange = (e) => {
        setItem({title: e.target.value});
    };
    
    return(
        <div>
        <Grid container style={{marginTop: 20}}>
            <Grid xs={11} md={10} item style={{paddingRight: 5}}>
                <TextField placeholder="할 일을 입력해주세요." fullWidth
                onChange = {onInputChange} onKeyPress = {enterKeyEventHandler} value = {item.title} />
            </Grid>
            <Grid xs={1} md={1} item style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Fab color="primary" aria-label="add" className="add-icon">
                    <AddIcon onClick={onButtonClick}/>
                </Fab>
            </Grid>
                <KeyboardVoiceIcon className="voiceIcon" onClick={startRecognition} />
        </Grid>
        <Dialog open = {isRecognizing}>
            <DialogTitle>음성 인식 중...</DialogTitle>
            <DialogContent>
                <p className = "recogMessage">음성 인식이 진행 중입니다.</p>
            </DialogContent>

        </Dialog>

        </div>
    );
}

export default AddTodo;