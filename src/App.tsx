import "./App.css";
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="content-wrapper">
        <Logo />
        <Sidebar />
        <Footer />
      </div>
    </>
  );
}

export default App;
