import React from "react";
import { QueryClient, QueryClientProvider } from "react-query"
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavBar />
        <AppRoutes/>
      </Provider >
    </QueryClientProvider>
  );
}

export default App;
