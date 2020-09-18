import React from "react";
import { TestComponentProps } from "./TestComponent.types";

export default class Canvas extends React.Component<TestComponentProps> {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
          <svg width="900" height="900" version="1.1" shapeRendering="geometricPrecision">
            <g>
              <path fill= "none" 
                    stroke="transparent" 
                    strokeWidth="7"
                    //d="M10 ,550 Q 400 -20, 390 150 T 100 650" 
                    d="M 10 10 H 90 V 250 H 10 Z"
                    //vectorEffect="non-scaling-stroke"
                    className="path_outline">
              </path>
              <path fill= "none" 
                    stroke="#000000" 
                    strokeWidth="2" 
                    //d="M10 ,550 Q 400 -20, 390 150 T 100 650"
                    d="M 10 10 H 90 V 250 H 10 Z"
                    //vectorEffect="non-scaling-stroke"
                    className="path_inline">
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
      )
    }
  }