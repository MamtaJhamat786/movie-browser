import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBar from "./components/NavBar";
import { Provider } from 'react-redux';
import store from "./store";
import AppRoutes from '../src/AppRoutes';

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
            <NavBar />
            <AppRoutes/>
            </Provider >
        </QueryClientProvider>

    </div>
  );
}

export default App;
