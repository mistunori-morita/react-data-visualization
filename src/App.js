import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import AppBar from "./AppBar";
import Search from "./Search";
import CoinList from "./CoinList";
import _ from "lodash";
import { ConfirmButton } from "./Button";
const cc = require("cryptocompare");

const AppLayout = styled.div`
  padding: 40px;
`;

const Content = styled.div``;
export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

const MAX_FAVORITES = 10;

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
    page: "settings",
    favorites: ["ETH", "BTC", "XMR", "DOGE", "EOS"],
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
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
  };

  settingsContent = () => {
    return (
      <div>
        {this.firstVisitMessage()}
        <CenterDiv>
          <ConfirmButton onClick={this.confirmFavorites}>
            Confirm Favorites
          </ConfirmButton>
        </CenterDiv>
        <div>
          {CoinList.call(this, true)}
          {Search.call(this)}
          {CoinList.call(this)}
        </div>
      </div>
    );
  };

  loadingContent = () => {
    if (!this.state.coinList) {
      return <div> Loading Coins </div>;
    }
  };

  addCoinToFavorites = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoinFromFavorites = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInFavorites = key => {
    return _.includes(this.state.favorites, key);
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
