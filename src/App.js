import React, { Component, Fragment } from "react";
import "./App.css";
import Home from "./component/Main/Home";
import DetailPage from "./component/Main/DetailPage/detailPage"
import NewStore from "./component/Main/newStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./component/Layout/Navbar"
import PrivateRoute from "./component/common/PrivateRoutes"

class App extends Component {
  render() {
    return (
      <Fragment>

        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/detail" component={DetailPage} />
            <PrivateRoute exact path="/addStore" component={NewStore} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
export default App;
