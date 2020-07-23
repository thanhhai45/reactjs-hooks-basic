import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import './App.scss';
// import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import PostFilterForm from './components/PostFilterForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';

function App() {
  const [todolist, setTodoList] = useState([
    { id: 1, title: 'Check Learn Reactjs Hook' },
    { id: 2, title: 'Check Learn Reactjs Redux Hook' },
    { id: 3, title: 'Check Learn Reactjs Router Hook'},
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilter] = useState({
    _limit: 10,
    _page: 1,
    title_like: '',
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const resquestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(resquestUrl);
        const responseJSON = await response.json();
        
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
      
    }
    fetchPostList();
  }, [filters])

  function handlePageChange(newPage) {
    setFilter({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
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

  function handleFilterChange(newFilters) {
    setFilter({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);
  return (
    <div className="app">
      <h1>React hooks - Clock</h1>
      {showClock && <Clock />}
      <BetterClock />
      <button onClick={() => setShowClock(false)}>Hide clock</button>

      {/* <ColorBox /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todolist} onTodoClick={handleTodoClick} /> */}
      {/* <PostFilterForm onSubmit={handleFilterChange}/>
      <PostList posts={postList}/>
      <Pagination
        pagination={pagination} 
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}

export default App;
