export default class Matrix {

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

    static giveIdentityMatrix(): Matrix {
        let result = new Matrix(3,3);
        let val = [[1,0,0],
                   [0,1,0],
                   [0,0,1]];

        result.setVal(val);
        return result;
    }

    static giveTranslationMatrix(x:number, y:number): Matrix {

        let result = new Matrix(3,3);
        let val = [[1,0,x],
                   [0,1,y],
                   [0,0,1]];

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

    public isEqual(matrix: Matrix) : boolean {

        if(this.colCount !== matrix.colCount || this.rowCount !== matrix.rowCount) {
            return false;
        }

        for(let i=0;i<this.rowCount;i++) {
            for(let j=0;j<this.colCount;j++) {
                if(this.val[i][j] !== matrix.val[i][j]) {
                    return false;
                }
            }
        }

        return true;

    }

    public add(matrix: Matrix): Matrix {

        let result = new Matrix(matrix.rowCount,matrix.colCount);

        if(this.colCount !== matrix.colCount || this.rowCount !== matrix.rowCount) {
            return;
        }

        for(let i=0;i<this.rowCount;i++) {
            for(let j=0;j<this.colCount;j++) {
                result.val[i][j] = this.val[i][j] + matrix.val[i][j];
            }
        }

        return result;

    }

}