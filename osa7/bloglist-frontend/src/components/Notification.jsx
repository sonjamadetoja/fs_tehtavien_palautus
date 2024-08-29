import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const message = useNotificationValue();
  if (message === '') {
    return null;
  }

  return <div className="notification">{message}</div>;
};

export default Notification