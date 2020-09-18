import AbstractShape from './Shape';
import Point from '../Utils/Point';


export default class Circle extends AbstractShape {

    public radius: number;

    constructor(radius: number) {
        super();
    }

    public setPosition(pos: Point) {
        this.centerOfMass.x = pos.x;
        this.centerOfMass.y = pos.y;
    }

}