//exampl for prototype and lexical scope

let company = "Vonnue"

function Employee(name) {
    this.name = name;
}

Employee.prototype.getInfo = function () { // dont use arrow fuction because it access the outer value it has no "this" 
    console.log(this.name + " Working at " + company);
}

let empl1 = new Employee("akshay")

empl1.getInfo()


// example of function 

let example = 0
function test() {
    let example = 1
    console.log(example, "inside the function")
}
test()
console.log(example, "outside the function")


//Example for Dot notation and Bracket notation

const obj = { emply: "akshay", age: 22 }
const key = "emply"
console.log(obj[key]) // akshay
console.log(obj.age) // 22
console.log(obj.key) // undefined


//example for scope changing 

let a = 1;
function one() {
    let b = 2;
    function two() {
        let c = 3;
        console.log(a, b, c)
    }
    two()
}

one()


//example for closure 

function closure() {
    let value = "b"

    return () => {
        console.log(value)
    }
}

const z = closure()
z()


// example for closure 

function createCouter() {
    let count = 0;

    return () => {
        count++;
        console.log(count)
    }
}

const counter = createCouter()

counter()
counter()
counter()

function q1(str) {
    let left = 0;
    let right = str.length
    let string = ""
    for (let i = 0; i < right; i++) {

        string += str[i]
        console.log(string)
    }

    while (left < right) {
        let revers = ""
        for (let i = left + 1; i < right; i++) {
            revers += str[i]
        }
        console.log(revers)
        left++
    }
}


// example of ones 


function onse() {
    let isRun = false

    return () => {
        if (!isRun) {
            isRun = true;
            console.log("onces")
        } else {
            console.log("no")
        }
    }

}

let on = onse()


//curring

function addTax(tax) {
    return (price) => {
        return price + tax
    }
}

const addGst = addTax(20);
console.log(addGst(200))


// function getData(callback){
//     setTimeout(() => {
//         callback("Here is your data")
//     }, 2000)
// }

// getData(function(result){
//     console.log("Callback:", result)
// })



function getData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Here is your data")
        }, 2000)
    })
}


getData()
.then((result) => console.log("Promise", result))





