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

export default Comp;