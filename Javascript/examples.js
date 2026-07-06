//promise


function a(){
    const b = 10

    return () =>{
        console.log(b)
    }
}

const c = a()
c()


//curring

function curring(tax){
    function toatalamount(amout){
        console.log(tax * amout)
    }
    return toatalamount
}

const gst = curring(2)
gst(2)

const claculatingGst = gstPrice => price =>  price + (price * gstPrice)

const gst1 = claculatingGst(2)

console.log(gst(4))



//appli ,call , bind

function greeting(city,age){
    console.log(`hellow I am ${this.name} from ${city} and age is ${age}`)
}

const person = {name: "akshay"}

greeting.call(person, "ekm", 22)
greeting.apply(person, ["ekm", 22])

const greetingBinding = greeting.bind(person, "ekm", 22)
greetingBinding()

//debounsing


function debounce(fn, delay){
    let timer;

    return function(...args){
        clearTimeout(timer)

        timer = setTimeout(() => {
            fn.apply(this, args)
        },delay)
    }
}


function search (query){
    console.log("searching for", query)
}


const debouncedSearch = debounce(search, 500)
debouncedSearch("a")
debouncedSearch("ap")
debouncedSearch("app")
debouncedSearch("appl")
debouncedSearch("apple")

function deb(fn, delay){
    let timer;

    return function(...args){
        clearTimeout(timer)
        timer= setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const user = {
    name: "akshay",
    sayName(){
        console.log(this.name)
    }
}

const deb1 = deb(user.sayName, 500)
deb1.call(user)


function throttle(fn, limit){
    let lastCall = 0;

    return function(...args){
        let now = new Date.now()

        if(now - lastCall >= limit){
            lastCall = now
            fn.apply(this, args)
        }
    }
}

function osScroll() {
    console.log("Scrolling..")
}

const trottleScroll = throttle(osScroll, 1000)

window.addEventListener("scroll", trottleScroll)

function throttle(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
// 🔹 Step 2: Create a function to test
// js
// Copy code
// function logScroll() {
//   console.log("Function executed at:", new Date().toLocaleTimeString());
// }
// 🔹 Step 3: Throttle it
// js
// Copy code
// const throttledLog = throttle(logScroll, 2000);
// 🔹 Step 4: Attach to an event (scroll or button)
// Option A: Scroll
// js
// Copy code
// window.addEventListener("scroll", throttledLog);
// Now scroll continuously — you’ll see logs only once every 2 seconds, not on every scroll.

// Option B: Button click
// html
// Copy code
// <button id="btn">Click me fast</button>
// <script>
//   document.getElementById("btn").addEventListener("click", throttledLog);
// </script>


function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const gen = genFunc();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
