import React, { Fragment, useState } from 'react';

import cx from 'classnames';
import './normalice.css';
import styles from './App.module.scss';

const {
  Add24,
  TrashCan24,
  Checkbox32,
  CheckboxChecked32
} = require('@carbon/icons-react');

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
        <header>
          <h1 className={styles.title}>GSy toDo</h1>
          <h4 className={styles.subtitle}>Add your tasks for today!</h4>
        </header>
        <section>
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
              className={styles.buttonPrimary}
            >
              Add to-do
              <Add24 aria-label="Add" />
            </button>
          </form>
          <ul className={styles.list}>
            {todos.map((todo: ITodo, index: number) => {
              return (
                <Fragment key={index}>
                  <li className={styles.listItem}>
                    <div className={styles.listItemContent}>
                      <label
                        style={{ textDecoration: todo.complete ? 'line-through' : '' }}
                        className={todo.complete ? styles.checkboxIsChecked : styles.checkbox}
                      >
                          <input
                            type='checkbox'
                            onChange={(): void => completeTodo(index)}
                          />
                          <span className={styles.checkboxIcon}>
                            {todo.complete ? <CheckboxChecked32 aria-label="Incomplete" /> : <Checkbox32 aria-label="Complete" />}
                          </span>
                          {todo.text}
                      </label>
                    </div>
                    <div className={styles.listItemAction}>
                      <button
                        type='button'
                        onClick={(): void => deleteTodo(index)}
                        className={cx(
                          styles.buttonDelete,
                          styles.buttonSmall,
                          styles.buttonOnlyIcon
                        )}
                      >
                        <TrashCan24 aria-label="Delete" />
                      </button>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </section>
      </div>
    </Fragment>
  );
}
export default App;
