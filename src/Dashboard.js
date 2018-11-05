import React from "react";
import { CoinGrid, CoinTitle, CoinHeaderGrid, CoinSymbol } from "./CoinList";
import styled, { css } from "styled-components";
import { fontSizeBig, fontSize3 } from "./Style";

const numberFormat = number => {
  return +(number + "").slice(0, 7);
};

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `};
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const CoinTitleCompact = styled(CoinTitle)`
  ${fontSize3};
  display: grid;
  grid-gap: 5px;
  grid-template-colmns: repeat(3, 1fr);
`;

export default function() {
  return (
    <CoinGrid>
      {this.state.prices.map((price, index) => {
        let sym = Object.keys(price)[0];
        let data = price[sym]["USD"];

        return index < 5 ? (
          <CoinTitle>
            <CoinHeaderGrid>
              <div>{sym}</div>
              <CoinSymbol>
                <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                  {numberFormat(data.CHANGEPCT24HOUR)}%
                </ChangePct>
              </CoinSymbol>
            </CoinHeaderGrid>
            <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
          </CoinTitle>
        ) : (
          <CoinTitleCompact>
            <div>{sym}</div>
            <CoinSymbol>
              <ChangePct red={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}%
              </ChangePct>
            </CoinSymbol>
            <div>${numberFormat(data.PRICE)}</div>
          </CoinTitleCompact>
        );
      })}
    </CoinGrid>
  );
}