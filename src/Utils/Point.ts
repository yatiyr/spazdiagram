

class Matrix {

    public rowCount: number;
    public colCount: number;
    public val : number[][];

    /**
     * Fills array with zeros
     * @param rowCount 
     * @param colCount 
     */
    constructor(rowCount: number, colCount: number) {
        this.val = new Array<Array<number>>();

        this.rowCount = rowCount;
        this.colCount = colCount;

        for(let i = 0; i< rowCount ; i++) {
            let row:number[] = new Array<number>();
            for(let j = 0; j<colCount; j++) {
                row.push(0);
            }
            this.val.push(row);
        }
    }

    static giveTranslationMatrix(p: Point): Matrix {

        let result = new Matrix(3,3);
        let val = [[1,0,p.x],
                   [0,1,p.y],
                   [0,0, 1]];

        result.setVal(val);
        return result;
    }

    static giveRotationMatrix(degree: number): Matrix {
        let result = new Matrix(3,3);
        let degToRadians = degree * (Math.PI/180);
     

        let val = [[Math.cos(degToRadians), -Math.sin(degToRadians), 0],
                   [Math.sin(degToRadians),  Math.cos(degToRadians), 0],
                   [0,                       0,                      1]]

        result.setVal(val);
        return result;
    }

    public setMatrix(matrix: Matrix) {

        let val = new Array<Array<number>>();

        for(let i=0; i<matrix.rowCount; i++) {
            let row = new Array<number>();

            for(let j=0; j<matrix.colCount; j++) {
                row.push(matrix.val[i][j]);
            }

            val.push(row);
        }

        this.val = val;
        this.colCount = matrix.colCount;
        this.rowCount = matrix.rowCount;
    }

    public setVal(newval: number[][]) {

        let val = new Array<Array<number>>();
        let rowCount = newval.length;
        let colCount = newval[0].length;

        for(let i=0; i<rowCount; i++) {
            let row = new Array<number>();

            for(let j=0; j<colCount; j++) {
                row.push(newval[i][j]);
            }

            val.push(row);
        }

        this.val = val;
        this.rowCount = rowCount;
        this.colCount = colCount;
    }


    public prod(matrix: Matrix): Matrix{

        let val = new Array<Array<number>>();

        for(let i=0; i<this.rowCount; i++) {
            let row = new Array<number>();
            for(let j=0; j<matrix.colCount; j++) {
                let sum = 0;
                for(let k=0; k<this.colCount; k++) {
                    sum += this.val[i][k]*matrix.val[k][j];
                }

                row.push(sum);
            }
            val.push(row);
        }

        let result = new Matrix(matrix.rowCount, matrix.colCount);
        result.setVal(val);

        return result;
    }
}

export class Point {

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

    public symToOrigin(): Point {
        let p = new Point(-this.x, -this.y);
        return p;
    }

    public rotate(origin: Point, degree: number) {
        
        let t1 = Matrix.giveTranslationMatrix(origin);
        let rot = Matrix.giveRotationMatrix(degree);
        let t2 = Matrix.giveTranslationMatrix(origin.symToOrigin());

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

}