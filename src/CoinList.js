import styled from "styled-components";
import React from "react";
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow } from "./Style";
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
`;

const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CoinSymbol = styled.div`
  justify-self: right;
`;

export default function() {
  const coinData = this.state.coinList;
  return (
    <CoinGrid>
      {Object.keys(coinData)
        .slice(0, 10)
        .map(coin => (
          <CoinTitle key={coin}>
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
