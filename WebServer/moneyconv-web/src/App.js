import "./App.css";
import { Provider } from "react-redux";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ConverterPage from "./pages/ConverterPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Headder";
import PrivateRoute from "./components/privateRoute";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <PrivateRoute path="/converter" component={ConverterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
