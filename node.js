// what is node js ?
//         node is not a language or framework,
//         it is an runtime environment to for js outside the browser.

//         normally js runs inside browser
//         node.js allow you run js on your computer/server


// what is difference between browser and node.js ?

//         main difference is in Node.js there is no access to browser , 
//         there in no dom , there in no fetch etc.

//         in node we built server side apps
//             -it consist of pure logic.


// notes
// ----

//         .node built on V8, the same js engine used by Google chrome
//         .it also include c++ library called libuv that handles things like :
//             -file system
//             -networking
//             -thread pool
//             -asynchrounous I/O



//         V8 Engine -> Compiles JavaScript code into fast machine code.
//         libuv ->Handles async I/O operations and the event loop (written in C++).
//         Event Loop -> Continuously checks for events and executes callbacks.
//         Thread Pool -> Handles background tasks (file read/write, DNS, crypto, etc.).
//         Bindings -> Bridge between JS and C++ code (lets JS talk to OS features).
//         Node APIs -> Built-in modules like fs, http, crypto, etc. built on libuv.


                                                                                                  
// 1. Core Components inside Node.js ?
    
//         +--------------------------------------------------+
//         |           Your JavaScript code                   |
//         +--------------------------------------------------+
//         |           Node.js APIs (fs, http, etc.)          |
//         +--------------------------------------------------+
//         |       C++ Bindings (bridge layer)                |
//         +--------------------------------------------------+
//         |       libuv (Thread Pool + Event Loop)           |
//         +--------------------------------------------------+
//         |       V8 Engine (Executes JS Code)               |
//         +--------------------------------------------------+
//         |       OS (System Calls, File I/O, Network)       |
//         +--------------------------------------------------+


// 2. what is V8 Engine ? - "The Brain"

//             . Written in C++
//             . developed by chrome
//             . Executes js 
//             .embeds a heap, stack, and JIT compiler.

//     sub) How it works in Memory

//             when node starts V8 engine allocate.

//                 .A HEAP -> for object, arrays, closures, etc.
//                 .A STACK -> for function call and local variables
//                 .A Code Space -> for machine code compiled from JS

//              👉 V8 parses the code → converts to bytecode → JIT compiles into machine code → executes it directly on the CPU.

//                 Key roles of V8:

//                     ->Memory allocation & garbage collection
//                     ->Converts JS → optimized machine code
//                     ->Provides core built-in objects (Object, Array, Promise, etc.)    
                    

//             => V8 engine does't handle async => asyncis coordinated by libuv + Node internals.

// 3. What is libuv ? 

//             -> a C library that handles asynchronous I/O opertaions.

//             => it provise:
//                 . Event loop
//                 . Thread pool
//                 . Non-blocking I/O
//                 . Timers

//     sub) how it work in memory?

//             when Nodes starts:            
//                 ->libuv creates an event loop in C memory space.
//                 ->it also create a thread pool (default: 4 threads) for expensive tasks like:
//                     . file reading/writing
//                     . DNS lookup
//                     . Crypto operations


//     sub) what is a Thread?
                          
//             -> A thread is path of execution in a program -- like a worker that runs code.

//             🧠 Example Analogy
                                                       
//                 =>Imagine you have one worker doing everything:
//                     .Reading files
//                     .Making network calls
//                     .Printing logs
//                     → He gets tired quickly and blocks others.

//                 Now, if you have multiple workers (threads):
//                     .One reads files
//                     .One handles network
//                     .One does encryption
//                     → All tasks happen together (concurrently).
//                     That’s what a thread pool helps with — multiple workers ready to handle heavy work

//             =>Single-threaded:-	Only one thread executes JS code (Node’s main thread)
//             =>Multi-threaded:-	Multiple threads handle background or I/O tasks (libuv thread pool)   
            
//     sub) What happend when node starts?

//                 -> start V8 engine -> executes js code.
//                 -> initializes Libuv -> create
//                                             .An Event Loop
//                                             .A Thread Pool (default: 4 threads)


//                     main thread (V8) -> run JS
//                     libuv thread pool( 4 thread) -> handles async tasks.

//     sub) why node uses thread pool (libuv)
//         because some operations take time --- if done one main thread it will block


//             NOTES////
//                 => File Reading / Writing (I/O)

//                     What it means:

//                     Your hard drive is very slow compared to CPU.
//                     So reading a file takes milliseconds or even seconds.

//                 => DNS Lookup
//                     What is DNS?

//                     DNS (Domain Name System) = Converts domain names into IP addresses.
//                     Example:

//                     google.com → 142.250.183.206

//                     Why it needs thread pool:

//                     When you connect to google.com, Node must ask a DNS server for the IP.
//                     That’s a network operation, which takes time — so libuv runs it in a background thread.

//                 => Crypto Operations
//                     What is crypto?
//                     Operations like:

//                         .Hashing (e.g., passwords)
//                         .Encryption / decryption
//                         .Random number generation

// 4. what is C++ Bindings ?
//         C++ bindings are glue code connection V8 with C/C++ libraries 
 
        
// 5. what is event Loop ?
//       =>event loop is the core mechanism inside libuv that keeps Node.js running non-block and asynchronous even 
//         js code runs on a single thread.
        
//         JavaScript (in V8) is single-threaded — it can only execute one thing at a time.
//         ->But Node wants to handle many operations:
//             .File reads
//             .Network requests
//             .Timers
//             .Database queries

//             To do that without blocking, Node uses:
//                 .libuv’s thread pool for background tasks
//                 .Event Loop to know when each task is done and which callback to run next



// working
// -------
//             🧩 Step 1 — Your Code Enters the V8 Engine

//             Node passes your JS file to V8, which:
//                 .Parses your JS code
//                 .Compiles it to machine code
//                 .Starts running it line by line

//             🔄 Step 2 — Asynchronous Work Goes to libuv

//             Node doesn’t block the main thread.

//             Instead:

//             .Node delegates the asunchronous function to libuv
//             .libuv uses a thread from the thread pool to read the file in the background

//             🕓 Step 3 — The Event Loop Takes Over

//             While libuv completed asynchrouns operation:

//             .The main JS thread is free to continue executing
//             .Once the background operation finishes, the callback is pushed to a callback queue

//             🔁 Step 4 — The Event Loop Checks the Queue

//             The event loop constantly checks:

//             “Is the main thread free? Any callback waiting in the queue?”

//             When your file read finishes, and the main thread is idle, it runs:



//  What is a Thread?

//     A thread is like a worker that executes code inside a program.

//     Think of your program as a factory:

//     The factory = your process (e.g., Node app)

//     The workers = threads
//     Each worker can execute instructions.

//      In simple words:

//     A thread is the smallest unit of execution in a program.


// what is REPL?
//     is an environment where you can type js code and see the result immediatley(look like comand line)
   
// is there WINDOW in node.js?
//     no because there in no browser so there is not WINDOW object


difference between Browser vs Node.js ?

        . In the most the time interaction with the DOM, or other web platform APIs like Cookies. 
        . Dont have the document, window and all the other objects that are provided by the browser. 

        . in node js you control the environment. 
        . In the browser, we don't have all the nice APIs that node.js provides through 
        its modules. for example filesystem 


what is a module ?

    is an encapsulated and reusable chunk of code that has its own context in Node.js , 
     each file is treated as a separte module


     type of modules 

        1. Local modules - Modules that we create in out application 
        2. Built-in modules - modules that node.js ships with out of the box
        3. Third party modules - Modules written by other developers that we can use in out application 

        sdfs dsdsdf sdf sdf sdf sd ssdf das sd sfdsddddsdfsdfdf sd f















// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

                                                      



// //NOTES FROM PROJECT 
// --------------------

// while start a Project

//  => import express from "express"
//     import dotenv from "dotenv"

//     dotenv.config

//     const app = express();
//     app.use(express.json());  

//     const PORT = 5000;
//     app.listen(PORT, () => console.log(`server running on port ${PORT}`))



// BEHID THE SCENES
// =>
//     .Express initially uses NODES core http module.
//     .when we call epress(), it create an app object that act as :
//         ->.A function to handle HTTP requests.
//         ->.A mini-server that orginizes routes, middleware, etc.

//     => app.use(express.json())
//         -> Express looks at every incoming HTTP request.
//         -> if the Content-Type is in json , it read row data streem 
//         -> convert it from JSON strin into a JS object.
         

// =>dotenv.config(); 

//     -> dotenv read your .env file using Node's built-in fs(file system) module.
//     ->parse each line like KEY = VALUE
//     ->it attchach them to process.env, which is an object that Nodes uses to store 
//     environemnet variables.

//     process.env = {
//     PORT: "5000",
//     MONGO_URI: "mongodb+srv://...",
//     PATH: "...",
//     HOME: "..."
//     }

// BASE NOTES ---must know

// =>related to TCP, OS,TCP Socket

//     -> OS => manages network interfaces and TCP/IP stacks.

//     -> TCP Socket => an endpoin created by OS to accept connentions to a particular port and IP
//         (IP (Internet Protocol) is a set of rules that defines how data is sent and received over the Internet.)

//         [
//             TCP scoket  is two-way comminication link between 2 devices using TCP( Transmission Control Protoco l).

//             think like a phone call between 2 computers:
                
//                 .both sides connects (handshake),
//                 .talk (send/recives data),
//                 .Thne hang up (close the connection)

//             🔹 TCP — Transmission Control Protocol

//                 TCP ensures:

//                 Reliable — data is delivered correctly and in order.

//                 Connection-oriented — a connection must be established before sending data.

//                 Error-checked — detects lost packets and resends them.

//                 It’s part of the TCP/IP suite (the foundation of the Internet).

//             🔹 Socket — The Communication Endpoint

//                 A socket is like a doorway through which data flows in and out of your computer program.

//                 Every socket has:

//                 An IP address (like 192.168.1.10)

//                 A Port number (like 80 for HTTP)

//                 Together they form a socket address:

//             Raw means => pure form
//         ]

//     -> Node.js net & http modules => net handles the TCP sockets, http bulits HTTP parsing on top of net .

//     -> IncomingMessage (req) & ServerResponse (res) — Node objects that represent the HTTP request and response.



// => app.listen(PORT, () => console.log(...)) //// important

//     .when we call app.listen 

//         1. express call http.createServer(app) initernally.
//             app is actual a function , which express sets up to process requests.

//         2. it then call server.listen(port, host, backlog, callback) on that http server.
//             this ask OS to :
//                 .allocate  a socket bound to the chosen IP address and PORT.
//                 .start listerning of incoming TCP connection requests on that socket
        
//         3. OS will accepts connection requests ( after TCP handshake ) hand a socket to Node process
        
//         4.Node receives raw bytes on that socket. The http module parses the bytes into an HTTP request: method, path, header, body (streamed)

//         to understnad //
//         [
//             1. ->a client(browser) sends a request

//                     http://localhost:3000/

//                 -> borwser sends this message over the internet:
//                     GET / HTTP/1.1
//                     Host: localhost:3000
//                     User-Agent: Chrome
//                     Accept: text/html

//                 these are raw bytes of data - just atext sent through a TCP connection.

//             2. ->  Nodes'OS socket receives those bytes 
//                ->  Node server was already listerning on port 3000.
               
//                [
//                     Node.js runs on top of Opertaing System (OS)

//                         1.-> Node dosn't directly manage network connections.
//                         . it depend on OS's kernal to do all the heavy networking tasks.
//                             (kernal -> is core part o OS , it like the brain connets your hardware and software)
                        
//                             -> OS provides:
//                                 .Network stack (TCP, UDP, IP layers)
//                                 .File system
//                                 .Process schedulling
//                                 .Memory management
//                                 .I/O interfaces
//                         2. Node.js usese a C++ library called libuv
//                             This is heart of Nodes's non-blocking I/O system

//                             libuv handles:

//                                 TCP sockets
//                                 UDP sockets
//                                 File I/O
//                                 Timers
//                                 Threads
//                                 Asynchronous event loop

//                             -> Node tells libuv -> please ask OS to open a TCP soket on port 3000.

//                             ->OS create that socket and gives Node a file descriptor.

//                             ->Node adds it to event loop so it can react whn data comes in.
//                ]
               
            
//         ]


//         5. Express middleware and route handlers run, use req/res, and eventually call res.end() to send bytes back over the socket to the client.

//         6. The socket may be closed or kept alive (HTTP keep-alive) depending on headers.
        


// How express handles  a request?

//     when a client  sends a request to your Express server:

//          => Client -> Node HTTP Server -> express middleware stack -> Router -> Router Handler -> Response

//             . at every steps express runs special function these are 
//                 - middleware, routes and route handlers  


// ⚙️ 2️⃣ The Express App — What app Actually Is

//     When you write:

//     import express from "express";
//     const app = express();


//     👉 express() creates a function that can handle HTTP requests:

//     app(req, res, next)


//     Internally, this app function holds:

//         => .A stack (array) of all middleware and routes you define using app.use() or app.get() etc.

//     Each layer in that stack is an object with:

//         .path → URL path it applies to

//         .method → HTTP method (GET, POST, etc.) or undefined for middleware

//         .handler → the function to call ((req, res, next) => {})

//     So, Express literally builds a to-do list (stack) of things to run for each request.



// What is middleWare?

//     middleware functions are like filters or steps that modify or check request/respone.

//     structure:
//         app.use((req, res, next) => {
//             console.log("Incoming request: ",)})
//             next(); // move to next layer in stack.
//         })

    
//     if next() is called, request stops  here.
//     if you don't call next(), request stopa here.
    
//     ✅ Middleware can:

//         Read/modify req (like add req.user)
//         Read/modify res
//         Send response directly
//         Call next() to move on.


//     Let’s simplify what Express internally does (pseudocode):

//         function handleRequest(req, res) {
//         let index = 0; // start at first middleware

//         function next(err) {
//             const layer = stack[index++]; // get next middleware/route

//             if (!layer) return; // no more layers

//             // If there was an error and this layer is not an error handler, skip
//             if (err && layer.handler.length !== 4) return next(err);

//             // If it's an error handler and there is an error, call it
//             if (err && layer.handler.length === 4) return layer.handler(err, req, res, next);

//             // If the URL matches and method matches, call it
//             if (matches(req, layer)) {
//             try {
//                 layer.handler(req, res, next);
//             } catch (error) {
//                 next(error); // pass error down
//             }
//             } else {
//             next(); // skip to next layer
//             }
//         }


// what are router ?
//     router are like mini express that you can plug into your main app.


//     import express from "express"
//     const router = express.Router();

//     router.get("/list", (req, res) => res.send("food list"))
//     router.get("/add", (req, res) => res.send("Foof added"))

//     app.use("/food", router);

                        
// How exactly Express matches routes internally ?
        
//     when a request arrives:
//         1. express iterates through all layers in order.

//         2. For each:
//             . if later.path matches URL(or is /)
//             . if method matches the requests http method 
//             . then execute handler(req, res, next)



// ⚡ 12️⃣ Real Behind-the-Scenes Flow (visualized)
// HTTP Request (from browser)
//         │
//         ▼
// Node.js http module
//         │
//         ▼
// Express app
//         │
//         ▼
// Middleware stack (app.use)
//         │
//         ▼
// Mounted routers (/user, /food)
//         │
//         ▼
// Router-level middleware (auth, validation)
//         │
//         ▼
// Route handler (GET/POST)
//         │
//         ▼
// Send response (res.send / res.json)
//         │
//         ▼
// Express ends request cycle



// //

// mongo db

// connection
//     import mongoose from "mongoose";
//     import dotenv from "dotenv"

//     dotenv.config()

//     const connectDB = async () => {
//         try{
//             await mongoose.connect(process.env.MONGO_URL);
//             console.log("Data base is connected")
//         }catch(error){
//             console.error("erron in database connection",error)
//         }
//     }

//     export default connectDB
     
                                     

// model
//     import mongoose from "mongoose";

//     const userSchema = mongoose.Schema({
//         name: {type: String, require: true},
//         email: {type: String, require: true},
//         password: {type: String, require: true},
//         role: {type: String, enum: ["admin", "user"], default: "user"}
//     })


//     export default mongoose.model("User", userSchema)


//     //=> enum : [valu1, val2] ,default: "user"


  
                                 
// whhat is pre- sav hook in mongodb?


// ⚙️ 3. Pre-Save Hook — userSchema.pre("save")

// This is where the magic happens. 👇

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });


// Let’s explain this carefully:

// 🔹 What is a “pre-save hook”?

// A Mongoose middleware function that runs before saving a document to MongoDB.

// It allows you to perform operations like:

// Hashing passwords

// Generating timestamps

// Validating extra logic

// Cleaning or transforming data before saving

// So this function runs automatically whenever you call:

// await User.save()
// await User.create({...})

// 🔹 Step-by-Step Explanation

// this → Refers to the current document being saved (the user).

// this.isModified("password") →
// Checks whether the password field was changed.

// If you’re just updating name/email (not password), it won’t re-hash it.

// This prevents double-hashing.

// await bcrypt.hash(this.password, 10) →
// Hashes the password with 10 salt rounds (a randomization step to make it harder to crack).

// this.password = ... →
// Replaces the plain password with its hashed version.

// next() →
// Calls the next middleware or proceeds with saving to MongoDB.


// 🧩 1. What next actually is

// In Mongoose middleware, the function signature:

// userSchema.pre("save", function (next) { ... })


// tells Mongoose:

// “Before saving a document, run this function.
// I’ll call next() when I’m done — that means you can continue saving.”

// So, next is a callback function that Mongoose automatically passes into your middleware.

// You don’t create it — Mongoose gives it to you.

// ⚙️ 2. Why Mongoose gives you next

// Mongoose uses a middleware system (like a conveyor belt 🧱).
// Each middleware runs one after another in sequence.

// So when you call:

// await user.save()


// Mongoose internally goes through a process like this:

// “Any pre("save") middlewares to run?” ✅ Yes → run them.

// “Wait for each one to finish — only move on when it calls next().”

// Once all pre-middlewares are done → save the user to MongoDB.

// After saving → run any post("save") middlewares (like logs, emails, etc.).

// So, calling next() tells Mongoose:

// “I’m finished with my work here, you can continue to the next middleware or save step.”

// If you forget to call next(), Mongoose stops there — it thinks the middleware is still running, and the save operation never completes.
// Your code just hangs ⏳ forever.

// 🧠 3. The Full Flow Example

// Imagine this code:

// userSchema.pre("save", async function (next) {
//   console.log("1️⃣ Pre-save started");
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   console.log("2️⃣ Password hashed");

//   next();
//   console.log("3️⃣ next() called, moving on...");
// });


// Then you run:

// await User.create({ name: "John", email: "john@gmail.com", password: "12345" });


// 🧩 Behind the scenes:

// 1️⃣ Mongoose creates a new document from your data.
// 2️⃣ It sees you have a pre("save") middleware.
// 3️⃣ Mongoose runs that middleware, passing in a next function.
// 4️⃣ Inside your middleware:

// You hash the password.

// You call next() when done.
// 5️⃣ Mongoose sees next() called — continues saving to MongoDB.
// 6️⃣ Save completes ✅

// If you never call next(), Mongoose is stuck at step 4 forever.

// 🧩 4. Real analogy — Restaurant kitchen 🍽️

// Think of Mongoose as a kitchen:

// A “save” request is an order from a customer.

// pre("save") middlewares are chefs who prepare ingredients before serving.

// Each chef must say “Next!” before the dish moves to the next chef.

// If one chef never says “Next!”, the food never reaches the table.

// That’s why next() is so important — it keeps the workflow moving.

// ⚙️ 5. What if you forget next()?

// Example:

// userSchema.pre("save", async function () {
//   await bcrypt.hash(this.password, 10);
//   // ❌ Forgot next()
// });


// Then you call:

// await user.save();


// Result → your app hangs forever, no errors — just waiting for that “next” that never came.

// ⚙️ 6. When using async, is next() still needed?

// Good question! 👇
// Technically, if your middleware is async, Mongoose can detect when it finishes (when the Promise resolves).
// So in modern code, you can omit next() safely if you return or finish the async function properly.

// ✅ Works fine:

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });


// Here, Mongoose waits for your async function to complete automatically — no need for next().

// However, including next() is still a good habit when learning, especially for non-async middleware or more complex chains.


// what are jwt ?
//     jwt = json web token

//     => JWT are most commonly used for stateless authentication and API authorization.
//     => Ther are 2 familes:
//         .JWS (signed) -- the common "JWT" you see: JSON claims          



zczxzxzxzxcxxcvxc xcvxc xcxcx xcvxcv xcvxcv xxcvvxxv xc xcv xcv xc xcvxcvxc xc xcv xcsdf sdf sdsd ssd ssdfsf sd sd sd sdsdsssdf sdf sdf sdfs sdf sd fssdfsdf sd sd sdf sdf sdf sd sdfsdfsd sfsd sdf sd sdf sd sd sdf sdf sfsd sds interaction way of creating the w sd sdf sdf sd sdf sd sdf sdf sdf sdf sd sdf sd sdf sd fsd sdf  sdf sd fsdfdsf sddffssddddddsdsdsdf sdf sdf sdf sdfsdfsdf sdf  sdf sd sdf sdf sdfsdfsd sdf sdf sdf sd sdf sdf sdfsdsd sdfsd werwesd sdsd sdssdf s sdfsdf sdsdff sd sd sdf sdf sd sdf sdf dsdfsdfsdfsfddddddddsf sfd sdsfddddddddssssssssssssssssssssssssssssssssssssssssssssssssssf  sd sdf sdf sdf sdf sdf sdf sdf sfd sdf dsdf sdf sdf sdf sdf sdf sdf sdfsdf sdf sdf sdf sdf sdf sdf sdf dsf sdff sf sdfsdfsd sdf sdfsdf sd df sdf sdf sfddfssd s ssfd sdf sdf sdf sdf sdf sdf sd sdf sdf sdf sdf ssdf dsf dssd sdf sdf fdf sdf sd sdf sdf sdf sdf sdf sdf sdf sdf sdf f df sc sf sdf sd  sdf sdf  sdf  sffd sdfsdf sdf sdf d  asd ads as sasaasa aaasd ada as ad ads ad asd asd as asdas asda aasdasd asd asdasd asd as asadsa sdasasd asa as aadsasd asd asd asd asd asd asdasd asd asd asd asd asd asd asdasd asd asd asd asdasd asd asd asd aasd assadasdasdasd asdasd asd asd asd asd  asd asd  sdfsdf sdf sdfsf sd sdf sfsdf sdf sd sd sdf sfsdf sdf ssd sfsdf sdf sfd sdf sdf sdf sdf sdf sdf sdf sdf  sd sdf sdfsdf sdf sdf sdf sdf dsfsdfsdfsdf sdf sdsd sdsfsd dsd s fs s sdf sdf sf sd sdf sdf sdf sdf sd sd sd dsf s sd sdf ssdf sdf sdsdsd sdf sdsdfsdfsdfsds sdf sdfsdf sdfsdf ssdf sdf sdsdf sdf sfsdsdf sdf daawessdf sdsdsdsd sd f sf sdf sdf sdfsdf sd sdf sd sdf s sdfsdfsdf ds ssdf s sd sf sdsdfsdf sdf sdf sfsfsdfssdf sdf sdf sdssdfsdf sdsssdfddsfksdlf sldfj sdf sdf sdf sd sdf sdf sdf sdf dsf sdfsdfsdfsdfsdf sdf sdf sdsdsdf dsdfsdfs sdfsdf sdfsd fsdf  sdf sdf sdf sdf sd sdf sdf sfs f  sdf sd sd sdf sdf inc sdf sdfk sd i e sdfsd s sd sdsdf increacrea inc er ewr wer we rew wer dsfsdf sdf  sdf sdf sdf inclined incerad inc reacted increa sdf sdsdsd fsdf sdf sd sd sdf sdf sdsdsdfsdfsd sdfsdfsdf sdf sdf sdsdfsdfs df sdfsdf sdfs dfsdsd s inclineder  in e reac re  e increacrion re s  increa lerakelted cre    incre a  increal increadre  inc re a incre inc incre  incre incer a increa  in sd sdf sdfsdf sfs d i insdf cewr wer insd sdf sdf inc reaction incre a sdlkf sdklfjsd sdf sdfsd inctule reacrea  increaew wesdf  sdfi n  
  increacre  incra e incre cecre incration ind  nin e  d fsdf dsf dsf sdf sdf sdf sdfsdf sdf sdf sdf sdf  inc  inc sd asdlf nsdf sdf increadction sdnisdf in cre ac  ctiontio iisdkfjh sdf sdf sfksd sdfklj ds inc creaction creacreatin  isder   inc er increa steracti increac tion inc inc reacte sdf sdf sdfsdfsdf  sdf sdf sdf sdsdf sdf inc react sdf sdf  ddfg dfg dfg dfg incrs inc  increac tion  increatio ion increaatio tion sfd sdf sd incrr ti increaction  increation 
  sdf sdf sdfssdfsdss increation increattion ttion sterctioin creation cretion incretion d increation 
  sdf s incretion icnretio increation  sdf increation  kjh kjkjkhjkjkhkjkjhkjkjhkjhjkkjhkjhkhkhjkjhjkhj jkh jkh  k kj  kjh kjjkh jkh jkjhk kj kjhkjhj kjhkjhkjkjkjhjhkkjhkjhkhjkhkjhkjhkkhjkjhkjhjkhkjhkjhkhkjhjkllkjkljlk lk lklj lasdj aasasd asdllkjasd klkj nilasdas kasd asdas asdaslkdj asd asd asd aiuybkuiuyub iiuiuyb iu iuyb iuiuoionouoiuouoiunb ioiu oiu iioun kjhkj kjhkjhjkjh kj kjh kjh kjh kjhkjh jh kjhjkkjhkjhkjhkjhkjhkjhkjhjkjhjkhhkjhkjhkjhkjhkjhkjhkjh kjhkj kjh kjhkjhkjkjhkjhkjkjhkjhkjhjkkjhkjhkjhkjhkjhkjhkjh kjh kj kjhjkhkjhkjhkjh jkhkjhkjhjkh kjhkj kjhkjhkj kj kjh kjhkjh jkhh kjhkjh kjhkj kjhh kjh kjhkjh jkhkjh ljkkj sdf; lsdfsfs ;lk;lk;lk;lklkjlk sldkjf sdfksd ssdfsdf sdf sdf sdf sdf sdf sdf sdf  koiioiu ikjkjhkkhjkjhkjhkjhkjhjhkjkjhjkhkjhkjh kjh klj lk lkjllk lkj lk lkj lkjlkj klj lkj lkjlkj lkj  klj kljkjl klj lkjklkj klj l jkh kjh kj kj kk kljl lk lk kl  ,kl kljkjkjjh kjh  kj lkj jkljk klkjlkjlkjlkj lkj lk   lkj  lkj kl  lkl  lk lk  jklkj jk l lkj lk lk l lkj lklk lkjlkj lkj lk lkjkj l lkj lkj lkj kl lk lklk lj lkj lkj kl lkj kjhkjh kjkj k  kkj jk jkh kjhkjkjh kjhkj kjh kjhkjhkjkj jkhkjh kj kjjkh jkh khj kjh kjh kjkjh kjh jkkjhkjhkj kjhjkh kjh  jk kjh kjhkjhkjh jkhkjhkjkjhkjhhjkkjkhkjhjkjkjhkhjkjkjh kjhjk jkhjkjhkjh kjhkjhjkh kjhkjhjkhjghhj hjghj jghjgh jhghj jh jhhjg  kjuhkj kjh kjhh kj jk khkjkjhkjhjkhjkjkjkjkkjjkhkjhjkkjhjkhkjjhkj kjhkj kjjkhkj kjjkjhjkh kjhkjhjkhkjh kjh sdfsfsd s sd increew rwer wrrw s dsf sd sdincee we sdf sdf  sinclimeterd sdf increa derve sdfsddfs sd sfsdf sdf sdfsdf sdf sdf df sdsdsds dfsdfdfdsdsdf  aasdf sdd sd  sdf sdf ff sdf sdf fd sdf sdf sdfsdfsdf sfssdf sdf sdf  sdf sdf sdf sdf sfdsdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sfd dsf sdfsdf sdfsdf sdf  sd sd sdf sdf sdf sdfxx  xcv cinvalaid ds dsxvc dsf xcv f rection d  rt fgh   fhgf fgh fincrind the sdf  sdsf sf sd dfsdfgd dfg df dfg dfg dfg dfg dfgfd 
  dfg dfg  dgf d fnvalid sdf ds dsf sd sd sdf sdf sdf sdf sdf  sdf sd sdfsdf sfd sdf sd sdsdf sdf sdf sd sff sdf sdf dfg dfgsfd sf sdf ds sdsdfdfsdfdsf dsf sdf sdf  sdf sfd sdf d sdfsd sf sdf sdf sdferactiokjn ggfh gf fg fg  fgggggggggggg fgh fg fgh fg fgh fg fgh fgh fgh fg fg fgh fhggfggfbvbnvbbbbbn vbn vb vbn fgsdf sda asd asdasd adas asd adasd sdf sdf sdf sd sdf 