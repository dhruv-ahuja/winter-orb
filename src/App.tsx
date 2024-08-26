import "./App.css";
import Footer from "./Footer";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

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
