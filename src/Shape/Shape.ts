import Point from '../Utils/Point';

export default class Shape {
    public centerOfMass: Point;
    constructor() {}    

    public getPosition(): Point {
        return this.centerOfMass;
    }

    public setPosition(pos: Point) {
        this.centerOfMass.x = pos.x;
        this.centerOfMass.y = pos.y;
    }
}