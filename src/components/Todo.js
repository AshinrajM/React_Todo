import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { IoMdDoneAll } from 'react-icons/io';

import React, { useState, useRef, useEffect } from 'react';
import './Todo.css';


function Todo() {

  const [change, setChange] = useState(false)

  const [input, setInput] = useState('');
  const [display, setDisplay] = useState([]);
  const [editId, setEditID] = useState(0);
  const inputRef = useRef('null');

  const addTodo = () => {
    const all = display.some((i) => i.list === input)
    if (input !== '') {
      if (!all) {

        setDisplay([...display, { list: input, id: Date.now(), status: false }])
        console.log(display);
        setInput('')
      }
    }
    if (editId) {
      const editTodo = display.find((i) => i.id === editId)
      const updateTodo = display.map((i) => i.id === editTodo.id
        ? (i = { id: i.id, list: input }) : (i = { id: i.id, list: i.list }))
      setDisplay(updateTodo)
      setEditID(0)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onDelete = (id) => {
    setDisplay(display.filter((i) => i.id !== id))
  }

  const onComplete = (id) => {
    let complete = display.map((todo) => {
      if (todo.id === id) {
        return ({ ...todo, status: !todo.status })
      }
      return todo
    })
    setDisplay(complete)
  }

  const onEdit = (id) => {
    const editTodo = display.find((todo) => todo.id === id)
    setInput(editTodo.list)
    setEditID(editTodo.id)
  }

  useEffect(() => {
    inputRef.current.focus();
  })

  const changeColor = () => {
    setChange(!change)
  }

  const h1Style = {
    color: change ? 'white' : 'black',
  }

  return (
    <div className='container'>
      <h2 onClick={changeColor} style={h1Style}>TODO APP</h2>
      <form action="" className='form-group' onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} onChange={(event) => setInput(event.target.value)} value={input} placeholder='Enter your task' className='form-control' />
        <button onClick={addTodo}>{editId ? "Edit" : "Add"}</button>
      </form>
      <div className='list'>
        <ul>
          {
            display.map((i) => (
              <li className='list-items'>
                <div className='list-item-list' id={i.status ? 'list-item' : ''}>{i.list}</div>
                <span>
                  <IoMdDoneAll className='list-item-icons' id='complete' onClick={() => onComplete(i.id)} title='complete' />
                  <BiEditAlt className='list-item-icons' id='edit' onClick={() => onEdit(i.id)} title='edit' />
                  <RiDeleteBin6Fill className='list-item-icons' onClick={() => onDelete(i.id)} id='delete' title='delete' />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todo 