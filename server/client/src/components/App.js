import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions'

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveryNew from "./surveys/SurveyNew";


class App extends Component {
  componentDidMount(){ // prefered method, since willMount is called multiple times
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveryNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
