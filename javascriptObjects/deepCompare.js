/* Andrew Brown
comparing objects in javascript
10/13/2015
 */


var a = { foo: 2 };
var b = { foo: 5 };
var c = a;
var d = { foo: 2 };

Object.deepCompare = function (obj1, obj2) {

    //first ensure they are the same type
    if  (typeof (obj1) != typeof(obj2))
        return false;

    //loop through each property
    for (var p in obj1) {

        //make sure both objects have this property
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p))
            return false;

        //check if current property is an object
        if(typeof(obj1[p]) === 'object')
        {
            //perform a recursive call to deepCompare
            if(!Object.deepCompare(obj1[p], obj2[p]))
                return false;
        }
        //if the property is a function
        else if (typeof(obj1[p])=== 'function')
        {
            if (obj1[p].toString() != obj2[p].toString())
                return false;
        }
        //if they are values
        else
        {
            if (obj1[p] != obj2[p]) return false;
        }
    }

    //finally do a check of object 2 to make sure it doesn't have properties object 1 does not
    for (var p in obj2) {
        if (typeof (obj1[p]) == 'undefined') return false;
    }
    //if we make it here, the objects should be equal
    return true;
};

console.log(Object.deepCompare(a, b));
console.log(Object.deepCompare(a, c));
console.log(Object.deepCompare(a, d));