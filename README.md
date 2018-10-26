## React Data visualization

## yarn

- yarn start

## 必要なライブラリ

- yarn add styled-components

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

## Google font

- https://fonts.google.com/?query=Do+h&selection.family=Do+Hyeon
- font-family: 'Do Hyeon', sans-serif;
