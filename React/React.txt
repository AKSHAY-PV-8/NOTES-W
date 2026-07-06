
REACT
=====================================

.event propagation

1.what are components?
            .a components is like a building block of React app
            .each componet is a reusable piece of UI
                that can accept inputs(props),(pops are inly input a component recevies from ouside )
                can have its own state. -> to maintain interanal data.
                return JSX(ui)

2.what are props?
              its like a paramenter for componets , passed by its parent.

3.why react reaacvies props only?
              Because React’s goal is to make UI predictable and easy to test.

4.why react is efficient ?

            🚀 1. What Does “Efficient” Mean Here?

            When we say React is efficient, we mean:

            React updates the UI very fast — even when your app’s data changes frequently.

            In a normal web app, changing something on the screen can be slow, because directly manipulating the real DOM (the browser’s UI tree) is expensive.
            React solves that problem brilliantly ⚙️

            🧱 2. DOM — The Root of the Problem


5.what is DOM ?
              dom stands for Document Object MOdel.
              => it's a programing inferface() that represents the HTML page as tree of objects
                <html>
                <body>
                  <h1>Hello</h1>
                  <p>Welcome to DOM</p>
                </body>
              </html>
              The DOM tree looks like this:

              css
              Copy code
              Document
              └── html
                    └── body
                        ├── h1
                        │    └── "Hello"
                        └── p
                              └── "Welcome to DOM"

                Let’s understand why the DOM (Document Object Model) is slow:



                Imagine this HTML:

                <div id="app">
                  <h1>Hello</h1>
                  <p>Welcome!</p>
                </div>


                If you change the text using JavaScript:

                document.getElementById("app").innerHTML = "<h1>Hi</h1><p>Bye!</p>";


                ➡️ The browser must:

                .Rebuild part of the DOM tree
                .Recalculate CSS
                .Repaint the screen

              =>This is slow, especially when many elements or       animations are involved.


6.what is Virtual Dom?
        ⚙️ 3. React’s Secret Weapon — The Virtual DOM

            React introduces the Virtual DOM, which is a copy of the real DOM kept in memory (JavaScript object form).

            When your data changes, React:

            Creates a new Virtual DOM based on new state.

            Compares it to the previous Virtual DOM (this process is called diffing 🕵️‍♂️).


            Finds exactly what changed.

            Updates only those parts in the real DOM.

            Example 👇

            Before:
            <h1>Hello</h1>

            After state update:
            <h1>Hi</h1>


            React compares both trees:

            <h1>Hello</h1> → <h1>Hi</h1>


            ✅ Only the text changed — so React updates just that text node, not the whole page.

            This makes updates super fast and efficient ⚡

7. Why Virtual DOM Is Faster?

            =>Step	Without React and	With React

               -Data changes	Browser re-renders large portions of DOM	React re-renders only changed components

              -DOM updates	Multiple slow operations	Minimal, batched updates

              -Reflow & repaint	Happens often	Happens less often
              Developer effort	Must manually manage DOM	React automates it

  sub) what is component base architecture?

            🧩 5. Component-Based Architecture

            React splits your UI into small reusable components,
            each with its own state and logic.

            This means:

            Only components whose state or props change will re-render.

            The rest of the page remains untouched.

            ✅ Example:

            function App() {
              return (
                <>
                  <Header />
                  <Counter /> {/ only this changes }
                  <Footer />
                </>
              );
            }


            If Counter updates its state, only that part re-renders —
            not the entire App or Header or Footer.

            That’s another reason React is efficient.

8. React’s Reconciliation Algorithm

            => Fiber algorithm is React's internal reconciliation engine

            👉 In simple words:

              fiber algorithm decides how react should process, schedule, pause, resume and commit UI updates

              (Reconciliation = Comparing old UI tree vs new UI tree → updating only what’s necessary.)

          -> each fiber is a date Structure(a JS object) that represnet one component

  sub) Why react need Fiber ?
            
            before React 16 , React used a stack-based reconciliation algorithm.

        problem :

            ->it was synchronous and non-interruptible

                        (non-interruptible means :- ones a task start, it must finish completely before React can do anthig else. it cannot pause or be stopped midway.)

            ->If there is a large component tree (say 5,000 elements), React would:

                .Reconcile all of it in one go,
                .Block the browser main thead,
                        (main thread in browser:- it like a brain for browser, main thread is respomsible for almost everything that makes a webpage fell alive:
                          tasks like:
                            running js code , running css animations layouts, styles
                        )
                .result -> UI freezing, dropped frames, lag.


            -> so react indroduce Fiber algorithm
             
            .fiber is a unit of work that represent a react Element
            .fiber tree as react's linked list verion of component tree

            Fiber algorithms  core idea
                -> implements cooperative scheduling --- meaning it can split work into chunks andprocess them incrementally.
                                                                     

          =>React uses a smart algorithm (called Fiber) to:

            Compare old and new Virtual DOM trees efficiently.

            Decide which updates are high priority.

            Split work into chunks (so your app stays responsive even during heavy updates).

            This makes React smooth, especially for animations and large UIs.

          => Batched Updates

            React doesn’t immediately update the DOM on every small change.
            Instead, it batches multiple updates together.

            Example:

            setCount(count + 1);
            setName("Alice");


            React will combine these into one render — not two.

            ✅ Result: fewer DOM updates → better performance.

          => Declarative UI = Less Work for You

            Traditional JS:

            if (count > 5) {
              document.getElementById("msg").textContent = "High!";
            }


            React:

            <p>{count > 5 ? "High!" : "Low"}</p>


            You just declare what UI should look like,
            and React efficiently figures out how to update it.
            That’s simpler and more optimized internally.


9.how HTML run in react ?

      the HTML see in react is not actualy a HTML

      -> it look like HTML but it actually JSX(js XML)

        befor the reacet code runs in browser , Bable (a complier) converts JSX into pure js.
        the it return js 

        so when react run it is not run HTML ---
        it runs JS that builds a Virtual DOM

        when react executes that code, it bilids a Virtual, this is not display
        yet---it just Reacts internal "bluePrint" of your  HTML

        then comapre and if changes occer render the changes only


10.in js we can store a value and do function but in react we manitain state why what is the use and why we do that ?

          🧠 1. In plain JavaScript — the browser doesn’t “react” automatically

          If you write:

          <p id="count">0</p>
          <button onclick="increase()">Click</button>

          <script>
            let count = 0;

            function increase() {
              count++;
              document.getElementById("count").textContent = count;
            }
          </script>


          ✅ Works fine — but notice:

          You manually change the DOM every time (getElementById, .textContent = ...)

          The browser does not know that count changed — you must tell it.

          🧩 So JavaScript variables don’t automatically update the UI when they change.

          ⚛️ 2. In React — you never touch the DOM directly

          In React, you write something like:

          function Counter() {
            const [count, setCount] = useState(0);

            return (
              <div>
                <p>{count}</p>
                <button onClick={() => setCount(count + 1)}>Click</button>
              </div>
            );
          }


          When you click the button:

          React automatically detects that count changed.

          React re-renders the UI with the new value.

          You don’t write any getElementById, .innerHTML, etc.

          🔥 React does the DOM update for you.

          🧩 3. So what exactly is “state”?

          Think of state as a special variable that:

          React watches automatically 👀

          If it changes → React updates the screen for you

          const [count, setCount] = useState(0);


          means:

          count → the current value

          setCount() → a function that tells React “update this value and re-render the UI”


11. what is components?

          A components in react is just a function or class that returns UI (JSX)

          we can think of it as a resuable, isolated piece of interface -- like buttun, navbar, sidebar , etc

          function Button() {
            return <button> Click me <button/>
          }

      sub) Why component exist ?
          
            ->without component, a webpage would be one gaint file of HTML --- impossoble to manage
            ->react breaks UI into independent, reusable, and testable units.

                <App>
                  <Navbar />
                  <ProductList />
                  <Footer />
                </App>                                       

      sub)Types of components?

              1. stateless function components :- function welcome(prop) {
                                                      return <h1>hello, {props.name} </h1>
                                                  }

              2. stateful classs components :- class welcome extends React.Component {
                                                      render(){
                                                      retrun <h1> hellow </h1>}
                                                  }

      sub) what is the difference between React Elements and components ?
                
                =>components :- The function or class definition (like function Button() {})
                =>Element :- The object React creates when we use <Button/>
                =>DOM node:- the actual thing rendered in browser

      sub) what is Component lifecycle (Functional)

                .Mounting => Component is created and added to DOM.
                .Updating => Component's  props/state changes, and React re-renders it
                .Unmounting => Components is removed form the DOM


                                                              
import/Export things
---------------------


.if we use => export default Component -> we can import like
                                        import Components from './components'

.if we use => export const Component -> we can import like 
                                        import {Component} from './components'  

.functional components
------------------------*******
->its a js function that recieves propeties(props) and return HTML.

.Class components
------------------*********
->its also receives pops and return html , but it maintaine orivet internal state


functional components ->DATA FLOW ///////////////

        function hello(props) => {
                return <h1> hello {props.name} </h1>
            }

        when we create a function component like above 

        1. function return a jsx like => helloe({name: "amal"});
        2. browser dont understand jsx only understand plan js 
          - babel conver jsx to react.createElement("h1", null, "hello amal") ;
          -------
        3. reconciler figures out what changes are occres
            ---------

            reconciler => . is react's decision maker
                          . it compare old virtual DOM vs new virtual DOM
                          . then figures out minimal changes 

        4.react renderer update real DOM efficiantly
          --------------

            react renderer => . the builder 
                              . when the reconciler decides what should change ,
                                renderer update the actual screen

virtual DOM(aditional topic)
----------------------------

. before changing the real DOM, react builds a virtual copy of DOM in memory
. real dom is slow to change
. virtual DOM is fast (it's just a js object)



class components -> DATA FLOW ///////////

            class hello extends React.Component{
                render(){
                    retrun <h1>hello {this.props.name} <h1>
                }
            }

            1. when react see a <h1>hello {this.props.name} <h1>

                creat a new instance -> instance is unusable object created from class (bluePrint)
                
                const instance = new hello({name: "amal"});

            2. hello extends react.Component, the constructor from react.compontent runs ->
              which setUp this.props and this.state
                            -----------------------

            3. class render() it returns jsx -> compiled to React.createElement



12. what ara props and state?

            props:- props is just an object that contains the attributes and its value pased for its parent component
                    child component receives it as argument

            state:- internal date of a component

            what are setState?
                  setState = tells react update the UI

              in class component
              -> this.state => holds the date 
              -> this.setState() => updates it

              props                               |  state 
              ------------------------------------|------------------------------------
              .props get passed to component      |.state is managed with in component
              .function parameters                |.variables declared in function body
              .props are can't make change by     |.state can be changed
              childercomponent                    | 
                                                  |
              props                               | useState Hook 
            ===========================================================================


            Feature	              Props	                        State
            Who owns it?	        Parent component	            The component itself
            Mutable?	❌         Immutable (read-only)	        ✅ Mutable (can change using setState / useState)
            Source of data	      Passed into a component	        Managed inside a component
            Triggers re-render?	  Yes (if new props differ)	      Yes (when state changes)
            Example	              <Greeting name="Akshay" />	    const [count, setCount] = useState(0)


    sub) What actually happends when you use props ?

            In react data alwaysflow down the components tree, form parent -> child.

              This means:

                  =>  A parent passes props down to a child.
                  =>  A child never directly modifies its props.
                  =>  A child can update its own state, but not its parent’s.


                  example:

                      function Greeting({ name }) {
                        return <h1>Hello, {name}</h1>;
                      }

                      function App() {
                        return <Greeting name="Akshay" />;
                      }

           => Step by step

              1.  App renders => Reacte create a Fiber node (A internal onject) for App.
              2.  Inside it, sees <Greeting name = "Akshay"/>
              3.  React create new fiber for Greeting
              4.  It stores the props in the fiber node
                      fiber.memoizedProps = {name : "Akshay"}
              5. react calls the component function:
                      Greeting({ name: "Akshay"})
              6. reaturns a virtual DOM <h1>Hello, Akshay</h1>

              when App re-render with a different prop (name = "React"), React compares:


      sub) what happend when you use State

                  Example:

                      function Counter() {
                        const [count, setCount] = useState(0);
                        return <button onClick={() => setCount(count + 1)}>{count}</button>;
                      }

                                                                               
                   step 1: Mount phase (first render)        

                        when the component first runs:
                            1. React creates a Fiber noder for Counter.
                            2. it find that youire calling a Hook (useState)
                            3. react create a interanal Hook object and attaches it to that fiber:
                                fiber.memoizedState = {
                                  memoizedState = 0,
                                  queue: []
                                }
                            4. useState(0) return [0, dispatchFunction]    
                              that dispatchFunction (setCount) is bounded to same fiber abd hook.

                                                                                                                                                                
                    step 2: Update phase (after setCount)

                        when we call:
                              setCount(count + 1)

                              React does not immediately update the DOM.
                              Instead:
                                  1. It creates an update object and pushes it into the hook's queue:
                                       hook.queue.push({ action: newValue });
                                  2. Marks the fiber as needing work (fiber.lanes in React's scheduler)
                                  3. React shedules a new render for that componet
                                      -after sheduling React begins the next render cycle for this component
                                      -so during the render react reads queue for each hook
                                  4. when react runs again, react finds the same Fiber  and same hook list.

                                      React does internally like :

                                        let baseState = hook.memorizedState //0
                                        for(let update of hook.queue) {

                                          baseState = update.action; // 1

                                        }
                                        hook.memoizedState = baseState; // 1
                                        hook.queue = []; // clear queue after applying

                                    5. React calls component again with new state
                                        but this time React doesn't use 0, it uses the memoizedState stored in hook Object(1)

                                        so return 
                                          [count , setCount] = [1, dispatchFunction]
                                    6. Now react compare old virtual DOM and new virtual DOM
                                        updates only that part of DOM

            sub) How React tracks mulitiple states (mulitple useState calls)   

                              if we write:

                                  function Example() {
                                    const [count, setCount] = useState(0);
                                    const [name, setName] = useState("Akshay");
                                  }

                              =>React doesn't tracks them by variable name --- it tracks them by order of hook calls.
                              =>that's whywe must never call hook conditionally

                                  internally:
                                      fiber.memoizedState -> Hook1 -> Hook2 -> null
                                      
                                      .Hook1 = count
                                      .Hook2 = name
                                      .Each hook has { memoizedSate, queue, next }
                                    
                                    during updates, React walks this linked list of hooks attached to the fiber.


                sub) what is relation between Props, State snd Fiber ?

                                all storder inside a fiber node is like :
                                    FiberNode = {
                                      type: Counter,
                                      memoizedProps: { /* current props */ },
                                      memoizedState: { /* linked list of hooks */ },
                                      alternate: { /* old fiber for diffing */ },
                                      updateQueue: { /* side effects */ },
                                      ...
                                    }


                                    Field	               Purpose
                                    .memoizedProps	     The current props passed into the component
                                    .memoizedState	     The component’s internal state (hooks)
                                    .alternate	         The previous version of this fiber (used during reconciliation)

                                    When you update props or state:

                                      .React builds a work-in-progress fiber (new version)
                                      .Compares it to the alternate fiber (old version)
                                      .Updates only what changed

                  IMP
                  => state Updadates are asynchronous
                        When we call setState or setCount, thevalue doesn't change immediately.

                        React batches updates together to optimize rendering.

                                    example:

                                        setCount(count + 1);
                                        setCount(count + 1);
                                        console.log(count); // still old value

                                        React schedules both updates, then processes them together before the next render.

                                      =>This is why we sometimes use functional updates:

                                          setCount(prev => prev + 1);
                                          
                                        This ensures React always uses the latest value, no matter when the update runs.
                    
13.what is desturcturing props?

          const greet = props => {
              const {name, age} = props
              retrun (
              <h1>{name} age: {age}</h1>
              )}
    


14.what is eventhandler?
        is just a function that run when an event happends

      ->when use evenhandlers don't use ()
          ex: <button onClick = {clickHandler}> Click </bttuon>

          clickHandler is the event handler - don't use ()


RENDERING
----------

15. what is rendering ?
              react calling your component function to figure out what the UI should look like right now.



16. what is conditional rendering ?

        show different UI depending on a conditon (true/false, value, state, etc).

        So whenever React “renders”:
            =>It executes the component function (function MyComponent() { ... })
            =>It returns a React element tree (the “Virtual DOM”)
            =>It doesn’t immediately update the real DOM — it first compares (diffs) it with the previous one.


17. what is re-rendering ?

              A re-render happens when react decides it need to recalculate a component's output
              because something it depends on has changed

18. when does react render ?

            -> initial render (Mounting phase) happends when a component is created for the first time
                                              

              For example:

                    function App() {
                      return <Greeting name="Akshay" />;
                    }


                    Step-by-step:

                    1.React creates a Fiber node for App.
                    2.React calls App() → returns <Greeting name="Akshay" />.
                    3.React creates a Fiber for Greeting.
                    4.Calls Greeting() → returns <h1>Hello Akshay</h1>.
                    5.React builds the DOM and attaches it to the page.

                    ✅ This is first render — happens once per component mount.

19. when does react re-render (Update Phase) ?

                    4. When Does React Re-render (Update Phase)?

                      After the component is mounted, React will re-render it only when its inputs change.

                      Those inputs are:

                      1.Props — Data passed from parent.
                      2.State — Managed internally by the component.
                      3.Context — If using React context, when value changes.
                      4.ForceUpdate() — (class components) manual re-render.
                      5.Parent Re-render — When parent re-renders, child may re-render.

questions RELATED TO RENDERING

            1. when does a react component re-render?

                      Tricknes: Most say " when state or poprs change" but that's incomplere.

                      a componenet re-render when:
                        1. its state change (via setState or useState setterr)
                        2. its parent re-render, and React calls it again with possibly new props 
                        3. A context value it consumes changes
                        4. A forceUpdate() or key change occurs 

                sub)what is forceUpdate() ?
                    
                              ->forceUpdate() is a  method available only for class components, not in functional components
                              ->Re-render this components even if nothing changed in state or props.

          sub) what is React.memo ? 

                      =>React.memo is a wrapper that makes a component re-render only when its props change.

              sub)what does React.memo actually doing ? 
                        
                        => when we wrap with React.memo react does 3 things: 

                            1. Stores the previous props (memoized props)
                            2. On next render -> shallow compares old props vs new props
                            3. If props are same -> React skips rendering the component

                            example: 

                                  const Child = React.memo(({ name }) => {
                                    console.log("Child render");
                                    return <h1>{name}</h1>;
                                  });

                          Parent:
                      
                                  <Child name="Akshay" />

                              Parent re-renders with the same name:

                                  newProps = { name: "Akshay" }
                                  oldProps = { name: "Akshay" }

                              React runs:

                                  Are props same? Yes → shallowEqual → true
                                  So React:

                                  ❌ does NOT call Child() again
                                  ❌ does NOT generate new VDOM
                                  ❌ does NOT call reconciliation
                                  ❌ does NOT update the DOM

                                  ✔️ returns last rendered version
                                  ✔️ saves performance
                        
                sub)when does React.memo Fail (important) ?

                            =>Because object/ array/ functions always have new identity: 

                                   <Child user={{ name: "Akshay" }} /> 

                            =>Every render creates a NEW object:

                                    prev.user !== next.user

                                    So React.memo won’t skip.

                                  =>That’s why we use useMemo and useCallback.
                
                sub)If React already re-renders components, then what is the importance of React.memo?

                                  =>when a parent component re-renders: 

                                    all of its children re-render by default

                                      -> so we use React.memo()

                              EXAMPLE: 

                                  function Chils({value}) {
                                      console.log("Child rendered");
                                      return <div>{value}</div>
                                  }


                                  function Parent(){
                                    const [count, setCount] = useState(0);

                                    return (
                                      <>
                                        <button onclick={() => setCount(count+1)}>+</button>
                                        <Child value="AKSHAY"/>
                                      </>
                                    )
                                  }

                            => even though Child receives SAME prop ("AKSHAY"),
                            it re-renders every time parent updates. 

                            ⭐ 4. WITH React.memo:
                                  
                                  const Child = React.memo(function Child({value}){
                                    console.log("Child rendered");
                                    return <div>{value}</div>;
                                  });

              sub) what is memoized ? 
                                  
                              Memoized = stored + reused. 

                            =>in React "memoized" means:
                                  
                                  React saved the previous result of something(props,state,DOMException, render output, CSSMathValue, calculation)
                                  so it can reuse it without recomputing. 

                          ---Memoization => remembering the last output and 
                                          Reuseing it if inputs didn't change. 

            2. If a parent re-renders but child props dont's Change , will child re-render ? 
                      
                        By default , yes --- react re-render the child(calls it's function again). 

                        unless you:
                          .wrap the child with React.memo()
                          .or use PureComponent (for class components)

            sub) what is purecomponent ?  

                            -> is special type of component that automatically prevents unnecessary
                                re-renders by doinga shallow comparison of its props and state

            sub) what is shallow comparison ?

                            -> it is used bu React.memo, useMemo, useCallback, reconciliation optimization 

                            -> React only checks one level deep of props or state to see if something changed. 

                                -it checks promitive values by value
                                -it checks objects/ arrays/ functions by reference only (NOT by content)


                                example:

                                    1 === 1          // true
                                    "hi" === "hi"    // true

                                    =>If primitives are SAME → React thinks “no change → no re-render”

                                  ---Object/Arraya--

                                      react does not open and inspect object contents. 

                                      it checks only the memory reference, like:

                                        { a: 1 } === { a: 1 }   // false (different memory reference)

                                        => Even though content is same → React treats them as DIFFERENT.


                    sub)why shallow comparison matters? 

                                            imagine comapring a gaint object :

                                              {
                                                user: [...10000 items],
                                                config:{...},
                                                report: [...]
                                              }

                                              deep comparison = slow
                                              shallow comparison = instant

                                              => so react chooses shallow compare for speed. 

                                              ❌ React will re-render
                                              ✔️ Even though content is same

                      sub) why reference matters ? 
                                              every time you create a new object:
                                                -react treats it as a NEW value because it sits in a different memory address

            3. what is difference between "render and commit" phase in React ? 
                    
                  => Render phase:
                            .React calculates what should change (diffing virtual DOM)
                            .This phase is pure (no side effects) 
                            .can be aborted, or reused (thaks to FIber)


                        => in this phase :
                                  . calls your component functions 
                                  . Reads props 
                                  . Reads state 
                                  . Builds Virtual DOM
                                  . Decides what need to change 
                                  . Creates the Fiber tree 
                              
                            But it does NOT touch the actual browser DOM yet. 

                        sub)why render phase be pure ?

                                  because React may run the render phase :

                                              .multiple times 
                                              .paertially 
                                              .pause it 
                                              .restart it 
                                              .throw it away
                                              .resumlate

                                        if your render logic causes side effects (like API calls, timers, logging, DOM mutations):

                                        ❌ They would run multiple times
                                        ❌ They may run and then React discards the work
                                        ❌ They might run in inconsistent order
                                        ❌ They break predictability

                                  => so render phase is pure

                  => commit phase:
                            .React applies the changes to the actual DOM. 
                            .This phase is non-interruptible and side-effect safe. 
                            .React run useEffect and lifecycle methods here . 


            4. React re-render all components when state updates? 
                        => No -- React re-render only:
                          . The component whose state chaged,
                          . And its descendants (unless memoized). 
                        React uses Fiber reconciliation to track which parts of the tree changed.

           5. What causes unnecessary re-renders and how do you prevent them ? 
                        => 
                        1. passing new object/ function references as props each time .
                        2. unstable dependencies in useEffect. 
                        3. Using context that changes too often
                        4. updating global state unnecessarily

                        solutions:
                          . React.memo()
                          . useCallback() / useMemo()
                          . Splitting context
                          . immutable updates

            6. what happends if you call setState(or setCount) multiple times in a same render? 
                      -> React batches into one during the same event loop tick. 
                      -> All state updates inside a single event are merged before re-render.


               
            7.what the difference between useMemo and React.memo ? 
                        =>React.memo :- skips re-render a component if its props haven't changed. 
                        =>useMemo :- skips re-computing an expensive value inside a component if dependencies have't ChannelMergerNode. 

                        // useMemo: caches value
                        cosnt value = useMemo(() => computeExpensiveThing(), [input])

                        // React.memo: caches component output
                        const Child = React.MediaElementAudioSourceNode(component)

            8. why does react use a "virtual DOM" before updating the real DOM?

                        -> because direct DOM operaions are slow. 
                        -> React first creates a Virtual DOM TreeWalker, computes differences (diffing)
                        and only updates the changed nodes in thereal DOM. 
                        
                        This minimizes expensive DOM writes -> improves performance. 

            
          9. What is difference between "re-render" and "reconciliation"? 

                      => Re-render:
                              when react calls your component function again to get new JSX

                      => Reconciliation:
                              the process where React compares new virtual DOM tree with previous onemptied,
                              figures out what changed, and updates the real DOM accordingly. 

          10. What happends when React.memo is used with a prop that's an object ?

                            =>
                              -React.memo uses shallow comparison. 
                              -so if you pass a new object reference (like {name:"akshay"}) ract time,
                              -react treats it as changed -> triggers re-render. 

                              fix:
                                Use useMemo to keep the object reference stable:
                                    const user = useMemo(() => ({ name: "Akshay"}), [])
                                    <Child user={user}/>


          11. Why doesn't useEffect run every render even when the component re-renders?

                            =>
                              Because React tracks the dependency array. 
                              - useEffect runs only when at least one dependency has changed (shallow comparison).

                               if you pass an empty array -> it runs only after mout and on unmount cleanup. 
                              
          12. Does React.memo prevent re-renders caused by state updates inside the same components?

                        => No,
                            React.memo only affects props comparison from parent. 

                            if the component's own state chnages -> it always re-renders 

          13. what happens when you mutate state directly in react ? 

                      const [user, setUser] = useState({ name: "Akshay"});
                      user.name = "Rahul";  // direct mutation 
                      setUser(user) ;

                      =>
                        React won't detect any ChannelMergerNode, because the reference didn't change. 
                        it won't re-render -> UI stays stale.
                        

                      correct:

                          setUser({ ...user, name: "Rahul"});

                          New object -> new reference -> triggers re-render. 

          14. what the difference between synchronous and concurrent rendering in React 18? 

                    => Synchrounous rendering (old react):
                          . Once rendering starts, React blocks until it findishes. 
                          . Can freeze the UI on large trees.  

                    => Concurrent rendering (React 18):
                          .React can pause, interrupts, resume, or drop renders
                          .keeps UI responsive. 
                          .Enabled by Fiber. 

          15.  what is "bailout" in React Fiber? 

                    => During reconciliation, if React detects that props and state haven't changed,
                    it bails out -- skips rendering that fiber and all its children. 

                    used in:
                      . React.memo
                      . PureComponent
                      . ShouldComponentUpdate

          16. How does React decide what to render when you call setState twice before commit ? 

                    =>
                      -React merges the updates in its update queue. 
                      -Only after processing the queueMicrotask, react performs a single reconiliation -> single render.

          17. 



JSX & React.createElement()
---------------------------



20. what is JSX ?

        JSX is syntactic sugar for writing UI in a way that look like HTML. 

        -But  browsers cannot understand JSX, so Babel converts it into normal JavaScript


21 what Does React.createElement() actually do ?

            it does NOT create a DOM element. 

              -> it creates a React Element object (a plain JS object)

              Example:

                const el = React.createElement("h1", { id: "title" }, "Hello");

            => React creates an object like:

                {
                  type: "h1",
                  props: {
                    id: "title",
                    children: "Hello"
                  }
                }

            => This object is called a Virtual DOM node.



22. Why React uses createElement instead of creating DOM directly ?

          Because React wants to: 

                . Track changes using Virtual DOM
                . Compare old vs new tree 
                . Only update what changed 
                . Batch updates 
                . Avoid full DOM re-renders 

          DOM is slow -> React Elements (JS object) are fast.


23. Render phase vs commit phase (important)

            Reder Phase 

                  . React calls your components 
                  . Executes JSX -> createElement() -> virtal DOM tree 
                  . Pure: NO DOM changes
                  . Safe to run multiple times 

            Commit Phase 

                  . React takes the diff 
                  . Updates the real DOM 

          so JSX -> Virtual DOM -> Reconciliation -> DOM update. 


24. why is JSX important if createElemnet already exists ?

          JSX is:

                . easier to write 
                . more readable 
                . less verbose
                . similar to HTML


        Without JSX:
            return React.createElement(
              "div",
              null,
              React.createElement("h1", null, "Hi"),
              React.createElement("p", null, "Welcome")
            );

        With JSX:
            return (
              <div>
                <h1>Hi</h1>
                <p>Welcome</p>
              </div>
            );

25. is the babel conver the jsx to js using createElement () ?

          => yes, Bable convert jsx into js using react.createElement() (in React 16 and below). 

          => But in react 17+ , Babel converts JSX using a new system called the "JSX transform", which
          does not explicitly call React.createElement but still does the same job under the hood . 


        => After React 17 — New JSX Transform (no need to import React)

            React 17 introduced a new JSX transform. 
              => now Babel converts JSX into helper function from react/jsx-runtime. 



    sub)Why React changed this?
    
        1️⃣ No need for import React at the top of every file

        Before React 17:

          import React from "react";

        Was required for JSX to work.
        Not anymore.

        2️⃣ More optimized element creation

          jsx() and jsxs() are faster than React.createElement().

        3️⃣ Smaller bundles in production

          The new transform creates fewer intermediate objects.



HOOKS
-----

        useState 
        ---------

    Core Idea : useState uses an Internal Queue of updates
    
            whenever you call:

              setCount(prev => prev + 1);

          => react does not immediately update state.
            
          instead: 

          🔥React creates an update object
              and puts it into a linked list queue inside the component's Fiber node. 

            then during the next render: 
              . React processes the whole queue 
              . applies all updates in order 
              . computes the finsal state




26. what is inside a useState hook in React? 

            => every hook in a component has a hook object stored on the Fiber: 

            stucture (simplified):

                hook = {
                  memoizedState : <current state>,
                  queue: {
                    pending: <circular linked list of updates>
                  },
                  next: <next hook> // because hooks form a linked list
                }


        example: 

            const [count, setCount] = useState(0); 

                inside the Fiber:

                    memoizedState = 0;
                    queue = {pending: null}

          =>When you call setCount()

                Example:
                   
                   setCount(prev => prev + 1)
                
                => react doesn't update immediately. 

                Instead it creates: 

                    🔸 An update object:

                        update = { 
                          action: prev => prev + 1,
                          next: null
                        }

                    🔸 Pushes this into the update queue:

                        queue.pending -> update -> (points back to queue.pending)

                    =>This queue is a circular linked list.

                    🔄 During the next render: React processes the queue

                        React walks the queue:

                            initialState = memoizedState
                            for each update in queue:
                                newState = update.action(previousState)
                            memoizedState = newState

27.what if you call setCount(count + 1) instead ?

                  => count is stale (example: 0)

                        All three updates become: 1



28. Why react stores updates in a queue? 

            Because react must support:

                        . batching
                        . multiple updates before a render 
                        . prev => prev + 1 function updates
                        . concurrency (pause/ resume rendering)

                  Without a queue -> React cannot properly merge updates

29. why hooks form a linked list ?

                        Because React does not use hook names. 

                            it uses call order: 

                                useState -> first hook 
                                useEffect -> second hook 
                                useMemo -> third hook 

                        => React can find the correct hook state every render. 


useEffect
--------- 


30. What is useEffect really ? (internally)

                      =>Inside React Fiber, each component has :

                            fiber.updateQueue.effects = [effect1, effect2, effect3 ....]

                      => each useEffect adds an effect object into that list. 

                      Structure (simplified):

                          effect = {
                            create: () => { . . . }, // function you return inside useEffect 
                            destroy: () => { . . .}, // cleanup function
                            deps: [dep1, dep2, ....], //dependency array
                            tag: EffectTag           // passiveEffect

                          }

                    => so useEffect internally stores:
                          . your function 
                          . your cleanup
                          . your dependecy array 


31. When does useEffect run ? 

                        => NOT during render
                        => after render is committed to the DOM 
                        => in a separate passive effect phase

                  Render phase → Commit phase → Passive Effects phase

                    useEffect runs in the passive phase, not during commit.

                This means:

                  . your effect never blocks the UI
                  . React first updates DOM, then runs effects 

        sub) How dependency tracking works 

                          useEffect(() => {
                            console.log("run")
                          }, [a, b, c ]);


                        => compare new deps with previous deps
                          - if changed -> effect should run

                        => react use shallow comparison

        sub) How React handles it intenally 

                    -if you effect returns a function: 

                        On next re-render:

                          1. Compares new deps with old deps 
                          2. if deps changed: 
                            . react calls the old cleanup function 
                            . then calls the new effect function 

                        OLD effect cleanup -> NEW effect create
                          
                            ON unmount: 
                                React also calls cleanup. 


        sub) Types of effects 

                        ✔ 1) useEffect → Passive effect

                              Runs after the screen is painted.

                        ✔ 2) useLayoutEffect → Synchronous effect

                              Runs before the browser repaints.

                              useLayoutEffect blocks the paint.
                              useEffect does NOT block anything.


  


                  





                        






                    

          







why we adding unique key when render list using map()?
    because using the key react can add , delete, etc efficently later if needed.
    
how react works in case of list ?


    example: 
    <ul>
        <li>apple</li>
        <li>mango</li>
    </ul>

    <ul>
        <li>apple</li>
        <li>mango</li>
        <li>orange</li>
    </ul>

    while adding 3rd item -> react look first list and comaper to old DOM
                            and new DOM, if no change look for change, when it get a change react update the DOM

    but in some case 
    like :-

        <ul>
            <li>apple</li>
            <li>mango</li>
        </ul>

        <ul>
            <li>orange</li>
            <li>apple</li>
            <li>mango</li>
        </ul>

        add item at first of the list , when react chech changes all are changed , so react support KEY

        react reffer KEY to access each list to make more efficiant

=========================================
   
what is fragments?
    avoid unnecessary <div> wrappers -> cleaner Html Structure

    use
        <React.Fragment>
            <h1>hello</h1>
            <p>welcom</p>
        </React.Fragment



difference between Regular Component vs pure Component

.regular component(rerender)
-------------------
-> a regular component does not inplemnet the shouldComponentUpdate method. it always returns true by default.

-shouldComponentUpdate method means :preventing unnecessary renders

pure compontes(not rerender)
--------------
implements shouldcomponentsUpdate with shallow props and state comparison

=>shallow comparison :- returns true if a and b have the same value and of same type 

=>  var a = [1,2,3]
    var b = [1,2,3]
    var c = a;

    (a === b) //false
    (a === c) // true

=>  var a = { x: 1, y: 2};
    var b = { x: 1, y: 2};
    var c = a;

    (a === b) //false
    (a === c) //true


what is memo?

    memo help to use pureComponets in functional components.

    =>how to use it?

    function functionName({}){
        return(
        .....
        ......
        )
    }

    export default React.memo(functionName)
                                                                    
                        
for what higher order functions are used?
    need to share commen functionality among componets without repeating code.
               
                                
what is use of context?
    context provides a way to pass data through the component tree without having to pass props down manually at every level.


    
   HOOKS
   ------

whar are states?

    states  in react is a special variable that store data inside a component.
    when the state change, react automatoicalyy update the UI.
   
what are hooks?
    it help as to use react feature without write a class.


NOTE

    when we use useState using object, carefull about one thing
    that 

    useSatate hooks does not automatocaly merge and update
    we should manualy do that

    like ...item

    example in :...... useState using object


what is useState hook?

    .useState is used for add state to functional components,
    .It returns an array with 2 elements.
    .first element is the current value of the state,& second element is a state setter function.

useEffect hook?
    requesting react that execuit this function at evert rendering.
    useEffect runs every rendering

    it receives a function which have been executed.

    useEffect(() => {
        }, [dependency]);

        dependency giving for only render the function on depedency change otherwise it runes in every rendering.

what is cleanup function ?

    is special function return from useEffect to stop, cancel, or clean up things , when the component is removed or before the effects runs again

    example :

    useEffect(() => {

        window.addEventListener('mousemove', logMousePosition)

        return () => {  //cleanup code it should return 
            window.removeEventListener('mousemove', logMousePosition) 
            }
        }, [])

       
notes => axios is used for fetch data from the url.

const [post, setPost] = useState([])

useEffect(() => {
    axios
    .get("url.")
    .then(res => {
        console.log(res)
        setPosts(res.data)})
        })
        .catch(err => {
            console.log(err)
            }) 
)}
                                                                        
fetch data using useEffect from id?

    =>"url/klfghdl/fldklf/dlkj/${id}""
    


what is useContext Hooks?
    example:
     componentA, componentB, componentC

what are useReducer?

    .useReducer is a hook that id used for state managemnet
    .it is an alternative to useState
    .useState is bulit using useReducer
                                                                                                                                                                                                                        useState vs useReducer?
useMemo vs useCallback hooks?
useRef?

           
RENDERING
----------

    when we run react application the code in components is transilated into elements get mounted into DOM

    works splits into 2 phases 
    .render phase
    .commit phase

    in render phase (smiple rendering)
        1- react starts from root component to leaf componets
        2- when traversing for each element react invokes createElment()
        and converts components jsx to react elements and stores render outputs.

        =>react elememts are js objects that discribe the structure of your UI

       3- if the convertion of jsx componets to react element of entirer
       conponentry it transfer to next phase call commit phase. 

       4- in commit phase react elements is applied on DOM using react DOM packege.

      

RERENDERING
-----------

1. when the render start react moves from root componets to leaf components, and finding all components flaged as needing updates.

->a component can flag itself for an update by calling useSate setter functions or by useReducer dispach function.

2. for each of the flaged components react invokes createElments() and converts jsx elements into react elements and stores render outputs.

3. ones the conversion of all the componets are completed., react will compare new set of react elements from ones that produce from last render(perform reconciliation)

4. list is created with all the changes made to the DOM and hand over to the commit phase

5. in commit phase all changes are applied to DOM.




e.targrt.value
--------------

e => when an event occures broweser automaticaly create a obejct that with all detalil.
e.target => the HTML that trigger event.
e.target.value => value of the event.


note

when we trying to sort a array passed by parent , recevied using props
we can't directly sort the array passed 
=> because the prop is readOnly so react don't identify it to sort
    so we maintain a local state.


dfdfg sdf sdf ssdf sdf sdf sdf sdfasdas sd asd asd asd sasds asd sd asd asd sad asd dssss sdas dasd asd asd asd asd asd asd ads asd asd ad sad asd ads asd




///////////////////////////////////////////////////////////////////////////////

 FROM PROJECTS



 ------


-> react-router-dom : is a popular library that used for rounting in react
   --------------
   ---

routing ?

=> rounting = controlls which components / page should show when url changes

<BrowserRouter> ==> - is the main router provider.
                    - it listens to browser url (using HTML5 history API).
                    - it wrap entire app so rounting can work inside .

                    <BrowserRouter> ==> <Router> 

<routes> ==> a container for all route
            react router v6 introduced it 
            it will macth the current url with first <Route> that fit 

<> ==> defines map between react component and Url path.


Example:

    import{BrowserRouter as Router, Routes, Route} from react-router-dom;

    function App() {

    return (

        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </Router>
        
    )
    }

    export default App

what is the use of useParams?

    it is a react router hook that give access to the dynamic part of url

    <Route path="/user/:username" element={<UserDetails />} />

    navigate("/user/akshay")
    const { username } = useParams();
            


what are the difference between fetch and axios?

🧠 1. Basic Idea
Feature	fetch()	axios
Type	Built-in browser API	External library (you install it)
Usage	Simple and native	Feature-rich and easier to use
Needs installation?	❌ No	✅ Yes (npm install axios)
⚙️ 2. Syntax Difference (Example)
✅ Using fetch():
fetch("https://api.github.com/users/octocat")
  .then(res => res.json())       // must manually convert to JSON
  .then(data => console.log(data))
  .catch(error => console.error(error));

✅ Using axios:
import axios from "axios";

axios.get("https://api.github.com/users/octocat")
  .then(res => console.log(res.data)) // data already parsed
  .catch(error => console.error(error));

⚖️ 3. Key Differences (Side-by-Side)
Feature	fetch()	axios
Installation	Built-in to browsers	Needs npm install axios
Data Parsing	Must call .json() manually	Automatically converts response to JSON
Error Handling	Only rejects for network errors, not for HTTP errors (like 404, 500)	Rejects on any bad response (network or HTTP)
Default Headers	Must set manually	Automatically sets headers like Accept: application/json
Request Timeout	Must implement manually with AbortController	Has built-in timeout support
Interceptors	❌ Not supported	✅ Supported (very useful for adding tokens/logging)
Progress Tracking	❌ Harder	✅ Easy (onUploadProgress, onDownloadProgress)
Request Cancellation	✅ Using AbortController	✅ Built-in cancellation support
Node.js Compatibility	❌ Browser only (needs node-fetch for Node)	✅ Works both in browser and Node.js
Ease of Use	Simple but verbose	Cleaner and more convenient
📦 4. Example — Error Handling Difference
⚠️ fetch() (does not reject 404 automatically)
fetch("https://api.github.com/users/wronguser")
  .then(res => {
    if (!res.ok) {
      throw new Error("User not found");
    }
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));

✅ axios (automatically rejects 404)
axios.get("https://api.github.com/users/wronguser")
  .then(res => console.log(res.data))
  .catch(err => console.error("Error:", err.response.status));


👉 Axios saves you extra steps when handling failed responses.

🔄 5. Example — Sending Data (POST request)
Using fetch():
fetch("https://example.com/api", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Akshay" })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));

Using axios:
axios.post("https://example.com/api", { name: "Akshay" })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


👉 Axios automatically converts objects to JSON, so it’s cleaner.

🧩 6. Example — Adding Interceptors (Axios only)

Axios has a very useful feature called interceptors (fetch does not).

You can automatically attach tokens or log requests:

axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});


This runs before every API call — super handy in real projects.

🧠 7. When to Use What
Use Case	Recommended
Small projects or simple GET/POST	fetch() (native, no dependency)
Large apps with auth, tokens, APIs	axios (interceptors, auto-JSON, cleaner syntax)
Node.js or server-side calls	axios
Uploading files / tracking progress	axios
Learning basics	fetch() (teaches raw API handling)


👇

🌐 1. What Happens When You Make an API Call

When your code runs something like:

fetch("https://api.github.com/users/octocat")


or

axios.get("https://api.github.com/users/octocat")


Two main things can go wrong when connecting to the server:

Network errors — the request never reaches the server.

HTTP errors — the request reaches the server, but the server responds with an error status (like 404, 500, etc).

⚠️ 2. Network Errors
🔹 What It Means

A network error happens when the browser can’t even connect to the server —
there’s no response at all.

In simple terms:

❌ “The request didn’t reach the destination or no response came back.”

🔹 Common Causes

No internet connection 💔

Wrong API URL (like a typo or non-existing domain)

Server is down or unreachable

CORS error (cross-origin restriction)

DNS issues (domain not resolving)

🔹 Example
axios.get("https://api.github.dummy/users/octocat")
  .catch(error => {
    console.error("Network Error:", error.message);
  });


👉 Here, since github.dummy is not a real domain, you’ll get:

Network Error: Network Error


Axios will reject the promise with a “Network Error”.

⚙️ 3. HTTP Errors
🔹 What It Means

An HTTP error happens when:

✅ The server receives your request,
❌ but responds with an error status code.

These are not connection problems — they are server-side responses telling you something went wrong.

🔹 Common HTTP Status Codes
Code	Meaning	Who’s Responsible
400	Bad Request (client sent invalid data)	Client
401	Unauthorized (no/invalid token)	Client
403	Forbidden (not allowed to access)	Server
404	Not Found (endpoint missing)	Client or Server
500	Internal Server Error	Server
503	Service Unavailable	Server
🔹 Example
axios.get("https://api.github.com/users/non_existing_user")
  .catch(error => {
    console.error("HTTP Error:", error.response.status);
  });


Here:

The server responds successfully, but with a 404 Not Found.

Axios knows this is an HTTP error, so it throws it.

You’ll get:

HTTP Error: 404

🧩 4. How fetch vs axios Handle These
Case	fetch()	axios
Network error	❌ Rejects the promise	❌ Rejects the promise
HTTP error (404, 500)	✅ Does NOT reject the promise	❌ Rejects the promise automatically
Example with fetch
fetch("https://api.github.com/users/non_existing_user")
  .then(res => {
    // ✅ This runs even for 404
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return res.json();
  })
  .catch(err => console.error(err));

Example with axios
axios.get("https://api.github.com/users/non_existing_user")
  .catch(err => {
    // Axios automatically treats 404 as an error
    console.error("HTTP Error:", err.response.status);
  });

🧠 5. Visual Summary
           ┌──────────────────────────┐
           │ Your Code (Axios/Fetch)  │
           └────────────┬─────────────┘
                        │
                        ▼
             🌐 Network Request
                        │
         ┌──────────────┴───────────────┐
         │                              │
   ❌ Network Error               ✅ Connected to Server
(no internet, CORS, etc.)          │
         │                          ▼
         │                🔁 Server Response
         │                          │
         │              ┌───────────┴────────────┐
         │              │                        │
         │        ✅ 200 OK               ❌ HTTP Error (404, 500...)



🌐 What Are HTTP Errors?

When you make a request to a web server (for example using fetch() or axios),
the server always sends back an HTTP response.

That response has:

Headers — info about the response (content type, etc.)

Body — the actual data or message

Status code — a 3-digit number that tells you whether the request was successful or not

👉 If the status code is between 400 and 599, it’s called an HTTP error.

🧠 In Simple Words

🧾 Your browser or app successfully reached the server,
but the server replied: “Something went wrong.”

So the request didn’t fail to connect (that would be a network error),
but the server rejected or failed to process it correctly.

💡 HTTP Status Code Categories
Code Range	Meaning	Example
1xx	Informational (rarely used directly)	100 Continue
2xx	✅ Success	200 OK, 201 Created
3xx	🔁 Redirection	301 Moved Permanently
4xx	❌ Client Error	400 Bad Request, 404 Not Found
5xx	💥 Server Error	500 Internal Server Error

We’ll focus on 4xx and 5xx, because those are HTTP errors.

🚫 4xx Errors — Client Mistakes

These mean your request was wrong in some way.

Code	Name	Meaning	Example
400	Bad Request	The server can’t understand your request (maybe missing or invalid data).	You sent wrong JSON format.
401	Unauthorized	You’re not logged in or didn’t send valid credentials.	Missing access token.
403	Forbidden	You’re logged in, but not allowed to access this resource.	Normal user trying admin route.
404	Not Found	The URL doesn’t exist on the server.	Typo in /api/userss instead of /api/users.
409	Conflict	The request conflicts with server state.	Trying to register an already existing username.
💣 5xx Errors — Server Mistakes

These mean the server received your request correctly,
but something broke while processing it.

Code	Name	Meaning	Example
500	Internal Server Error	Server crashed or threw an exception.	Code bug in backend.
502	Bad Gateway	Server got invalid response from another service.	Proxy/server chain issue.
503	Service Unavailable	Server is temporarily down or overloaded.	High traffic or maintenance.
504	Gateway Timeout	The server waited too long for a response.	Slow database or API timeout.
⚙️ Example in React (Axios)
try {
  const res = await axios.get("https://api.github.com/users/non_existing_user");
  console.log(res.data);
} catch (error) {
  if (error.response) {
    console.log("HTTP Error:", error.response.status); // e.g. 404
    console.log("Message:", error.response.statusText); // e.g. Not Found
  } else {
    console.log("Network Error:", error.message);
  }
}


✅ Here, you’ll get:

HTTP Error: 404
Message: Not Found


That means — the request reached GitHub, but GitHub said:

“I don’t have a user with that name.”

🧩 Real-Life Analogy

Imagine you’re visiting a restaurant (the server):

Situation	Type of Error	Meaning
You go to the wrong address	Network Error	Can’t reach the restaurant
You reach restaurant but order a dish not on the menu	HTTP 404	“Not Found”
You order but forget your wallet	HTTP 401	“Unauthorized”
The chef burns your food	HTTP 500	“Server Error”
The restaurant is under maintenance	HTTP 503	“Service Unavailable”



what are react Query?

    react is just a UI library , it doesn't know about sever dat. its job 
    is to render components based on state or props 

    when we fetch data from a API, you are interacing with an external server 
    wjich is outside react knowledge. So react cant't automatically

        Show a “Loading…” message

        Retry if the fetch fails

        Cache the data for later

        Update the component when the data changes on the server 
                                                                        
                                                                                  
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
        setLoading(true);
        fetch("https://api.example.com/users")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
        }, []);    


        => here we us REACT QUERY 

            REACT QUERT automaticaly do all this tasks

            like :
                Tracks isLoading, isError, and data for you

                Caches the data to avoid duplicate requests

                Refetches in the background if the data becomes stale

                Updates the component automatically when the data changes


        install
            npm install @tanstack/react-query

            import { useQuery } from '@tanstack/react-query';
            import axios from 'axios';

            function Users() {
            const { data, isLoading, isError } = useQuery({
                queryKey: ['users'],
                queryFn: () => axios.get('https://api.example.com/users').then(res => res.data),
            });

            if (isLoading) return <p>Loading...</p>;
            if (isError) return <p>Error fetching data</p>;

            return (
                <ul>
                {data.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
            );
            }


                                     
what are useReducer ? 

            is react hook that is used to manage complex state logic inside components.
            it is an alternative to useState hook.


          initialization

            count is a example

            =>const [state, dispatch] = useReducer(reducer, {count: 0})

              .state => is current value of state(like useState)
              .dispatch => is a function to send actions (like setState , but more powerfull)
              .reducer => a function that define how state should change.

                how exactly this reducer?
                  reducer is just a nrmal js function 

                    function reducer(currentState, action){
                      //logic to decide how t oupdate state 
                      return newState
                    }

            
              how it works?

                    useReducer give 2 things 

                      state - current state vlaue thet react stores for this component instance
                      dispatch - a stable function that call with a action object .

                        react take that action, call the reducer function, get a new state, storeit, the re-render the component

                       1) The one-line summary

                          useReducer gives you two things:

                          state — the current state value that React stores for this component instance.

                          dispatch — a stable function you call with an action object. React takes that action, calls your reducer(state, action), gets a new state, stores it, then re-renders the component.

                          2) Your code again (short)
                          const [state, dispatch] = useReducer(reducer, { count: 0 });

                          <button onClick={() => dispatch({ type: "inc" })}>+</button>
                          <button onClick={() => dispatch({ type: "dec" })}>-</button>

                        
                          { count: 0 } is the initial state stored by React for this component.

                          { type: "inc" } or { type: "dec" } is the action you send to tell the reducer what to do.

                          3) What happens when the component first renders

                          React sees your component and runs it.

                          useReducer(reducer, { count: 0 }) tells React: “create a hook slot for this component and store { count: 0 } as the current state value.”

                          React returns the current state and a dispatch function to your component.

                          state is { count: 0 }

                          dispatch is a function that React created (and it stays the same between renders).

                          React renders the UI using state.count (so you see COUNTER 0).

                          4) What happens when you click the + button

                          Sequence:

                          The click handler runs: dispatch({ type: "inc" }).

                          dispatch calls React’s internal scheduler and tells React: “I have an action for this component.”

                          React calls your reducer: newState = reducer(currentState, action).

                          currentState is what React stored earlier (e.g. { count: 0 }).

                          action is { type: "inc" }.

                          Your reducer runs and returns a brand new object: { count: state.count + 1 } → { count: 1 }.

                          Important: reducer returns a new object. We do not mutate the old state.

                          React stores that new object as the component’s state.

                          React schedules a re-render of the component.

                          When the component re-runs, useReducer returns the updated state ({ count: 1 }) and the same dispatch function.

                          The UI reads state.count and now shows COUNTER 1.

                          5) Why is it safe to read state.count in render?

                          Because React stores state between renders. Each render gets the current state value from React’s internal store. The state variable in your function is just a snapshot of that stored state at the time of render.

                          6) Where is the state actually stored? (behind the scenes)

                          React keeps a list of hooks for each component instance.

                          Each hook slot holds the state value and associated data (for useReducer, it stores reducer, current state, and a queue of updates).

                          When the component mounts, React allocates that slot and stores the initial state.

                          On updates, React updates that slot, and re-runs the component with the new values.

                          So state is not a global variable — it’s stored inside React and tied to that specific component instance.

                          7) Why do we return a new object in reducer?

                          Reducers should be pure and immutable:

                          You return a new state object so React can compare references and know something changed.

                          If you mutated and returned the same object, React might not re-render because the reference didn’t change.

                          Good reducer pattern:

                          // correct
                          return { count: state.count + 1 };


                          Bad (mutating) pattern:

                          state.count += 1;
                          return state; // DO NOT DO THIS

                          8) Why dispatch is stable (same function each render)

                          React returns the same dispatch function every render. That’s why you can pass it into handlers without recreating handlers or worrying about its identity changing.

                          9) What if several dispatches happen quickly?

                          React queues them. Each dispatch runs the reducer with the current state at that point. If multiple dispatches happen before a re-render, React will apply them in order when processing updates.

                          10) Extra useful details & tips

                          Reducer is a function you declare. It can live inside or outside the component. If inside, it’s recreated each render, but React still uses it correctly.

                          You can pass an initialiser: useReducer(reducer, initialArg, init) for expensive initial state.

                          useReducer vs useState:

                          useState is simpler for single values.

                          useReducer is clearer when updates are complex or one action changes many fields.

                          For debugging: add console.log inside your reducer to see when it runs and with what state and action.

                          Example with logs:

                          function reducer(state, action) {
                            console.log("reducer called, state:", state, "action:", action);
                            switch (action.type) {
                              case "inc": return { count: state.count + 1 };
                              case "dec": return { count: state.count - 1 };
                              default: return state;
                            }
                          }

                          11) Tiny visual timeline (click + once)
                          Render 1:
                            React stores state = {count: 0}
                            UI shows COUNTER 0

                          Click +:
                            dispatch({type: 'inc'})
                            React: newState = reducer({count:0}, {type:'inc'}) => {count:1}
                            React stores state = {count:1}
                            React re-renders component

                          Render 2:
                            useReducer returns state = {count:1}
                            UI shows COUNTER 1

                          12) Common confusions

                          “Where does count live?” → Inside React’s hook storage, returned to you as state.

                          “How does dispatch know the current state?” → React passes the latest stored state into the reducer when handling the action.

                          “Is state shared between components?” → No. Each component instance has its own stored state. 
                                                      

                

                                                                                                 