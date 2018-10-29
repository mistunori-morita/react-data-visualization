## React Data visualization

## yarn

- yarn start

## 必要なライブラリ

- yarn add styled-components
- yarn add cryptocompare (coin の api)

## ショートカット

- imsc import styled from 'styled-components';
- sc const ${1} = styled.${2} / Styled-Component
- exsc export const ${1} = styled.${2} / Export styled-component

## styledComponent extends

- https://www.styled-components.com/docs/basics#extending-styles

```js
// import
import styled from "styled-components";

const CustomElement = styled.div`
  color: green;
  font-size: 30px;
`;

//継承ドキュメントみたら変わってた
const Blue = styled(CustomElement)`
  color: blue;
`;
```

## styledComponent で演算

```js
import styled, { css } from "styled-components";

//props.active active={this.displayingDashboard()}ここの条件が実行されたら${props=>}が走る
const ControlButton = styled.div`
  color: red;
  ${props =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
      colore: blue;
    `};
`;

class App extends Component {
  state = {
    page: "dashboard"
  };

  //stateのpageがdashboardであれば[ControlButton]が実行される
  displayingDashboard = () => this.state.page === "dashboard";

  render() {
    return (
      <AppLayout>
        <Bar>
          <Logo>CryptoDash</Logo>
          <div />
          //activeで関数が実行↑
          <ControlButton active={this.displayingDashboard()}>
            Dashboard
      //抜粋
```

## Google font

- https://fonts.google.com/?query=Do+h&selection.family=Do+Hyeon
- font-family: 'Do Hyeon', sans-serif;
