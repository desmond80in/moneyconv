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

import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphiql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
