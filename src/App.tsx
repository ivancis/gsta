import React, { Fragment, useState } from 'react';
import './normalice.css'; 
import styles from './App.module.css';


type FormElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

//JSX.Element: TS custom definition
function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  // debugger;

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  console.log(todos);

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    // switch complete state
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    // newTodos = todos.filter((todo: ITodo) => todo !== newTodos[index]); This also work but must `let newTodos`
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <div className={styles.app}>
        <h1 className={styles.title}>Todo List</h1>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type='submit'
            className={styles.button}
          >
            Add Todo
          </button>
        </form>
        <ul className={styles.list}>
          {todos.map((todo: ITodo, index: number) => {
            return (
              <Fragment key={index}>
                <li className={styles.listItem}>
                  <h4
                    className={styles.subtitle}
                    style={{ textDecoration: todo.complete ? 'line-through' : '' }}
                  >
                    {todo.text}
                  </h4>
                  <li className={styles.listItemAction}>
                    <button
                      type='button'
                      onClick={(): void => completeTodo(index)}
                      className={styles.button}
                    >
                      {todo.complete ? 'Incomplete' : 'Complete'}
                    </button>
                    <button
                      type='button'
                      onClick={(): void => deleteTodo(index)}
                      className={styles.button}
                    >
                      &times;
                    </button>
                  </li>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}
export default App;
