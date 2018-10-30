import styled, { css } from "styled-components";
import React from "react";
import {
  subtleBoxShadow,
  lightBlueBackground,
  greenBoxShadow,
  redBoxShadow
} from "./Style";
const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
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

export default function(favorites = false) {
  const coinData = this.state.coinList;
  let coinKeys = favorites
    ? this.state.favorites
    : Object.keys(this.state.coinList).slice(0, 100);
  return (
    <CoinGrid>
      {coinKeys.map(coin => (
        <CoinTitle key={coin} favorite={favorites}>
          <CoinHeaderGrid>
            <div>{coinData[coin].CoinName}</div>
            <CoinSymbol>{coinData[coin].Symbol}</CoinSymbol>
          </CoinHeaderGrid>
          <div>
            <img
              style={{ height: "50px" }}
              src={`http://cryptocompare.com/${coinData[coin].ImageUrl}`}
            />
          </div>
        </CoinTitle>
      ))}
    </CoinGrid>
  );
}
