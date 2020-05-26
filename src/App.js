import React from "react";
import "./App.css";
import Movie from "./components/Movie";
import Details from "./components/Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Movie} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
