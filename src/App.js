import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import fuzzy from "fuzzy";
import AppBar from "./AppBar";
import Search from "./Search";
import CoinList from "./CoinList";
import Dashboard from "./Dashboard";
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
    this.fetchPrices();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    console.log(coinList);
    this.setState({ coinList });
  };
  fetchPrices = async () => {
    let prices;
    try {
      prices = await this.prices();
    } catch (e) {
      this.setState({ error: true });
    }
    console.log(prices);
    this.setState({ prices });
  };
  prices = () => {
    let promises = [];
    this.state.favorites.forEach(sym => {
      promises.push(cc.priceFull(sym, "USD"));
    });
    return Promise.all(promises);
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
    if (!this.state.prices) {
      return <div>Loading Prices</div>;
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
  handleFilter = _.debounce(inputValue => {
    let coinSymbols = Object.keys(this.state.coinList);
    let coinNames = coinSymbols.map(sym => this.state.coinList[sym].CoinName);
    let allStringsToSearch = coinSymbols.concat(coinNames);

    let fuzzyResults = fuzzy
      .filter(inputValue, allStringsToSearch, {})
      .map(result => result.string);
    console.log(fuzzyResults);
    let filterdCoins = _.pickBy(this.state.coinList, (result, symKey) => {
      let coinName = result.CoinName;
      return (
        _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
      );
    });
    this.setState({ filterdCoins });
  }, 500);
  filterCoins = e => {
    console.log(e.target.value);
    let inputValue = _.get(e, "target.value");
    if (!inputValue) {
      this.setState({
        filterdCoins: ""
      });
      return;
    }
    this.handleFilter(inputValue);
  };
  render() {
    return (
      <AppLayout>
        {AppBar.call(this)}
        {this.loadingContent() || (
          <Content>
            {this.displayingSettings() && this.settingsContent()}
            {this.displayingDashboard() && Dashboard.call(this)}
          </Content>
        )}
      </AppLayout>
    );
  }
}

export default App;
