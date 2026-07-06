/*

TYPES


there 2 type of data types primitive and nonw-primitive

    -in js primitive types directely store value to the memory (numners, string , boolean..)
    -but in non-primitive (array, object, function) stored by refference 


    ->Primitive types (immutable, stored directly in memory)
    ->Non-primitive types / Reference types (mutable, stored by reference)

    🔹 2. Primitive Types (7 total)
    Type	Example	Description	Stored in Memory

    ->Number	42, 3.14, -0	Represents both integers and floats (IEEE 754 double precision)	Stack (value directly stored)
    ->String	'hello', "Akshay"	Sequence of UTF-16 characters	Stack (value copy)
    ->Boolean	true, false	Logical true/false	Stack
    ->Undefined	let x;	Variable declared but not assigned	Stack
    ->Null	let x = null;	Intentional “empty” value	Stack
    ->Symbol	Symbol('id')	Unique and immutable value	Stack
    ->BigInt	123n, 9007199254740991n	For very large integers beyond Number.MAX_SAFE_INTEGER	Stack

    ⚙️ All primitive types are immutable — once created, they cannot be changed.
    If you “modify” a string, you’re actually creating a new one in memory.

    🔸 3. Reference (Non-Primitive) Types
    Type	Example	Description	Stored in Memory

    ->Object	{ name: "Akshay" }	Key–value pairs	Heap (reference stored in stack)
    ->Array	[1, 2, 3]	Ordered collection (object subtype)	Heap
    ->Function	function add(a,b){}	Callable object	Heap
    ->Date, RegExp, Map, Set, etc.	—	Specialized objects	Heap

    🧩 Reference types are mutable and stored in the heap.
    The stack only holds a pointer (reference) to where the actual data lives in the heap.


    for example:
        let a = 3
        let b = a
        b + = 2;
        console.log(a) // 3
        console.log(b) // 5

        above is the example for premitive type in this we got correct


    in non prmitive exmaple

    when we create a array
        let arr = [3,5]

         => it store in memory like
         
            variable name pointes to address
                                value
                arr ---->  1001  3
                           1002
                           2003
                           1004
                           1005  5
                           1006
                           1007
                           1008

                why the index of array start with zero ? how it works when we call arr[0] or arr[1]?
                
                    when we call arr[0]

                                it calculate like => addres that array points + (how bytes of singel value + index)
                                                    1001 + (4 * 0) => so we get => 1001

                                                    this is why index of array start with zero;

                                        arr[1] => 1001 + (4 * 1)
                                                => 1005 => we got value 5 


IMP////

        the another example

            >let arr3 = [1,2,3]
            > let arr4 = [1,2,3]
            
            > arr3 === arr4
            //false

            this is because the 2 array are store in memory using its address so 
            when we chack like this it comparing its adress that is wht it shows false
            
        
        
what is type coersion in js?
    automatic or implicit conversion of values from one data type to another

    there 2 type 
        1. impicit coercion => done automatically by JS
        2. Explicit coercion => done manually by developer


        implicit type coercion

        '5' + 2     // "52"   (number → string)
        2 + '5'     // "25"
        '5' + true  // "5true"
        '5' + null  // "5null"


        '5' - 2     // 3       (string → number)
        '5' * '2'   // 10      (both strings → numbers)
        '10' / 2    // 5       
        true + true // 2       (true = 1, false = 0)
        false - true // -1
        null + 1    // 1       (null → 0)
        undefined + 1 // NaN    (undefined → NaN)

        '5' > 2        // true ('5' → number 5)
        '12' > '2'     // false (string comparison → lexicographical)
        true > false    // true (1 > 0)


        IMP///////

        '5' == 5	✅ true	string → number
        0 == false	✅ true	false → 0
        '' == false	✅ true	both → 0
        null == undefined	✅ true	special rule
        NaN == NaN	❌ false	NaN never equals anything, even itself
        [1] == 1	✅ true	[1].toString() → '1' → number 1
        [] + []	""	both arrays → empty strings
        [] + {}	"[object Object]"	array → "", object → "[object Object]"
        {} + []	0 or "[object Object]" (depends on context)	
        true + false	1	1 + 0
        1 + '2' + '2'	"122"	number→string
        '2' + 1 + 1	"211"	string concatenation
        '2' - 1 + 1	2	number operations
        +'10' + 10	20	unary + converts string to number
        '10' == 10	true	type coerced
        '10' === 10	false	no coercion


    explicit coercion

            String()	String(123)	'123'
            toString()	(123).toString()	'123'



what is reference comparison?

    🧩 2. Example: Same Reference
        let obj1 = { name: "Akshay" };
        let obj2 = obj1; // same reference


        Both obj1 and obj2 now point to the same heap object.

        📦 Memory Visualization

        Stack:
        obj1 ───┐
                │
        obj2 ───┘
                ↓
        Heap:
        { name: "Akshay" }


        ✅ Comparison:

        obj1 === obj2; // true (same address)

        ⚙️ 3. Example: Different References, Same Content
        let obj1 = { name: "Akshay" };
        let obj2 = { name: "Akshay" };


        Now, two different objects are created in heap memory, even though they look identical.

        📦 Memory:

        Stack:
        obj1 ──► { name: "Akshay" }
        obj2 ──► { name: "Akshay" }   // new memory location


        ❌ Comparison:

        obj1 === obj2; // false


        Because:

        They have different references (addresses)

        JS doesn’t do deep structural comparison by default.

        🔹 4. Same Rules Apply for Arrays and Functions
        🧩 Arrays
        [] === []          // false (different arrays)
        [1, 2] === [1, 2]  // false
        const arr = [1, 2];
        arr === arr         // true (same reference)

        🧩 Functions
        function a() {}
        function b() {}
        a === b;   // false (two different function objects)


        Each function creation allocates a new object in heap memory.


        🔍 6. When a Reference Becomes Equal by Value (Special Case)
            let arr = [];
            let ref = arr;

            ref.push(1);

            console.log(arr); // [1]
            console.log(arr === ref); // true


            Because ref and arr are both pointing to the same heap object.

            But if we reassign:

            ref = [];
            console.log(arr === ref); // false


            Now ref points to a new memory location.



    //WHEN TAKE COPY IN NON-PREMETIVE DATA TYPE

        > let arr = [1,2,3]
        > let arr2 = arr;

        > arr2
        //[ 1, 2, 3 ]

        > arr2[2] = 10;
        //10

        > arr2
        //[ 1, 2, 10 ]
        > arr
        //[ 1, 2, 10 ]




What is string ?

    a sequence (array) of characters stored in contiguous memory locations.

    string are immutable in high-level 


    when we reassign a value in string realy it not change the string
    it overwriting and and older string will removed by GC later

Efficiency problem => 
        let s = "";
        for(let i = 0l i < 1000; i++){
        s += "A"
        }

        in this create a new copy of the with one more character
        so the Time complexity brcome O(n^2)

Efficient version in JS:

    let arr = [];
    for (let i = 0; i < 10000; i++) {
    arr.push("a");
    }
    let s = arr.join(""); // ✅ O(n)       


NOTe---
    int a = 5; // 4 bytes
    short b = 5; // 2 bytes
    char c = 'A' // 1 bytes
    long d = 5l; // 8 bytes



what is hashing? 

    hashing is a technique to convert data ( like string, number, or object) into
    a fixed-size value( called a hash code or hash value) that represents it in memory.

super fast way to find data by turing it into a unique "address."

    Example
        let user = { name : "Akshay", age: 22};

        to stor this 
            you shoudh hash the key "name" or "Akshay" to get number like

                hash("Akshay") -> 43102

                then stores it in hash table at index 43102 % table_size

why do we use hashing?

    lookup(searching) in array = O(n)
    lookup in sorted array = O(log n) (binery search).
    looup in hash table = O(1)

    so hashing give very fast access.


how hasing works internally?

    let map = new Map()

    map.set("apple", 10)
    map.set("banana", 20)

    step by step

        1.the key "apple" is sent to hash function
        2.hash function convert it into a numeric hash code.

            hash("Apple") -> 983374
        3. the hsh table size might be say, 1000,
        4. hte index where to store data is found by

            index = hascode % totalSize = 983373 % 1000 = 374
        5. value 10 is stored at table index 374

    if call map.get("apple") it go to same steps.








    