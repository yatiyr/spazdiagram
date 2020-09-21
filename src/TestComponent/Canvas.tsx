import React from "react";
import ReactDOM from "react-dom";

import { TestComponentProps } from "./TestComponent.types";
import Point from "../Utils/Point";

interface State {
  dragging: boolean;
  selecting: boolean;
  clickPoint: Point;
  upperLeftPoint: Point;
  zoomLevel: number;
};

export default class Canvas extends React.Component<TestComponentProps,State> {

  public node: Element | Text;

  public zoom: {
    value: number;
    max: number;
    step: number;
    isStopped: boolean;
  }

  constructor(props) {
    super(props);


    this.state = {
      zoomLevel: 100,
      dragging: false,
      selecting: false,
      clickPoint: new Point(0,0),
      upperLeftPoint: new Point(0,0)
    }

    this.zoom = {
      value: 0,
      max: 100,
      step: 5,
      isStopped: true
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.dragOnMouseUp = this.dragOnMouseUp.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.dragOnMouseUp = this.dragOnMouseUp.bind(this);
    this.dragOnMouseMove = this.dragOnMouseMove.bind(this);
    this.clearZoom = this.clearZoom.bind(this);


  }

  preventDefault(event: Event) {
    event.preventDefault();
    
  }

  clearZoom() {
    this.zoom.value = 1;
  }

  handleZoom(event: WheelEvent) {

    event.preventDefault();
    let scaleFactor = this.state.zoomLevel/100;
    let newScaleFactor: number;

    if((event.deltaY < 0 && this.state.zoomLevel <= 300)) {
      this.zoom.value = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
      newScaleFactor = (this.state.zoomLevel + this.zoom.value)/100;

      let estimatedNewClientX = (((event.offsetX)*newScaleFactor)/scaleFactor - event.offsetX)/scaleFactor;
      let estimatedNewClientY = (((event.offsetY)*newScaleFactor)/scaleFactor - event.offsetY)/scaleFactor;

      let newPointX = this.state.upperLeftPoint.x - estimatedNewClientX;
      let newPointY = this.state.upperLeftPoint.y - estimatedNewClientY;


      let newPoint = new Point(newPointX,newPointY);

      console.log(newPoint);
      this.setState({upperLeftPoint: newPoint, zoomLevel: this.state.zoomLevel + this.zoom.value});                               
    }
    else if(event.deltaY > 0 && this.state.zoomLevel >= 50) {
      this.zoom.value = this.zoom.value >= this.zoom.max ? this.zoom.max : this.zoom.value + this.zoom.step;
      newScaleFactor = (this.state.zoomLevel - this.zoom.value)/100;

      let estimatedNewClientX = (((event.offsetX)*newScaleFactor)/scaleFactor - event.offsetX)/scaleFactor;
      let estimatedNewClientY = (((event.offsetY)*newScaleFactor)/scaleFactor - event.offsetY)/scaleFactor;

      let newPointX = this.state.upperLeftPoint.x - estimatedNewClientX;
      let newPointY = this.state.upperLeftPoint.y - estimatedNewClientY;

      let newPoint = new Point(newPointX,newPointY);

      console.log(newPoint);
      this.setState({upperLeftPoint: newPoint, zoomLevel: this.state.zoomLevel - this.zoom.value}); 
    }

    setTimeout(this.clearZoom, 10)
  }

  handleClick(event: MouseEvent) {
    console.log(event.button);
  }
  
  handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    // If left click happened
    if(event.button === 0) {
      this.setState({selecting: true, clickPoint: new Point(event.offsetX,event.offsetY)});
    }
    // If middle click happened
    else if(event.button === 1) {
      this.setState({dragging: true, clickPoint: new Point(event.offsetX,event.offsetY)});
    }
    // If right click happened
    else if(event.button === 2) {
      console.log("right clicked!") // TODO: IMPLEMENT LATER
    }
  }

  dragOnMouseMove(event: MouseEvent) {
    event.preventDefault();
    let zoomFactor = parseFloat((1/(this.state.zoomLevel/100)).toFixed(2))
    let diagramDragSpeed = new Point(1,1);

    diagramDragSpeed.x *= zoomFactor;
    diagramDragSpeed.y *= zoomFactor;

    console.log(diagramDragSpeed.x, ' ', diagramDragSpeed.y);

    let newPoint = new Point(this.state.upperLeftPoint.x + event.movementX*diagramDragSpeed.x, 
                             this.state.upperLeftPoint.y + event.movementY*diagramDragSpeed.y);
    
    //newPoint.x *= zoomFactor;
    //newPoint.y *= zoomFactor;


    this.setState({upperLeftPoint: newPoint});

    if(!this.node.contains(event.target as Node)) {
      console.log("dragFinished");
      this.setState({dragging: false});
    }
  }

  dragOnMouseUp(event: MouseEvent) {
    console.log("dragFinished");
    this.setState({dragging: false});
  }

  componentDidUpdate(props,state) {
    if(this.state.dragging && !state.dragging) {
      window.addEventListener('mousemove', this.dragOnMouseMove);
      window.addEventListener('mouseup', this.dragOnMouseUp);
    }
    else if(!this.state.dragging && state.dragging) {
      window.removeEventListener('mousemove', this.dragOnMouseMove);
      window.removeEventListener('mouseup', this.dragOnMouseUp);
    }
    else if(this.state.selecting && !state.selecting) {

    }
    else if(!this.state.selecting && state.selecting) {

    }
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.node.addEventListener("contextmenu", this.preventDefault);
    this.node.addEventListener("wheel",this.handleZoom);
    this.node.addEventListener("mousedown",this.handleMouseDown);
  }

  componentWillUnmount() {
    this.node.removeEventListener("contextmenu", this.preventDefault);
    this.node.removeEventListener("wheel",this.handleZoom);
    this.node.removeEventListener("mousedown",this.handleClick);
  }
  
  render() {
    return(

      <div className="diagramWrapper">
        <svg width="100%" height="100%" version="1.1" shapeRendering="geometricPrecision">
          <g transform={`scale(${this.state.zoomLevel/100}) translate(${this.state.upperLeftPoint.x},${this.state.upperLeftPoint.y})`}>
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
          </g>
        </svg>
      </div>

      )
    }
  }