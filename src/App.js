import './App.css';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Snowfall from './Snowfall';
import Logo from './Logo';
import React, {useState} from "react";
import {Container, List, Paper} from "@mui/material";

function App() {
  const [items, setItems] = useState([
    {
      id: "0",
      title: "Hello World 1",
      done: true,
    },
    {
      id:"1",
      title: "Hello World 2",
      done: true,
    },
]);

let todoItems =
  items.length > 0 && (
    <Paper style={{margin: 15}}>
      <List>
        {items.map((item) =>(
          <Todo item={item} key={item.id} />
        ))}
      </List>
    </Paper>
  );

  return (
    <>
      <div className="index-background">
      <div className="logo-background">
          <Logo />
          </div>
        <div className="background">
        <Snowfall />
        <Container maxWidth="md">
          <AddTodo />
          <div>{todoItems}</div>
        </Container>
      </div>
      </div>
     </>
     );
}

export default App;
