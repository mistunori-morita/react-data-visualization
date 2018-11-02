import styled, { css } from "styled-components";
import React from "react";
import {
  subtleBoxShadow,
  lightBlueBackground,
  greenBoxShadow,
  redBoxShadow
} from "./Style";

import _ from "lodash";

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  ${props =>
    props.count &&
    css`
      grid-template-columns: repeat(${props.count > 5 ? props.count : 5}, 1fr);
    `} grid-gap: 15px;
  margin-top: 40px;
`;

const CoinTitle = styled.div`
  ${subtleBoxShadow};
  ${lightBlueBackground};
  border: 1px solid #fff;
  padding: 10px;
  &:hover {
    cursor: pointer;
    ${greenBoxShadow};
  }
  ${props =>
    props.favorite &&
    css`
      &:hover {
        cursor: pointer;
        ${redBoxShadow};
      }
    `};
  ${props =>
    props.chosen &&
    !props.favorite &&
    css`
      pointer-events: none;
      opacity: 0.4;
    `};
`;

const FavoritedCoin = styled(CoinTitle)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow};
  }
`;

const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinSymbol = styled.div`
  justify-self: right;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${CoinTitle}:hover & {
    color: red;
    display: block;
  }
`;

export default function(favorites = false) {
  console.log(this.state);
  const coinData = this.state.coinList;
  let coinKeys = favorites
    ? this.state.favorites
    : (this.state.filterdCoins && Object.keys(this.state.filterdCoins)) ||
      Object.keys(this.state.coinList).slice(0, 100);
  return (
    <CoinGrid count={favorites && this.state.favorites.length}>
      {coinKeys.map(coinKey => (
        <CoinTitle
          chosen={this.isInFavorites(coinKey)}
          key={coinKey}
          favorite={favorites}
          onClick={
            favorites
              ? () => {
                  this.removeCoinFromFavorites(coinKey);
                }
              : () => {
                  this.addCoinToFavorites(coinKey);
                }
          }
        >
          <CoinHeaderGrid>
            <div>{coinData[coinKey].CoinName}</div>
            {favorites ? (
              <DeleteIcon>X</DeleteIcon>
            ) : (
              <CoinSymbol>{coinData[coinKey].Symbol}</CoinSymbol>
            )}
          </CoinHeaderGrid>
          <div>
            <img
              style={{ height: "50px" }}
              src={`http://cryptocompare.com/${coinData[coinKey].ImageUrl}`}
            />
          </div>
        </CoinTitle>
      ))}
    </CoinGrid>
  );
}
