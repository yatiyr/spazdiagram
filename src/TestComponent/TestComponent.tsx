import React from "react";
import Canvas from "./Canvas";
import ReactDOM from "react-dom";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.scss";

class Comp extends React.Component<TestComponentProps> {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="test-component">
        <Canvas theme="primary"/>
      </div>
    )
  }
}

const TestComponent: React.FC<TestComponentProps> = ({ theme }) => (
  <div
    data-testid="test-component"
    className={`test-component test-component-${theme}`}
  >
    <h1 className="heading">I'm the test component</h1>
    <h2>Made with love by Harvey</h2>
  </div>
);

export default Comp;