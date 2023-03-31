import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import Exchange from './Exchange';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Exchange />
    </QueryClientProvider>
  )
}


export default App;
