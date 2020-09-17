import Point from '../Utils/Point';

export default class ConvexHull {

    public points: Point[];
    public centerOfMass: Point;

    constructor(points: Point[]) {
        
        points.forEach(point => {
            let p = new Point(point.x,point.y);
            this.points.push(p);
        });

        this.centerOfMass = Point.giveMidpoint(points);
    }

    public getPosition(): Point {
        return this.centerOfMass;
    }

    public setPosition(pos: Point) {

        // Values needed for translation of shape's point
        let xdif = pos.x - this.centerOfMass.x;
        let ydif = pos.y - this.centerOfMass.y;

        this.points.forEach(point => {
            point.x += xdif;
            point.y += ydif;
        });

        this.centerOfMass.x = pos.x;
        this.centerOfMass.y = pos.y;

    }

    public translate(vec: Point) {

        this.points.forEach(point => {
            
        });
    }

    public getSVGPath(): string {
        let result = "";

        for(let i=0;i<this.points.length;i++) {

            if(i === 1) {
                result += `M ${this.points[i].x} ${this.points[i].y} `;
            }
            else if( i === this.points.length-1) {
                result += `L ${this.points[i].x} ${this.points[i].y} Z`;
            }

            result += `L ${this.points[i].x} ${this.points[i].y} `;
        }


        return result;

    }
}