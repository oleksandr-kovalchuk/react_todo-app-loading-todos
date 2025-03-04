import React, { useState, useEffect, useMemo } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>('all');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const todosFromServer = await getTodos();

      setTodoList(todosFromServer);
    } catch (error) {
      setErrorMessage('Unable to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => setErrorMessage(null), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const filteredTodos = useMemo(() => {
    if (currentFilter === 'active') {
      return todoList.filter(todo => !todo.completed);
    }

    if (currentFilter === 'completed') {
      return todoList.filter(todo => todo.completed);
    }

    return todoList;
  }, [todoList, currentFilter]);

  const activeTodosCount = useMemo(
    () => todoList.filter(todo => !todo.completed).length,
    [todoList],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {!loading && todoList.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <div
                  data-cy="Todo"
                  key={todo.id}
                  className={`todo ${todo.completed ? 'completed' : ''}`}
                >
                  {/* eslint-disable jsx-a11y/label-has-associated-control */}
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                    />
                  </label>
                  <span className="todo__title" data-cy="TodoTitle">
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                  >
                    ×
                  </button>
                  <div data-cy="TodoLoader" className="modal overlay">
                    {/* eslint-disable-next-line max-len */}
                    <div className="modal-background has-background-white-ter" />
                    <div className="loader" />
                  </div>
                </div>
              ))}
            </section>

            <footer className="todoapp__footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodosCount} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${
                    currentFilter === 'all' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkAll"
                  onClick={e => {
                    e.preventDefault();
                    setCurrentFilter('all');
                  }}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${
                    currentFilter === 'active' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkActive"
                  onClick={e => {
                    e.preventDefault();
                    setCurrentFilter('active');
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${
                    currentFilter === 'completed' ? 'selected' : ''
                  }`}
                  data-cy="FilterLinkCompleted"
                  onClick={e => {
                    e.preventDefault();
                    setCurrentFilter('completed');
                  }}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
              >
                Clear completed
              </button>
            </footer>
          </>
        )}

        {loading && <div className="notification is-info">Loading...</div>}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          !errorMessage ? 'hidden' : ''
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage(null)}
        />
        {errorMessage}
      </div>
    </div>
  );
};

export default App;
