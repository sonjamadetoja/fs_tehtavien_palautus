import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'RESET':
      return '';
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const showNotification = (dispatch, message) => {
  dispatch({ type: 'SET', payload: message });
  setTimeout(() => dispatch({ type: 'RESET' }), 5 * 1000);
};

export default NotificationContext;
