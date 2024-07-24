import './App.css';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Snowfall from './Snowfall';
import Santa from './Santa';
import Logo from './Logo';
import React, {useEffect, useState} from "react";
import {AppBar, Container, Grid, List, Paper, Toolbar, Button} from "@mui/material";
import { call, signout } from "./ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //리스트 추가
  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  //리스트 삭제
  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  }

  //리스트 수정
  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  //Api 콜
useEffect(() => {
  call("/todo", "GET", null).then((response) => {
    setItems(response.data);
    setLoading(false);
  });
}, []);


let todoItems =
  items.length > 0 && (
    <Paper style={{margin: 15}}>
      <List>
        {items.map((item) =>(
          <Todo item={item} key={item.id} editItem={editItem} deleteItem = {deleteItem} />
        ))}
      </List>
    </Paper>
  );

  //네비게이션 바
  let navigationBar = (
    <AppBar position = "static" className="navigation" >
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
          </Grid>
          <Grid item>
            <Button className="logoutBtn" color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      <div className="index-background">
        {navigationBar}
          <Santa />
        <div className="logo-background">
          <Logo />
          </div>
        <div className="background">
        <Snowfall />
        <Container maxWidth="md">
          <AddTodo addItem = {addItem} />
          <div>{todoItems}</div>
        </Container>
      </div>
      </div>
     </>
     );
}

export default App;
