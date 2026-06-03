import { jsx } from "react/jsx-runtime"

Type Script:- DOC(https://www.typescriptlang.org/docs/)
-----------

.debounce?

        type script is realy a super set of js

            -> it reduce the runtime error 
            -> it help to make js more presice manner

            => type script is all about type safety


1. what is the use of TypeScript?

        => The only job that typescript done for you is 

                    => Static checking. 

            sub) What is mean by static checking

                    checking code for error before running if. 


                    => typeScript uses static checking to detect.

                        . type mistakes
                        . missing properties
                        . wrong retun values
                        . invalid function arguments
                        . code paths that can cause runtime errors

                        
2. is TypeScript is development tool ?

            => yes, it's a develoment tool , your project still runs js
                
            - it improve your code, less problem, maintanable, scalable. 

3. what is basic syntax of typescript? 

        =>  let variableName: type = values

                - type always lowercase

            example: let greeting: string = "Hellow" 


4. what is the "any" datatype and when it use ?

        => when we no need to type check we use "any"


5. what is the syntax in function? 

        => function addTwo(num: number){
            return num + 2
        }

        when multiple argument comes

                let login = (name: string, email: string, ispaid: boolean)

                login("heman",heman@gmail.com) // it shows error because ispaid is not passed so, we must set a default value for it 

                => let login = (name: string, email: string, ispaid: boolean = false)


in case array?

        const heroes = ["thor", "spiderman", "ironman"]
        const heros = [1,2,3]

        heros.map((hero) => {
                return hero
        })

        => type script automaticly identify the type inside the array, no no need to seperate datatype 



        better syntax

                heroes.map((hero): string => {
                        return 'hero is ${hero}'  // in this output is string so we put like that
                })

        
        function consoleError(errmsg: string): void{
                console.log(errmsg) // in this void means this function return nothing
        }



what is "never" type means?


                the never type represents values which are never observed. in a return type, this means 
                the function throws an exeption or terminates execution of prgm


                example:

                        fucntion handleError (msg: string) never{
                                throw new Error(msg)
                        }


Object and Type Aliases 


                        what is aType Alias ?

                                Atypes alias lets you create a custom type and reuse it. 

                                type User = {
                                        name : string;
                                        age : number;
                                }


                        Example usaeg:
                                cosnt u1 :User = {
                                        name = "Akshay"
                                        age = 12
                                }

what is interfaces ?
                
                        Interfaces are used mainly for objects and classes. 

                        same as type alias (most cases)

                                interface Product {
                                        title: String;
                                        price: number;
                                }


Function with Types

                                function add(a: number, b: number): number{
                                        return a + b
                                }

                                a: number → parameter type
                                b: number → parameter type
                                : number after the function → return type


Optional & Default parameters (Deatils)

                                function greet(name? : string) {
                                        console.log("Hello", (name || "Guest"))
                                }


                                here name? means:
                                        the name parameter may or may not come

                                        greet()
                                        greet("Akshay") // both are valid


                                function messsage(msg: string = "hello"){
                                        console.log(msg)
                                }

Union Types (Detailed Explanation)

                                union = either one types or another

                                        Example:
                                                let id: number | string

                                                id = 10
                                                id = "user" // both are allowed

Generaics 
                what are generics ?
                                
                                Generics allow youto wirte reusable functions that work with any type

                                        function box<T>(item: T): T{
                                                return item
                                        }

                                        T means any type
                                        function retrn same type you pass in


                                        Usage:
                                                let num = box<number>(100) // return number
                                                let str = box<string>("hellow") // retrun string


                        Enums

                                        what are enums?
                                                enums are named constants 

                                                enum Role {
                                                        ADMIN,
                                                        USER,
                                                        GUEST
                                                }

                                        Usr:

                                                let r: Role = Role.ADMIN


                                                role = "adm1n"; // ❌ wrong
                                                role = Role.ADMIN; // ✔ correct




React -TypeScript
-----------------

                        

                


TypeScript 

        => whe you write backend code with TS , Node.js cannot run TS FileSystemDirectoryHandle
        node understands only JS

        i works through 3 stages


                🔵 1. You write TypeScript code

                Example:

                import express, { Request, Response } from "express";

                const app = express();

                app.get("/", (req: Request, res: Response) => {
                res.json({ message: "Hello" });
                });

                app.listen(5000);


                This file is not runnable by Node because:

                Node doesn’t understand import syntax (unless configured)

                Node doesn’t understand types like Request, number, string

                Node doesn’t understand interfaces, generics, enums


        🔵 2. TypeScript Compiler (tsc) Converts TS → JS

                When you run:

                        tsc

                or
                        your dev script:

                                npm run dev

                The TypeScript compiler:

                ✔️ Removes all types

                Types are for development only.
                The compiled JS will have:

                app.get("/", (req, res) => {
                res.json({ message: "Hello" });
                });

                ✔️ Convert import/export → CommonJS or ES Modules
                Depends on tsconfig.json.

                ✔️ Outputs pure JavaScript files inside dist/ folder

                Example:

                        src/index.ts  → dist/index.js
                        src/routes/user.ts → dist/routes/user.js

                ✔️ TypeScript does NOT run your project
                It only builds (compiles).

        🔵 3. Node.js runs the generated JavaScript

                When you start your server:

                        node dist/index.js

                Node is actually running JavaScript, not TypeScript.

                TypeScript is only used to:

                        ✔️ check types
                        ✔️ catch errors
                        ✔️ improve auto-completion
                        ✔️ ensure safe backend code

                But your backend in production is just plain JavaScript.




🧠 Now let’s understand the hidden parts (VERY IMPORTANT)
        ✔️ tsconfig.json — the brain of TypeScript backend

                This file controls how TS behaves.

                Important options:

                        "rootDir": "./src"

                TS reads TypeScript files from the src folder.

                        "outDir": "./dist"

                TS writes the compiled JS file into dist folder.

                        "strict": true"

                        Catches maximum errors.

                        "module": "commonjs"

                        Or "module": "ESNext"

                        Controls how imports are compiled.

                        "esModuleInterop": true"


