import { useEffect, useReducer } from "react";

const TodoApp = () => {
  
  const init = () =>{
    return JSON.parse(localStorage.getItem("todos")) || []
    // return [
    //   {
    //     id: new Date().getTime(),
    //     description: "Veamos a donde nos lleva",
    //     done: false,
    //   }] 
    }

  const reducer = (state = [], action) => {
    switch (action.type) {
      case "addTodo":
        return [...state, action.payload]
      case "deleteTodo":
        return state.filter(todo => todo.id !== action.payload)  
      case "toggleTodo":
        return state.map( todo =>
            (todo.id === action.payload) ?
            { ...todo, done: !todo.done}
            :todo
          )

      // case "toggleTodo":
      //   return state.map( todo =>{

      //     if(todo.id === action.payload){
      //       return {
      //         ...todo,
      //         done: !todo.done

      //       }
      //     }else{
      //       return todo
      //     }
      //   })  
      default:
        return state
    }
  }

  const [todos, dispatch] = useReducer(reducer, [] , init)
  console.log(todos)

  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  const handleDelete = (id) =>{
    const action = {
      type: "deleteTodo",
      payload: id
    }
    dispatch(action)
  }
  const handleToggle = (id) =>{
    dispatch({
      type: "toggleTodo",
      payload: id
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.description.value < 1) return

    const newTodo = {
      id: new Date().getTime(),
      description: e.target.description.value,
      done: false
    }
    const action = {
      type: "addTodo",
      payload: newTodo
    }

    dispatch(action)
    e.target.reset()

  }
  return (
    <div>
      <h1>Todo App {todos.length}</h1>
      <hr />
      <h3>Agregar Todo</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Agregue una tarea"
        name="description"
        autoComplete="off"
        />
        <button type="submit">
          Agregar
        </button>
      </form>
      <ul >
        {
          todos.map((todo, index) => (
            <li key={todo.id}
            style={{display:"flex"}}
            >
                <p
                className={`${ todo.done && 'complete' }`} 
                onClick={() => handleToggle(todo.id)}>{index +1}.{todo.description}</p>
              <button onClick={() => handleDelete(todo.id)}>
                Borrrar
            </button>
            </li>
            
          ))
        }
      </ul>
    </div>
  )
}

export default TodoApp;
