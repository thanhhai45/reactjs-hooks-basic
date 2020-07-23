import React, { useState, useEffect } from 'react';
import './App.scss';
// import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';

function App() {
  const [todolist, setTodoList] = useState([
    { id: 1, title: 'Check Learn Reactjs Hook' },
    { id: 2, title: 'Check Learn Reactjs Redux Hook' },
    { id: 3, title: 'Check Learn Reactjs Router Hook'},
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const resquestUrl = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(resquestUrl);
        const responseJSON = await response.json();
        
        const { data } = responseJSON;
        setPostList( data );
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
      
    }
    fetchPostList();
  }, [])

  useEffect(() => {
    
    console.log("To List effect");
  })

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todolist.findIndex(x => x.id === todo.id)
    if (index < 0) return;

    const newTodoList = [...todolist];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todolist.length + 1,
      ...formValues,
    }
    const newTodoList = [...todolist];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);

  }

  return (
    <div className="app">
      <h1>React hooks - TodoList</h1>
      {/* <ColorBox /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todolist} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postList}/>
    </div>
  );
}

export default App;
