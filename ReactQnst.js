//////////////////////////////////////////////////////////
INTERVIEW QUESTIONS

🧠 TOP REACT INTERVIEW QUESTIONS (With Simple Explanations)
1️⃣ What is React?

Answer:
React is a JavaScript library for building user interfaces (UI).
It lets you create reusable components that update efficiently when data changes.

In short:

React helps you build fast, dynamic web apps using components instead of manually manipulating the DOM.

Example:

function App() {
  return <h1>Hello React!</h1>;
}


🧩 React updates this UI automatically when your data (state) changes.

2️⃣ What is the Virtual DOM and why is React fast?

Answer:
The Virtual DOM is a lightweight copy of the real DOM stored in memory.

When something changes:

React updates the Virtual DOM.

Compares (diffs) it with the old Virtual DOM.

Updates only the changed parts in the real DOM.

Why it’s fast:
Because changing the real DOM is expensive,
React minimizes direct DOM changes by batching and optimizing them.

Analogy:
Like checking your old to-do list with a new one —
you cross off only what’s different instead of rewriting everything.

3️⃣ What is JSX?

Answer:
JSX = JavaScript XML — it lets you write HTML inside JavaScript.

Example:

const element = <h1>Hello JSX!</h1>;


But under the hood, JSX becomes:

const element = React.createElement("h1", null, "Hello JSX!");


🧠 JSX is not HTML — it’s syntactic sugar that makes writing UI easy.

4️⃣ What is a Component in React?

Answer:
A component is a reusable block of UI — like a function that returns HTML.

Two types:

Functional Component (modern way)

function Welcome() {
  return <h1>Hello User</h1>;
}


Class Component (older way)

class Welcome extends React.Component {
  render() {
    return <h1>Hello User</h1>;
  }
}


React apps = Many small components working together.

5️⃣ What is State in React? Why not just use variables?

Answer:
State is React’s special data storage inside a component.
When it changes → React automatically re-renders the UI.

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}


📘 Normal variables don’t trigger re-render.
✅ useState() variables do.

Questions related to props and states ?

          🧠 10. Interview-Level Summary
                Question	Key Answer
                What are props in React?	Data passed from parent to child; read-only.
                What is state in React?	Data managed internally by a component.
                How does React know when to re-render?	When props or state change (shallow diffing).
                Where does React store state?	In a linked list of hooks (fiber.memoizedState).
                Are state updates synchronous?	No — React batches updates and re-renders later.
                Why can’t you use hooks conditionally?	React tracks hooks by call order, not name.
                How are props and state stored in Fiber?	memoizedProps and memoizedState fields of the Fiber node.

6️⃣ What are Props?

Answer:
Props (short for properties) are how you send data from parent → child component.

function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}

function App() {
  return <Welcome name="GODX" />;
}


🧩 Props are read-only — you can’t change them inside the child.

7️⃣ Difference between State and Props
Feature	Props	State
Data source	From parent	Managed inside component
Mutable?	❌ No	✅ Yes
Purpose	Pass data	Store local changing data
Trigger re-render?	✅ Yes	✅ Yes
8️⃣ What is React Rendering and Re-rendering?

Rendering:
When React converts your component’s JSX → Virtual DOM → Real DOM.

Re-rendering:
When your component’s state or props change, React:

Runs your component function again.

Creates a new Virtual DOM.

Updates only changed parts in real DOM (diffing).

⚡ React does this very efficiently.

9️⃣ What are Hooks in React?

Hooks are special functions that let you use React features (like state, lifecycle, etc.) in functional components.

Common hooks:

useState() — for managing local state

useEffect() — for running side effects (API calls, timers, etc.)

useContext() — for global state sharing

useRef() — for DOM references or storing mutable values

Example:

useEffect(() => {
  console.log("Component mounted!");
}, []);

🔟 What is useEffect used for?

useEffect() lets you run code after React renders — e.g., fetching data, setting up listeners.

useEffect(() => {
  document.title = "React App";
}, []);


🧠 The second argument ([]) controls when it runs:

[] → runs once (on mount)

[count] → runs every time count changes

no array → runs after every render

11️⃣ Why React is efficient?

Because of:

Virtual DOM — minimizes real DOM changes

Diffing Algorithm — updates only changed parts

Component-based architecture — reuses code

Unidirectional Data Flow — easy to track changes

React = Fast, predictable, reusable.

12️⃣ What is the difference between controlled and uncontrolled components?
Type	Definition	Example
Controlled	Form data managed by React state	<input value={name} onChange={...} />
Uncontrolled	Form data managed by DOM itself	<input ref={inputRef} />

✅ Controlled = React always knows the input value.

13️⃣ What is reconciliation in React?

Reconciliation = React’s process of comparing the new Virtual DOM with the old one and applying minimal DOM updates.

If only one node changes, React re-renders only that node.

14️⃣ What are keys in React and why are they important?

Keys help React identify which list items changed, added, or removed.

{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}


Without keys, React may re-render elements unnecessarily or lose track of changes.

15️⃣ What is lifting state up?

When multiple components need the same state, you move that state up to their common parent and pass it down via props.

Example:

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Child1 count={count} />
      <Child2 setCount={setCount} />
    </>
  );
}

✅ 16️⃣ Bonus — Why React uses setState() instead of direct assignment?

Because React needs to:

Detect changes

Schedule re-render efficiently

Batch updates for performance

If you do count = count + 1, React won’t know to re-render.
setCount() tells React “something changed — update UI.”



🧠 REACT INTERVIEW QUESTIONS — PART 2 (Intermediate to Advanced)
1️⃣ What is the Component Lifecycle in React?

React components go through 3 main phases:

Phase	Description
Mounting	Component is created and added to the DOM
Updating	Component re-renders when props/state change
Unmounting	Component is removed from the DOM
🧩 Lifecycle using Hooks

React Hooks combine these phases inside useEffect().

Example:

useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);


Explanation:

useEffect(..., []) → runs once (mount)

return () => ... → cleanup when component unmounts

if you pass dependencies [count], it runs every time count changes (update)

2️⃣ What is Context API and why do we use it?

The Context API is used for global data sharing
→ to avoid “prop drilling”.

Prop drilling problem:

<App>
  <Parent>
    <Child name="GODX" /> {/* name passed through many layers *}
  </Parent>
</App>


Context Solution:

const UserContext = createContext();

function App() {
  return (
    <UserContext.Provider value="GODX">
      <Parent />
    </UserContext.Provider>
  );
}

function Child() {
  const name = useContext(UserContext);
  return <h1>Hello, {name}</h1>;
}


✅ Now any component can access name directly — no prop passing needed.

3️⃣ What is React.memo()?

React.memo() is used to optimize functional components
— it prevents unnecessary re-renders.

Example:

const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <p>Hello {name}</p>;
});


Now, if the parent re-renders but the name prop doesn’t change,
React will skip re-rendering the Child.

✅ Best for performance optimization when props rarely change.

4️⃣ What is useMemo() and useCallback()?

These are performance optimization hooks.

🧩 useMemo()

It caches the result of a computation — so React doesn’t recalculate it every time.

Example:

const expensiveValue = useMemo(() => heavyCalculation(num), [num]);


✅ React will only re-run heavyCalculation when num changes.

🧩 useCallback()

It caches a function, not a value —
useful when passing functions to child components.

Example:

const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);


✅ Without it, a new function is created on every render (causing child re-renders).

5️⃣ What is React’s Reconciliation Algorithm (Diffing)?

React compares old Virtual DOM with the new Virtual DOM after every update.

🔍 It looks for:

Same type elements → update attributes

Different types → destroy and recreate nodes

Lists with keys → match and reorder efficiently

Goal:
Update only what changed, not everything.

6️⃣ What are Keys and why are they important in lists?

Keys help React identify which list items are added, changed, or removed.

Example:

{users.map(user => <li key={user.id}>{user.name}</li>)}


🧠 Without keys, React might re-render or shuffle elements incorrectly.

✅ Always use a unique key (like id), never use index unless list order never changes.

7️⃣ What is the difference between useEffect() and useLayoutEffect()?
Hook	When it runs	Use case
useEffect	After the browser paints the screen	API calls, subscriptions
useLayoutEffect	Before the browser paints (synchronous)	DOM measurements, layout updates

⚠️ useLayoutEffect blocks painting until it finishes → use it only when necessary.

8️⃣ What is React Fiber?

React Fiber is the core engine (introduced in React 16)
that makes React’s rendering faster and interruptible.

🧠 Fiber breaks rendering work into small chunks and spreads them across frames —
so React remains responsive even during heavy rendering.

Simply: Fiber = React’s brain that controls scheduling and rendering speed.

9️⃣ What are Controlled vs Uncontrolled Components?
Type	Who controls input value	Example
Controlled	React state	<input value={name} onChange={handleChange} />
Uncontrolled	DOM itself	<input ref={inputRef} />

✅ Controlled = React always knows what’s typed (preferred for most apps).
Uncontrolled = use ref to directly access input value.

🔟 What is lifting state up?

When two sibling components need the same data → move (lift) state to their common parent.

Example:

function Parent() {
  const [value, setValue] = useState("");
  return (
    <>
      <Input value={value} setValue={setValue} />
      <Display value={value} />
    </>
  );
}


✅ Prevents duplicate states in multiple components.

11️⃣ What are Fragments in React?

Fragments let you group multiple elements without adding an extra <div>.

Example:

return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);


✅ Cleaner HTML structure, avoids unnecessary wrappers.

12️⃣ What is React’s Strict Mode?

<React.StrictMode> helps find potential problems:

Detects unsafe lifecycle methods

Warns about side effects

Checks for deprecated APIs

Example:

<React.StrictMode>
  <App />
</React.StrictMode>


🧠 Runs only in development, not production.

13️⃣ What is React Suspense and Lazy Loading?

They help load components only when needed, improving performance.

Example:

const Profile = React.lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Profile />
    </Suspense>
  );
}


✅ React only loads Profile when it’s needed.

14️⃣ What is Pure Component (or React.memo equivalent)?

A Pure Component re-renders only if its props/state change.

Functional version → use React.memo()
Class version → extend React.PureComponent

✅ Prevents unnecessary re-renders → better performance.

15️⃣ What are synthetic events in React?

React wraps browser events inside synthetic events for cross-browser compatibility.

Example:

<button onClick={handleClick}>Click</button>


The onClick event you receive is actually a React SyntheticEvent —
it behaves the same way across all browsers.

16️⃣ What is batching in React?

React groups multiple state updates into one re-render for better performance.

Example:

setCount(c => c + 1);
setName("GODX");


React batches both → re-renders once, not twice.


 You are importing three important components from the React Router DOM library:

BrowserRouter → The main routing provider.

Routes → The container that holds all route definitions.

Route → Defines one specific route (path → component mapping).

⚙️ 2. Why we need React Router?

By default, React is a single-page application (SPA).
That means — even if you have multiple "pages" (like Home, About, Contact), React only loads one HTML file (index.html).

To make users feel like they are navigating between pages, React Router manages URL changes and renders components dynamically — without reloading the page.

🧩 3. The basic structure
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />         {/* / → Home component *}
        <Route path="/about" element={<About />} />   {/* /about → About component *}
      </Routes>
    </Router>
  );
}


1️⃣ What is the difference between props and state?
Feature	Props	State
Definition	Data passed from parent to child	Data managed within the component
Mutable?	❌ Immutable (cannot be changed by the component itself)	✅ Mutable (can be updated using setState or useState)
Who owns it?	Parent component	The component itself
Use case	Passing data into components	Managing local UI data like input fields, toggles, counters

Example:

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  const [user, setUser] = useState("Rahul");
  return <Welcome name={user} />;
}


🧠 Props = input to a component. State = memory inside the component.

2️⃣ What is lifting state up?

If two components need to share the same state, we lift the state up to their common parent.

Example:

function TemperatureInput({ temperature, onTemperatureChange }) {
  return (
    <input
      type="number"
      value={temperature}
      onChange={(e) => onTemperatureChange(e.target.value)}
    />
  );
}

function Calculator() {
  const [temp, setTemp] = useState("");

  return (
    <div>
      <TemperatureInput temperature={temp} onTemperatureChange={setTemp} />
      <p>{temp >= 100 ? "Boiling" : "Not boiling"}</p>
    </div>
  );
}


🧠 Instead of keeping two copies of the same data, we keep one in the parent and share it.

3️⃣ Why does React use a Virtual DOM?

React doesn’t directly change the real DOM for every update — that’s slow.
Instead, it uses a Virtual DOM — a lightweight JS object that represents the DOM.

🌀 Process:

React updates the Virtual DOM when the state changes.

It compares (diffs) it with the previous Virtual DOM.

It updates only the changed parts in the real DOM.

✅ Result: Fast updates and smooth rendering.

4️⃣ What are controlled and uncontrolled components?
Type	Description	Example
Controlled	Input value is controlled by React state	value={stateValue}
Uncontrolled	Input value managed by DOM (via ref)	defaultValue and ref

Controlled Example:

function Form() {
  const [text, setText] = useState("");
  return (
    <input value={text} onChange={(e) => setText(e.target.value)} />
  );
}


Uncontrolled Example:

function Form() {
  const inputRef = useRef();
  const handleSubmit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} />;
}


🧠 Controlled = React manages.
Uncontrolled = Browser manages.

5️⃣ What is reconciliation in React?

Reconciliation is React’s process of:

Comparing the new Virtual DOM with the previous one,

And deciding what to update in the real DOM.

⚙️ Example:
If only one <li> changes in a list, React updates only that node instead of re-rendering the whole list.

🧠 This is why React apps are efficient — minimal real DOM updates.

6️⃣ What is the difference between rendering and committing in React?
Step	Description
Render Phase	React prepares changes — calculates what to update.
Commit Phase	React applies changes to the real DOM.

🧠 Render = Plan updates.
Commit = Apply updates.

7️⃣ What are React Fragments and why are they used?

React requires components to return a single parent element, but sometimes we don’t want extra <div>s.

✅ Solution: Use Fragments.

Example:

function Table() {
  return (
    <>
      <tr><td>Row 1</td></tr>
      <tr><td>Row 2</td></tr>
    </>
  );
}


🧠 <> </> = empty wrapper that doesn’t create an extra DOM element.

8️⃣ What are React keys and why are they important?

Keys help React identify which list items changed, were added, or removed.

Example:

{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}


❌ Avoid using index as key — it can cause bugs when the list order changes.

🧠 Keys make reconciliation efficient.

9️⃣ What are synthetic events in React?

React wraps browser events into a SyntheticEvent object —
this ensures consistent behavior across browsers.

<button onClick={(e) => console.log(e.type)}>Click</button>


🧠 You can still access e.target, e.preventDefault(), etc. — but React handles event pooling efficiently.

🔟 Why should we not modify state directly?

❌ Wrong:

state.count = state.count + 1;


✅ Correct:

setCount(prev => prev + 1);


Because React:

Needs to detect state changes for re-rendering.

Won’t trigger re-render if you mutate directly.

🧠 React compares previous and next state — mutation breaks that logic.


1️⃣ What are React lifecycle methods?

Lifecycle methods are special functions that run automatically at different stages of a component’s life.

🧩 For Class Components:
Phase	Method	Description
Mounting	constructor()	Initialize state
	componentDidMount()	Runs once after the component appears (good for API calls)
Updating	componentDidUpdate()	Runs when state or props change
Unmounting	componentWillUnmount()	Cleanup (like removing timers, event listeners)
🪶 Example:
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("Component mounted!");
  }

  componentWillUnmount() {
    console.log("Component removed!");
  }

  render() {
    return <h1>Hello</h1>;
  }
}

2️⃣ What replaces lifecycle methods in functional components?

👉 React Hooks!

Lifecycle Method (Class)	Equivalent Hook (Function)
componentDidMount	useEffect(() => {}, [])
componentDidUpdate	useEffect(() => {}, [dependency])
componentWillUnmount	useEffect(() => { return () => {...} }, [])

Example:

useEffect(() => {
  console.log("Mounted");

  return () => console.log("Unmounted"); // cleanup
}, []);


🧠 Hooks give functional components full lifecycle powers.

3️⃣ What is useEffect and how does it work?

useEffect() lets you run side effects (anything outside of rendering like fetching, event listeners, etc.).

✅ Example 1: Run once on mount
useEffect(() => {
  console.log("Runs once");
}, []);

✅ Example 2: Run when a value changes
useEffect(() => {
  console.log("Value changed:", count);
}, [count]);

✅ Example 3: Cleanup (like componentWillUnmount)
useEffect(() => {
  const interval = setInterval(() => console.log("Running..."), 1000);
  return () => clearInterval(interval);
}, []);


🧠 useEffect = "Run this effect after React updates the DOM."

4️⃣ What is memoization in React and why is it useful?

Memoization = caching the result of a computation so React doesn’t redo it unnecessarily.

React provides these hooks:

React.memo() — for components

useMemo() — for expensive calculations

useCallback() — for caching functions

Example 1: React.memo()
const Child = React.memo(({ value }) => {
  console.log("Child rendered");
  return <p>{value}</p>;
});


If the parent re-renders but value doesn’t change, React skips re-rendering Child.

Example 2: useMemo()
const expensiveValue = useMemo(() => computeSomething(data), [data]);

Example 3: useCallback()
const handleClick = useCallback(() => console.log("Clicked"), []);


🧠 Goal: Prevent unnecessary re-renders and heavy recalculations.

5️⃣ What causes unnecessary re-renders in React?

Changing state that’s not needed for that component.

Passing new function/object references every render.

Not using React.memo() where needed.

Using context incorrectly (causes all consumers to re-render).

🧠 React re-renders when props or state change — even if the rendered output is same.

6️⃣ What is React reconciliation (diffing) algorithm?

React compares the previous Virtual DOM and the new Virtual DOM to update only what’s changed.

Rules:

Different element types → replace the old tree.

Same type → compare props and children.

Use keys to identify items in lists.

✅ This makes React very fast and efficient.

7️⃣ What is the difference between React.memo, useMemo, and useCallback?
Hook	Used For	Returns	Common Use
React.memo	Memoize a component	Component	Prevent re-render of child component
useMemo	Memoize a computed value	Value	Expensive calculations
useCallback	Memoize a function	Function	Prevent function re-creation

Example:

const memoizedFn = useCallback(() => doSomething(a, b), [a, b]);

8️⃣ What are Pure Components in React?

A Pure Component automatically prevents re-renders if props/state haven’t changed (it does a shallow comparison).

Equivalent in functional component:

export default React.memo(MyComponent);


🧠 Saves re-renders → improves performance.

9️⃣ What is React batching?

React batches multiple state updates together to reduce re-renders.

Example:

setCount(count + 1);
setFlag(!flag);


✅ Both updates are batched → React re-renders once, not twice.

🧠 Batching = grouping multiple updates for better performance.

🔟 What happens during a React re-render?

Component function runs again (creates new JSX).

React compares new Virtual DOM with old one (diffing).

React updates only changed parts in real DOM (commit phase).

Browser re-paints.

🧠 React doesn’t re-render the whole page — only changed components.


⚛️ React Interview Questions — Part 5
(Routing, Context, and Performance Optimization)
1️⃣ What is React Router and why do we use it?

React apps are Single Page Applications (SPAs).
That means there’s only one HTML file (index.html), and navigation is handled without page reloads.

👉 React Router lets you:

Change the URL,

Show different components for each route,

Without reloading the page.

✅ Example:
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>🏠 Home Page</h1>;
}

function About() {
  return <h1>ℹ️ About Page</h1>;
}


✅ When you click on a link, React updates the URL (e.g. /about)
but doesn’t reload the page — it just renders <About />.

2️⃣ What is the difference between BrowserRouter and HashRouter?
Feature	BrowserRouter	HashRouter
URL Style	/about	#/about
How it works	Uses HTML5 History API	Uses URL hash fragment
Server setup needed?	✅ Yes	❌ No
Common use	Production websites	GitHub Pages / static hosting

🧠 HashRouter is safer for static sites that don’t handle routes on the server.

3️⃣ How does navigation work internally in React Router?

React Router uses:

History API (pushState, replaceState) to change the URL

A context system to tell components which route is active

React re-renders only the part that needs to change — not the whole page.

So when you click <Link to="/about" />, React:

Updates URL → /about

Re-renders only <About />

Keeps app state in memory (no refresh!)

4️⃣ What is Context API and when should you use it?

The Context API is a way to share data between components without prop drilling (passing props through many layers).

🧠 Use it when multiple components need access to the same data, like:

User authentication info

Theme (light/dark)

Language settings

✅ Example:
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}


✅ Any component inside <ThemeContext.Provider> can access or change the theme without props.

5️⃣ What are custom hooks and why do we use them?

Custom hooks let you reuse logic across multiple components.

If you find yourself copying the same useEffect or useState logic in multiple places —
👉 move it into a custom hook.

✅ Example:
import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

// use it
function MyComponent() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}


🧠 Custom hooks make your code clean, reusable, and testable.

6️⃣ What is React.lazy() and Suspense?

They are used for code splitting — loading components only when needed (lazy loading).

This improves performance by reducing bundle size.

✅ Example:
import React, { Suspense, lazy } from "react";

const About = lazy(() => import("./About"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <About />
    </Suspense>
  );
}


✅ Suspense shows a fallback while the About component loads.

7️⃣ What is prop drilling and how to avoid it?

Prop drilling happens when you pass data through multiple layers of components unnecessarily.

Example:

<App → Parent → Child → GrandChild>


If only GrandChild needs the data, this is inefficient.

✅ Fix it using Context API or state management tools (like Redux or Zustand).

8️⃣ What is React.Fragment and why use it?

A Fragment lets you group multiple elements without adding extra nodes to the DOM.

✅ Example:
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);


This avoids unwanted <div> wrappers in your markup.

9️⃣ What is the difference between Controlled and Uncontrolled Components?
Feature	Controlled Component	Uncontrolled Component
Data handled by	React state	DOM itself
Access value using	value & onChange	ref
Example	Forms	Simple file inputs
✅ Example (Controlled):
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />

✅ Example (Uncontrolled):
const inputRef = useRef();
<input ref={inputRef} />

🔟 What is React.StrictMode and why use it?

<React.StrictMode> is a wrapper that helps find potential issues during development.

It checks for:

Unsafe lifecycles

Deprecated APIs

Side effects in render

✅ It doesn’t affect production.

Example:

<React.StrictMode>
  <App />
</React.StrictMode>

⚛️ React Interview Questions — Part 6
(State Management, Re-rendering, React Fiber & Advanced Scenarios)
1️⃣ What is state management, and why do we need it?

Every React app needs a way to store and share data between components.

Small apps → useState, useReducer, or Context are enough.
Large apps → you’ll need external state management tools (like Redux, Zustand, Jotai, or Recoil).

2️⃣ Why not use only useState and Context for everything?

Because of performance and scalability:

Problem	Example	Why it’s bad
Prop drilling	Passing data from parent → child → grandchild	Makes code messy
Unnecessary re-renders	Context updates cause all consumers to re-render	Slows UI
Complex updates	Nested or async updates	Hard to debug

🧠 So for big apps, we use state management libraries that optimize updates.

3️⃣ What is Redux, and how does it work?

Redux is a predictable state container — it centralizes all app state in one store.

⚙️ Key concepts:

Store – the global state container.

Action – describes what happened (e.g. { type: "INCREMENT" }).

Reducer – pure function that decides how state changes.

Dispatch – sends actions to reducers.

✅ Example:
// reducer
function counterReducer(state = { count: 0 }, action) {
  if (action.type === "INCREMENT") return { count: state.count + 1 };
  return state;
}

// store
const store = createStore(counterReducer);

// update
store.dispatch({ type: "INCREMENT" });


🧠 Redux enforces a one-way data flow:
Dispatch → Reducer → New State → UI Re-renders

4️⃣ What is the difference between Redux and Context API?
Feature	Redux	Context API
Purpose	Global state management	Pass data without prop drilling
Performance	Optimized updates	Causes all consumers to re-render
Tooling	DevTools, middleware	None built-in
Best for	Large, complex apps	Small or medium apps

💡 You can think of Context as “lightweight global state,” and Redux as a structured, scalable solution.

5️⃣ What is Zustand (modern alternative to Redux)?

Zustand is a lightweight state management library that’s:

Simpler than Redux

Built on hooks

No reducers or actions required

✅ Example:
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}));

function Counter() {
  const { count, increment } = useStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}


🧠 Zustand updates only components that use the changed part of the state, making it super-efficient.

6️⃣ What is React Fiber, and why was it introduced?

React Fiber is React’s internal engine (since React 16) for reconciliation — it controls how React decides when and what to render.

Before Fiber → React rendered everything synchronously.
With Fiber → React can pause, resume, or cancel rendering tasks.

🧠 In short, React Fiber makes React asynchronous and interruptible, improving UI responsiveness.

🧩 Example (conceptual)

If your app updates thousands of elements:

Old React would freeze the browser 🧊

Fiber breaks work into small “units” and spreads them across frames
→ UI stays smooth even under heavy load 🎯

7️⃣ What are rendering phases in React?

React’s work happens in two phases:

Phase	What happens	Can it be paused?
Render Phase	Re-runs components → builds new virtual DOM	✅ Yes
Commit Phase	Updates real DOM	❌ No (must be fast)

🧠 Hooks like useEffect run after the commit phase.

8️⃣ Why does a component re-render?

A component re-renders when:

Its state changes

Its props change

Its parent re-renders and passes new props

Context it consumes changes

🧠 React compares the new Virtual DOM vs the old one → updates only what changed.

9️⃣ How do you prevent unnecessary re-renders?

✅ Use React.memo
Prevents re-render if props didn’t change.

const Child = React.memo(({ name }) => {
  console.log("Render child");
  return <p>{name}</p>;
});


✅ Use useCallback & useMemo
Cache functions or computed values to avoid new references.

✅ Split context
Don’t put all app data in a single Context — create smaller ones.

✅ Avoid inline objects/functions
Because they create new references on every render.

🔟 Advanced Scenario: Parent–Child Re-render Issue
❌ Problem:
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = () => console.log("clicked");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child onClick={handleClick} />
    </>
  );
}


Every time parent re-renders, handleClick is recreated →
Child re-renders even if it doesn’t need to.

✅ Solution:

Use useCallback

const handleClick = useCallback(() => console.log("clicked"), []);


Now React reuses the same function reference → no unnecessary child re-render.

💡 Bonus: Common tricky interview questions
❓ Why should you avoid modifying state directly?

Because React tracks state via setState or setSomething().
If you mutate directly (state.value++), React won’t know it changed → no re-render.

❓ What’s the difference between Virtual DOM and Real DOM?

Real DOM: slow updates → changes the actual HTML structure.

Virtual DOM: a lightweight copy that React uses to calculate minimal changes before updating the real DOM.

❓ What is reconciliation in React?

The process of comparing the new and old Virtual DOM trees and applying only the necessary DOM updates (diffing algorithm).