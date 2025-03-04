import React from 'react';
import { Filter } from '../App';

type FooterProps = {
  activeCount: number;
  currentFilter: Filter;
  setCurrentFilter: (filter: Filter) => void;
};

const Footer: React.FC<FooterProps> = ({
  activeCount,
  currentFilter,
  setCurrentFilter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${currentFilter === 'all' ? 'selected' : ''}`}
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
          className={`filter__link ${currentFilter === 'active' ? 'selected' : ''}`}
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
          className={`filter__link ${currentFilter === 'completed' ? 'selected' : ''}`}
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
  );
};

export default Footer;
