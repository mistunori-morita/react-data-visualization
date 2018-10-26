import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
const CustomElement = styled.div`
  color: green;
  font-size: 30px;
`;

const Blue = styled(CustomElement)`
  color: blue;
`;

class App extends Component {
  render() {
    return (
      <div>
        <CustomElement>hello</CustomElement>
        <Blue>aa</Blue>
      </div>
    );
  }
}

export default App;
