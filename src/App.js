import './App.css';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Snowfall from './Snowfall';
import Santa from './Santa';
import Logo from './Logo';
import React, {useEffect, useState} from "react";
import {Container, List, Paper} from "@mui/material";
import { call } from "./ApiService";

function App() {
  const [items, setItems] = useState([]);

  //리스트 추가
  const addItem = (item) => {
    item.id = "ID-" + items.length;
    item.done = false;
    setItems([...items, item]);
    console.log("items: ", items);
  };

  //리스트 삭제
  const deleteItem = (item) => {
    const newItems = items.filter(e => e.id != item.id);
    setItems([...newItems]);
  }

  //리스트 수정
  const editItem = () => {
    setItems([...items]);
  };

  //Api 콜
  useEffect(() => {
    call("/todo", "GET", null)
    .then((response) => setItems(response.data));
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

  return (
    <>
      <div className="index-background">
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
