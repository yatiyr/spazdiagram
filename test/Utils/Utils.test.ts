import Point from '../../src/Utils/Point';
import Matrix from '../../src/Utils/Matrix';


function isValEqual(matrix: Matrix,val: number[][]) {
    if(matrix.colCount !== val[0].length || matrix.rowCount !== val.length ) {
        return false;
    }

    for(let i=0;i<matrix.rowCount;i++) {
        for(let j=0;j<matrix.colCount;j++) {
            if(val[i][j] !== matrix.val[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function isPointEqual(p: Point, x: number, y: number) {
    if(p.x === x && p.y === y) { return true;}
    return false;
}

describe("Matrix Tests", () => {

    test("Matrix construction" , () => {
        const input = [[2,5.1232,1.7],
                       [6,2.5553,  1],
                       [1,123.97,  5]];

        let matrix = new Matrix(3,3);
        matrix.setVal(input);

        expect(isValEqual(matrix,input)).toEqual(true);
        

    });

    test("Identity Matrix", () => {
        const input = [[1,0,0],
                       [0,1,0],
                       [0,0,1]];

        let m = Matrix.giveIdentityMatrix();

        expect(isValEqual(m,input)).toEqual(true);

    });

    test("Translation Matrix", () => {
        const input = [[1,0,5.32],
                       [0,1,4.54],
                       [0, 0,  1]];

        let val = {x: 5.32, y: 4.54};

        let m = Matrix.giveTranslationMatrix(val.x, val.y);

        expect(isValEqual(m,input)).toEqual(true);

    });

    test("Rotation Matrix", () => {
        const degree = 30 * (Math.PI/180);

        const input = [[Math.cos(degree), -Math.sin(degree), 0],
                       [Math.sin(degree),  Math.cos(degree), 0],
                       [0,                 0,                1]]

        let m = Matrix.giveRotationMatrix(30);

        expect(isValEqual(m,input)).toEqual(true);

    });

    test("Set Val", () => {
        const input = [[1,2,5],
                       [6,5,2],
                       [0,1,0]];
        let m = new Matrix(3,3);

        m.setVal(input);

        expect(isValEqual(m,input)).toEqual(true);
    });

    test("Set Matrix", () => {
        const input = [[1,5,2],
                       [6,1,2],
                       [9,3,7]];
        let m = new Matrix(3,3);
        m.setVal(input);

        let m2 = new Matrix(3,3);
        m2.setMatrix(m);

        expect(m2.isEqual(m)).toEqual(true);
        
    });

    test("Matrix add", () => {

        const input =  [[5,2,1],
                        [3,7,2],
                        [9,6,0]];

        const input2 = [[2,5,6],
                        [7,2,7],
                        [0,2,6]];

        const addedval = [[7 ,7,7],
                          [10,9,9],
                          [9, 8,6]];

        let m1 = new Matrix(3,3);
        let m2 = new Matrix(3,3);
        m1.setVal(input);
        m2.setVal(input2);
        let m3 = m1.add(m2);

        expect(isValEqual(m3,addedval)).toEqual(true);



    });

    test("Matrix product", () => {
        const input =  [[1,5,3],
                        [5,7,8],
                        [1,2,2]];

        const input2 = [[6,7,9],
                        [2,2,6],
                        [2,1,8]];

        const prodval =  [[22,20, 63],
                          [60,57,151],
                          [14,13,37]];
        
        let m1 = new Matrix(3,3);
        let m2 = new Matrix(3,3);
        m1.setVal(input);
        m2.setVal(input2);
        let m3 = m1.prod(m2);
        
        expect(isValEqual(m3,prodval)).toEqual(true);
        
    });

});


describe("Point Tests", () => {

    test("Point Constructor", () => {
        let point = new Point(12321.4,1263278.021);
        expect(isPointEqual(point,12321.4,1263278.021)).toEqual(true);
    });

    test("Point Translate", () => {
        let point = new Point(123,542);
        point.translate(5,-9);
        expect(isPointEqual(point,128,533)).toEqual(true);
    });

    test("Set Point", () => {
        let point = new Point(1231,5642);
        let point2 = new Point(0,0);
        point2.setPoint(point);

        expect(isPointEqual(point,point2.x,point2.y)).toEqual(true);
    });

    test("Point Scale", () => {
        let point = new Point(21,62);
        point.scale(4);

        expect(isPointEqual(point,84,248)).toEqual(true);
    });

    test("Point symWRTOrigin", () => {
        let point  = new Point(2,5);
        let point2 = point.symWRTOrigin();

        expect(isPointEqual(point2,-2,-5)).toEqual(true);

    });

    test("Point rotate", () => {
        let point = new Point(1,1);
        let origin = new Point(1,0);
        point.rotate(origin, 90);

        expect(isPointEqual(point,0,0)).toEqual(true);
    });




});