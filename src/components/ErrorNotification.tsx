import React from 'react';

type ErrorNotificationProps = {
  errorMessage: string | null;
  onHide: () => void;
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMessage,
  onHide,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${!errorMessage ? 'hidden' : ''}`}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onHide}
      />
      {errorMessage}
    </div>
  );
};

export default ErrorNotification;
