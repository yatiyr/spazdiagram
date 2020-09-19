import React from "react";
import ReactDOM from "react-dom";

import { TestComponentProps } from "./TestComponent.types";

interface State {

}
export default class Canvas extends React.Component<TestComponentProps> {

  public node: Element | Text;

  constructor(props) {
    super(props);
  }

  preventDefault(event: Event) {
    event.preventDefault();
    
  }


  handleZoom(event: WheelEvent) {
    event.preventDefault();
    console.log(event.deltaY);
  }


  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.node.addEventListener("contextmenu", this.preventDefault);
    this.node.addEventListener("wheel",this.handleZoom);
  }

  componentWillUnmount() {
    this.node.removeEventListener("contextmenu", this.preventDefault)
  }
  
  render() {
    return(

      <div className="diagramWrapper">
        <svg width="200" height="200" version="1.1" shapeRendering="geometricPrecision">
          <g transform="scale(1.5) translate(30,30)">
            <path fill= "none" 
              stroke="transparent" 
              strokeWidth="7"
              //d="M10 ,550 Q 400 -20, 390 150 T 100 650" 
              d="M 10 10 H 90 V 250 H 10 Z"
              //vectorEffect="non-scaling-stroke"
              className="path_outline"
              shapeRendering="crispEdges">
            </path>
            <path fill= "none" 
              stroke="#000000" 
              strokeWidth="2" 
              //d="M10 ,550 Q 400 -20, 390 150 T 100 650"
              d="M 10 10 H 90 V 250 H 10 Z"
              //vectorEffect="non-scaling-stroke"
              className="path_inline"
              shapeRendering="crispEdges">
            </path>
            <path fill= "none" 
              stroke="#000" 
              strokeWidth="2"
              //d="M10 ,550 Q 400 -20, 390 150 T 100 650" 
              d="M 110 10 L 140 10 L 140 30 L 110 30 Z" 
              className="path_inline"
              transform="translate(200,20)">
            </path>
            <circle cx="1000" 
              cy="1000" 
              r="40" 
              stroke="#000" 
              strokeWidth="2"
              className="path_inline"
              fill="none"/>
          </g>
        </svg>
      </div>

      )
    }
  }