import Router, { Route, Switch } from "crossroad";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Switch redirect="/">
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
