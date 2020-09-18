import Point from '../Utils/Point';
import Shape from './Shape';

export default class ConvexHull extends Shape {

    public points: Point[];

    constructor(points: Point[]) {
        super();
        this.points = [];
        
        points.forEach(point => {
            let p = new Point(point.x,point.y);
            this.points.push(p);
        });

        this.centerOfMass = Point.giveMidpoint(points);
    }

    public setPosition(pos: Point) {

        // Values needed for translation of shape's point
        let xdif = pos.x - this.centerOfMass.x;
        let ydif = pos.y - this.centerOfMass.y;

        this.centerOfMass.x = pos.x;
        this.centerOfMass.y = pos.y;

        this.points.forEach(point => {
            point.x += xdif;
            point.y += ydif;
        });

    }

    public translate(vec: Point) {

        this.points.forEach(point => {
            point.x += vec.x;
            point.y += vec.y;
        });

        this.centerOfMass.x += vec.x;
        this.centerOfMass.y += vec.y;


    }

    public getBoundedRectangle(): Point[] {

        let minx = Math.min(...this.points.map(o=>o.x));
        let miny = Math.min(...this.points.map(o=>o.y));

        let maxx = Math.max(...this.points.map(o=>o.x));
        let maxy = Math.max(...this.points.map(o=>o.y));


        let bottomleft  = new Point(minx,miny);
        let bottomright = new Point(maxx,miny);
        let topleft     = new Point(minx,maxy);
        let topright    = new Point(maxx,maxy);

        return [bottomleft,bottomright,topleft,topright];
    }

    public getSVGPath(): string {
        let result = "";

        for(let i=0;i<this.points.length;i++) {

            if(i === 0) {
                result += `M ${this.points[i].x} ${this.points[i].y} `;
            }
            else if( i === this.points.length-1) {
                result += `L ${this.points[i].x} ${this.points[i].y} Z`;
            }
            else {
                result += `L ${this.points[i].x} ${this.points[i].y} `;
            }
        }
        return result;
    }

    public isPointInside(p: Point): boolean {

        for(let i=0;i<this.points.length-1;i++) {
            
            let d = (this.points[i+1].x - this.points[i].x)*(p.y - this.points[i].y) -
                    (this.points[i+1].y - this.points[i].y)*(p.x - this.points[i].x);

            if(d > 0) {
                return false;
            }
        }

        return true;
    }

    public isShapeInside(shape: Shape): boolean {

        if(shape instanceof ConvexHull) {
            for(let i=0;i<shape.points.length;i++) {
                if(this.isPointInside(shape.points[i]) === false) {
                    return false;
                }
            }
        }

        return true;
    }
}