import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import NavBar from "./components/NavBar";
import { Provider } from 'react-redux'
import Home from "./views/Home";
import store from "./store";
import SingleMovie from "./views/SingleMovie";

const queryClient = new QueryClient()

function App() {

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Home />} />
                    <Route path="/movies/:id" element={<SingleMovie />} />
                </Routes>
            </Provider >
        </QueryClientProvider>

    </div>
  );
}

export default App;
