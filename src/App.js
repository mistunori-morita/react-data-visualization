import React, { Component } from "react";
import "./App.css";
import styled, { css } from "styled-components";
import AppBar from "./AppBar";

const AppLayout = styled.div`
  padding: 40px;
`;

const Content = styled.div``;

const checkFirstVisit = () => {
  let cryptoDashData = localStorage.getItem("cryptoDash");
  if (!cryptoDashData) {
    return {
      firstVisit: true,
      page: "settings"
    };
  }
};

class App extends Component {
  state = {
    page: "dashboard",
    ...checkFirstVisit()
  };

  displayingDashboard = () => this.state.page === "dashboard";
  displayingSettings = () => this.state.page === "settings";
  firstVisitMessage = () => {
    if (this.state.firstVisit) {
      return (
        <div>
          Welcome to CryptoDash, please select your favorite coins to begin.
        </div>
      );
    }
  };

  confirmFavorites = () => {
    localStorage.setItem("cryptoDash", "test");
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
  };

  settingsContent = () => {
    return (
      <div>
        {this.firstVisitMessage()}
        <div onClick={this.confirmFavorites}>Confirm Favorites</div>
      </div>
    );
  };

  render() {
    return (
      <AppLayout>
        {AppBar.call(this)}

        <Content>{this.displayingSettings() && this.settingsContent()}</Content>
      </AppLayout>
    );
  }
}

export default App;
