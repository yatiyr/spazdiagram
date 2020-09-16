import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.scss";

class Comp extends React.Component<TestComponentProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="test-component">
        <svg height="10px" width="10px" version="1.1">
          <path fill= "none" 
                stroke="transparent" 
                strokeWidth="25" 
                //d="M10 ,550 Q 400 -20, 390 150 T 100 650" 
                d="M 10 10 H 90 V 250 H 10 Z"
                className="path_outline">
          </path>
          <path fill= "none" 
                stroke="#000000" 
                strokeWidth="2" 
                //d="M10 ,550 Q 400 -20, 390 150 T 100 650"
                d="M 10 10 H 90 V 250 H 10 Z"
                className="path_inline">
          </path>
        </svg>
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