import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Footer from "./components/Footer/Footer";
import ItemsContainer from "./components/ItemsContainer/ItemsContainer";
import Logo from "./components/Logo/Logo";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="content-wrapper">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Logo />
          <Sidebar />
          <ItemsContainer />
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
