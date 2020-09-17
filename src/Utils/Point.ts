import Matrix from './Matrix';

export default class Point {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public translate(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    public setPoint(p : Point) {
        this.x = p.x;
        this.y = p.y;
    }

    public scale(val : number) {
        this.x *= val;
        this.y *= val;
    }

    public symWRTOrigin(): Point {
        let p = new Point(-this.x, -this.y);
        return p;
    }

    public rotate(origin: Point, degree: number) {
        
        let t1 = Matrix.giveTranslationMatrix(origin.x, origin.y);
        let rot = Matrix.giveRotationMatrix(degree);
        let t2 = Matrix.giveTranslationMatrix(-origin.x, -origin.y);

        let r1 = t1.prod(rot);
        let r2 = r1.prod(t2);

        let val = [[this.x],
                   [this.y],
                   [  1  ]];

        let pointMatrix = new Matrix(3,1);
        pointMatrix.setVal(val);
        let newPointMatrix = r2.prod(pointMatrix);

        this.x = parseFloat(newPointMatrix.val[0][0].toFixed(2));
        this.y = parseFloat(newPointMatrix.val[1][0].toFixed(2));
     

    }

    static giveMidpoint(pointList : Point[]): Point {
        let result = new Point(0,0);

       pointList.forEach(point => {
            result.x += point.x;
            result.y += point.y;           
       });

       result.x /= pointList.length;
       result.y /= pointList.length;

       return result;

    }

}