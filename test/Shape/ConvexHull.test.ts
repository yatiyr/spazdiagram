import Point from '../../src/Utils/Point';
import Matrix from '../../src/Utils/Matrix';
import ConvexHull from '../../src/Shape/ConvexHull';

function arePointsEqual(arr1: Point[], arr2: Point[]) {

    if(arr1.length !== arr2.length) {
        return false;
    }

    for(let i=0;i<arr1.length;i++) {
        if(arr1[i].x !== arr2[i].x || arr1[i].y !== arr2[i].y) {
            return false;
        }
    }

    return true;
}


describe("ConvexHull Tests", () => {

    test("ConvexHull construction", () => {

        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);

        let arr = [point1,point2,point3,point4,point5,point6,point7,point8];

        let convexHull = new ConvexHull(arr);
        
        expect(convexHull.centerOfMass.x === 0 && 
               convexHull.centerOfMass.y === 0 &&
               arePointsEqual(arr,convexHull.points)).toEqual(true);
    });


    test("ConvexHull setPosition", () => {
        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);

        let tpoint1 = new Point(1,2);
        let tpoint2 = new Point(2,2);
        let tpoint3 = new Point(2,1);
        let tpoint4 = new Point(2,0);
        let tpoint5 = new Point(1,0);
        let tpoint6 = new Point(0,0);
        let tpoint7 = new Point(0,1);
        let tpoint8 = new Point(0,2);

        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];
        let arr2 = [tpoint1,tpoint2,tpoint3,tpoint4,tpoint5,tpoint6,tpoint7,tpoint8];

        let convexHull = new ConvexHull(arr);

        convexHull.setPosition(new Point(1,1));

        expect(convexHull.centerOfMass.x === 1 && 
            convexHull.centerOfMass.y === 1 &&
            arePointsEqual(arr2,convexHull.points)).toEqual(true);

    });

    test("ConvexHull translate", () => {
        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);

        let tpoint1 = new Point(1,2);
        let tpoint2 = new Point(2,2);
        let tpoint3 = new Point(2,1);
        let tpoint4 = new Point(2,0);
        let tpoint5 = new Point(1,0);
        let tpoint6 = new Point(0,0);
        let tpoint7 = new Point(0,1);
        let tpoint8 = new Point(0,2);

        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];
        let arr2 = [tpoint1,tpoint2,tpoint3,tpoint4,tpoint5,tpoint6,tpoint7,tpoint8];

        let convexHull = new ConvexHull(arr);

        convexHull.translate(new Point(1,1));

        expect(convexHull.centerOfMass.x === 1 && 
            convexHull.centerOfMass.y === 1 &&
            arePointsEqual(arr2,convexHull.points)).toEqual(true);

    });

    test("ConvexHull getBoundedRectangle", () => {
        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);


        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];
        
        let boundedRectangle = [new Point(-1,-1), new Point(1,-1), new Point(-1,1), new Point(1,1)];


        let convexHull = new ConvexHull(arr);

        expect(arePointsEqual(convexHull.getBoundedRectangle(),boundedRectangle)).toEqual(true);

    });


    test("ConvexHull getSVGPath", () => {

        let svgPath = "M 0 1 L 1 1 L 1 0 L 1 -1 L 0 -1 L -1 -1 L -1 0 L -1 1 Z";

        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);


        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];

        let convexHull = new ConvexHull(arr);

        expect(svgPath === convexHull.getSVGPath()).toEqual(true);



    });

    test("ConvexHull isPointInside", () => {

        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);


        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];

        let convexHull = new ConvexHull(arr);

        let testPoint1 = new Point(0,1);
        let testPoint2 = new Point(-12,-13);
        let testPoint3 = new Point(100,0);
        let testPoint4 = new Point(0,100);
        let testPoint5 = new Point(0,0);
        let testPoint6 = new Point(123,321);
        let testPoint7 = new Point(0.5,0.7);

        expect(convexHull.isPointInside(testPoint1)).toEqual(true);
        expect(convexHull.isPointInside(testPoint2)).toEqual(false);
        expect(convexHull.isPointInside(testPoint3)).toEqual(false);
        expect(convexHull.isPointInside(testPoint4)).toEqual(false);
        expect(convexHull.isPointInside(testPoint5)).toEqual(true);
        expect(convexHull.isPointInside(testPoint6)).toEqual(false);
        expect(convexHull.isPointInside(testPoint7)).toEqual(true);

    });

    test("ConvexHull isShapeInside", () => {

        let point1 = new Point(0,1);
        let point2 = new Point(1,1);
        let point3 = new Point(1,0);
        let point4 = new Point(1,-1);
        let point5 = new Point(0,-1);
        let point6 = new Point(-1,-1);
        let point7 = new Point(-1,0);
        let point8 = new Point(-1,1);


        let arr  = [point1,point2,point3,point4,point5,point6,point7,point8];

        let convexHull = new ConvexHull(arr);

        let tpoint1 = new Point(0,1);
        let tpoint2 = new Point(1,1);
        let tpoint3 = new Point(1,0);
        let tpoint4 = new Point(1,-1);
        let tpoint5 = new Point(0,-1);
        let tpoint6 = new Point(-1,-123);
        let tpoint7 = new Point(-1,0);
        let tpoint8 = new Point(-1,1);


        let tarr  = [tpoint1,tpoint2,tpoint3,tpoint4,tpoint5,tpoint6,tpoint7,tpoint8];

        let tconvexHull = new ConvexHull(tarr);

        let t2point1 = new Point(0,1);
        let t2point2 = new Point(1,1);
        let t2point3 = new Point(1,0);
        let t2point4 = new Point(.7,-1);
        let t2point5 = new Point(0,-1);
        let t2point6 = new Point(-1,-.5);
        let t2point7 = new Point(-1,0);
        let t2point8 = new Point(-1,1);


        let t2arr  = [t2point1,t2point2,t2point3,t2point4,t2point5,t2point6,t2point7,t2point8];

        let t2convexHull = new ConvexHull(t2arr);


        expect(convexHull.isShapeInside(tconvexHull)).toEqual(false);
        expect(convexHull.isShapeInside(t2convexHull)).toEqual(true);

    });


});