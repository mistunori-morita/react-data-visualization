import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import AppBar from "./AppBar";
import CoinList from "./CoinList";
const cc = require("cryptocompare");

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

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    console.log(coinList);
    this.setState({ coinList });
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
        <div>{CoinList.call(this)}</div>
      </div>
    );
  };

  loadingContent = () => {
    if (!this.state.coinList) {
      return <div> Loading Coins </div>;
    }
  };
  render() {
    return (
      <AppLayout>
        {AppBar.call(this)}
        {this.loadingContent() || (
          <Content>
            {this.displayingSettings() && this.settingsContent()}
          </Content>
        )}
      </AppLayout>
    );
  }
}

export default App;
