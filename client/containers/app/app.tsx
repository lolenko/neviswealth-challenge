import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Dashboard } from '@/client/containers/dashboard';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

export { App };
