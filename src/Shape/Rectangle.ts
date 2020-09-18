import ConvexHull from './ConvexHull';
import Point from '../Utils/Point';

export default class Rectangle extends ConvexHull {

    public height: number;
    public width: number;

    constructor(height: number, width: number) {
        let p1 = new Point(0,height);
        let p2 = new Point(0,0);
        let p3 = new Point(width, 0);
        let p4 = new Point(width,height);
        let points = [p1,p2,p3,p4];
        super(points);
        
        this.height = height;
        this.width = width;
    }



}