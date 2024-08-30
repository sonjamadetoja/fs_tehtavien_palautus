import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { NotificationContextProvider } from './NotificationContext';
import { AuthContextProvider } from './AuthContext';
import '../index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>,
);
