import React, { useState, useEffect, useMemo } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export type Filter = 'all' | 'active' | 'completed';

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
        <Header />
        {!loading && todoList.length > 0 && (
          <>
            <TodoList todos={filteredTodos} />
            <Footer
              activeCount={activeTodosCount}
              currentFilter={currentFilter}
              setCurrentFilter={setCurrentFilter}
            />
          </>
        )}
        {loading && <div className="notification is-info">Loading...</div>}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        onHide={() => setErrorMessage(null)}
      />
    </div>
  );
};
