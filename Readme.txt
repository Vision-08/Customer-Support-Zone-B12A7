1. Why is JSX utilized, and what is it?
 A straightforward syntactic extension called JavaScript XML, or JSX, enables you to specify the layout of your user interface inside of your JavaScript files in a format that is similar to HTML.  It is mostly intended to improve readability.  Comparing it to manually creating items using function calls, the code is considerably cleaner and easier to understand.  Additionally, it provides a layer of protection by automatically cleaning material to help prevent security threats, and it integrates dynamic JavaScript logic into your interface description with ease using curly brackets.

2. What is the difference between State and Props?
This distinction is crucial for understanding component flow: 
Think of props as the data passed into a component from its parent, similar to how arguments are passed into a function. They are strictly read-only; the component that receives props is never allowed to modify them.
State is the component's own internal memory. It’s data that is managed by the component itself and is designed to change over time (e.g., tracking an input value or a loading status). When this internal memory is updated using a designated function, React automatically updates the component's display.
3. What is the useState hook, and how does it work?
The useState hook is the function that grants functional components the ability to have internal, managed memory, which we call state.
When you call this hook, it returns two values in an array: the current value of the state, and a setter function. To update the state, you must call the setter function. This action tells React that the component needs to be re-rendered with the new information. You should never attempt to change the state value directly.

4. How can you share state between components in React?
The standard pattern for sharing state between components, especially siblings, is called Lifting State Up. This involves three steps:
Identify the Parent: Find the single component that is the closest common ancestor of all the components that need access to the data. 
Move the State: Declare the state within that common parent component.
Pass Down: The parent then passes both the state data itself and the function used to update the state down to the interested child components as properties (props). This ensures the parent remains the single source of truth.

5. How is event handling done in React?
Event handling in React is similar to how you handle events in standard HTML, with a couple of React-specific conventions:
Event attributes are written in camelCase (e.g., not onclick, but onClick).
You pass a JavaScript function reference directly into the event attribute, not a string of code.
When an event fires, React passes a SyntheticEvent object to your handler function. This system wraps the browser's native event, ensuring that event properties and behavior remain consistent across all browsers.