import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const user = await User.create({
      sender: "user",
      text
    });

    // Complete React Q&A Database
    const botResponses = {
      // General Questions
      "hello": "Hi, How I can help you!!",
      "can we become friend": "Yes",
      "how are you": "I'm just a Aaruu's bot, but I'm doing great! How about you?",
      "what is your name": "I'm ChatBot, your virtual assistant.",
      "who made you": "I was created by developers to help answer your questions.",
      "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
      "what is the time": "I can't see a clock, but your device should know.",
      "bye": "Goodbye! Have a great day.",
      "thank you": "You're welcome!",
      "i love you": "That's sweet! I'm here to help you anytime.",
      "where are you from": "I live in the cloud — no rent, no bills!",
      "what can you do": "I can chat with you, answer questions, and keep you company.",

      // Programming Languages
      "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",

      "what is java": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",

      "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a **base condition** to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",

      // General Knowledge
      "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India\n• Interview Tip: Link to governance or technology (e.g., Digital India impact on IT industry)",

      "what is g20": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Discusses economic growth, climate change, sustainable development\n• Recent: India hosted G20 summit in 2023",

      // Interview Questions
      "tell me about yourself": "This is usually the first interview question.\nStructure:\n• Start with a brief intro (name, background, education/work)\n• Highlight your skills (technical + soft skills)\n• Share achievements (projects, internships, leadership roles)\n• Conclude with why you're excited about this role\nExample: 'I am a Computer Science graduate skilled in Python and SQL. I completed an internship at XYZ where I optimized a database query, improving performance by 30%. I'm passionate about problem-solving and eager to contribute to your team's success.'",

      "why should we hire you": "HR wants to see your value-add.\n• Emphasize skills that match job requirements\n• Show enthusiasm and cultural fit\n• Example: 'I bring strong coding skills in Python and SQL, along with problem-solving ability proven through hackathons. I am also a quick learner and adapt well to team environments. I believe I can contribute to both technical delivery and innovative ideas.'",

      "what is leadership": "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4, where I divided tasks, coordinated communication, and ensured deadlines. We successfully delivered a working prototype before schedule.'",

      // Sports
      "who is virat kohli": "Virat Kohli is one of India's greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Holds record for fastest century in ODIs for India\n• Nicknamed 'Chase Master' for his performance in run-chases\n• Interview Tip: If asked about sports management, relate his discipline & fitness to leadership skills",

      "what is ipl": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)\n• Significant for sports business, sponsorships, brand endorsements\n• Example: Chennai Super Kings (CSK) & Mumbai Indians (MI) are top teams",

      // ==================== REACT BASIC LEVEL (1-10) ====================
      "what is react": "React is a JavaScript library for building user interfaces, developed by Facebook. It allows developers to create reusable UI components and efficiently update the DOM using a virtual DOM.",

      "what is jsx": "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It gets compiled to regular JavaScript by tools like Babel.\nExample: const element = <h1>Hello, World!</h1>;",

      "what are components in react": "Components are the building blocks of React applications. They are reusable pieces of code that return React elements describing what should appear on the screen.\nTwo types:\n1. Functional Component: function Welcome(props) { return <h1>Hello</h1>; }\n2. Class Component: class Welcome extends React.Component { render() { return <h1>Hello</h1>; } }",

      "what is the difference between state and props": "Props: Read-only data passed from parent to child components.\nState: Mutable data managed within a component that can change over time.\nKey difference: Props are immutable, State is mutable and triggers re-renders when updated.",

      "what is the virtual dom": "The Virtual DOM is a lightweight copy of the actual DOM. React uses it to improve performance by calculating the minimal number of changes needed to update the real DOM through a process called reconciliation.",

      "what are react hooks": "Hooks are functions that let you use state and other React features in functional components without writing a class.\nCommon hooks: useState, useEffect, useContext, useReducer, useRef, useMemo, useCallback.",

      "what is usestate": "useState is a Hook that allows you to add state to functional components.\nSyntax: const [state, setState] = useState(initialValue);\nExample: const [count, setCount] = useState(0);",

      "what is useeffect": "useEffect is a Hook that performs side effects in functional components. It combines componentDidMount, componentDidUpdate, and componentWillUnmount.\nSyntax: useEffect(() => { /* effect code */ return () => { /* cleanup */ }; }, [dependencies]);",

      "what are keys in react": "Keys help React identify which items have changed, been added, or removed. They should be unique among siblings.\nExample: const items = data.map(item => <li key={item.id}>{item.name}</li>);",

      "what is the difference between controlled and uncontrolled components": "Controlled: Form data is handled by React state (value prop controlled by state).\nUncontrolled: Form data is handled by the DOM itself (access via refs).\nControlled is recommended for better control and validation.",

      // ==================== REACT INTERMEDIATE LEVEL (11-25) ====================
      "what is usecontext": "useContext allows you to consume context values without wrapping components in Context.Consumer.\nExample:\nconst ThemeContext = React.createContext('light');\nconst theme = useContext(ThemeContext);",

      "what is useref": "useRef creates a mutable reference that persists across re-renders without causing re-renders when updated.\nUse cases: Accessing DOM elements, storing mutable values.\nExample: const inputRef = useRef(null); inputRef.current.focus();",

      "what is usereducer": "useReducer is an alternative to useState for managing complex state logic.\nSyntax: const [state, dispatch] = useReducer(reducer, initialState);\nUseful when: State logic is complex, next state depends on previous state.",

      "what is usememo": "useMemo memoizes expensive computations and only recalculates when dependencies change.\nSyntax: const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);\nBenefit: Performance optimization by avoiding unnecessary calculations.",

      "what is usecallback": "useCallback returns a memoized callback function that only changes when dependencies change.\nSyntax: const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);\nUseful for: Passing callbacks to optimized child components.",

      "what is reactmemo": "React.memo is a higher-order component that prevents unnecessary re-renders by doing a shallow comparison of props.\nExample: const MyComponent = React.memo(function MyComponent(props) { return <div>{props.value}</div>; });",

      "what is the difference between usememo and usecallback": "useMemo: Returns a memoized value (result of computation).\nuseCallback: Returns a memoized function.\nBoth prevent unnecessary re-renders but useMemo is for values, useCallback is for functions.",

      "what are higher order components": "HOCs are functions that take a component and return a new component with additional props or behavior.\nExample: function withLogger(WrappedComponent) { return function EnhancedComponent(props) { console.log('Props:', props); return <WrappedComponent {...props} />; }; }",

      "what is prop drilling": "Prop drilling is passing props through multiple levels of components to reach a deeply nested child.\nSolutions: Context API, State management libraries (Redux, Zustand), Component composition.",

      "what is the context api": "Context provides a way to pass data through the component tree without manually passing props at every level.\nUsage: Create context with React.createContext(), provide value with Provider, consume with useContext.",

      "what are fragments": "Fragments let you group multiple children without adding extra nodes to the DOM.\nSyntax: <></> or <React.Fragment></React.Fragment>\nBenefit: Cleaner DOM structure without wrapper divs.",

      "what is lazy loading in react": "Lazy loading allows you to split code and load components on demand.\nSyntax: const LazyComponent = React.lazy(() => import('./LazyComponent'));\nUse with: <Suspense fallback={<Loading />}><LazyComponent /></Suspense>",

      "what are error boundaries": "Error boundaries are components that catch JavaScript errors in their child component tree.\nMethods: getDerivedStateFromError, componentDidCatch.\nNote: Currently only available in class components, not hooks.",

      "what is the difference between createelement and cloneelement": "createElement: Creates a new React element from scratch.\ncloneElement: Clones an element and returns a new element with modified props.\nUsage: cloneElement is useful for adding props to existing elements.",

      "what are portals in react": "Portals provide a way to render children into a DOM node outside the parent component's hierarchy.\nSyntax: ReactDOM.createPortal(child, container);\nUse cases: Modals, tooltips, dropdowns that need to break out of parent overflow.",

      // ==================== REACT ADVANCED LEVEL (26-45) ====================
      "what are custom hooks": "Custom Hooks are JavaScript functions that use other Hooks and allow you to extract component logic into reusable functions.\nNaming: Must start with 'use' prefix.\nExample: function useFetch(url) { const [data, setData] = useState(null); useEffect(() => { fetch(url).then(res => res.json()).then(setData); }, [url]); return data; }",

      "what is uselayouteffect": "useLayoutEffect runs synchronously after all DOM mutations but before paint.\nuseEffect runs asynchronously after paint.\nUse useLayoutEffect when: You need to make DOM measurements or mutations that users shouldn't see.",

      "what is useimperativehandle": "useImperativeHandle customizes the instance value exposed to parent components when using ref.\nUsed with: forwardRef.\nUse case: Exposing specific methods to parent without exposing entire component instance.",

      "what is react fiber": "React Fiber is the new reconciliation algorithm in React 16+. It enables incremental rendering, allowing React to split work into chunks and prioritize updates.\nBenefits: Better performance, ability to pause and resume work, priority-based rendering.",

      "what are render props": "Render props is a technique for sharing code between components using a prop whose value is a function.\nExample: <DataProvider render={data => <h1>Hello {data.name}</h1>} />\nAlternative to: HOCs and now Custom Hooks.",

      "what is code splitting": "Code splitting allows you to split your bundle into smaller chunks that can be loaded on demand.\nMethods: React.lazy, dynamic import(), route-based splitting.\nBenefit: Improved initial load time and performance.",

      "what are the rules of hooks": "1. Only call Hooks at the top level (not inside loops, conditions, or nested functions).\n2. Only call Hooks from React function components or custom Hooks.\nReason: Ensures hooks are called in the same order on every render.",

      "what is the usetransition hook": "useTransition lets you mark certain state updates as non-urgent, keeping the UI responsive.\nSyntax: const [isPending, startTransition] = useTransition();\nUse case: Keeping UI responsive during heavy computations or updates.",

      "what is the usedeferredvalue hook": "useDeferredValue lets you defer updating a part of the UI.\nSyntax: const deferredValue = useDeferredValue(value);\nUse case: Keeping input responsive while filtering large lists.",

      "what is concurrent rendering": "Concurrent Rendering allows React to interrupt rendering work to handle high-priority updates, making apps more responsive.\nIntroduced in: React 18.\nFeatures: useTransition, useDeferredValue, Suspense improvements.",

      "what is suspense": "Suspense lets components 'wait' for something before rendering.\nUse cases: Lazy loading components, data fetching (experimental).\nSyntax: <Suspense fallback={<Loading />}><LazyComponent /></Suspense>",

      "what is server side rendering": "SSR renders React components on the server and sends HTML to the client.\nBenefits: Improved initial load time, better SEO, faster Time to First Byte.\nFrameworks: Next.js, Remix.",

      "what is static site generation": "SSG generates HTML at build time, serving pre-rendered pages.\nBenefits: Fastest performance, great for static content, excellent SEO.\nFrameworks: Next.js, Gatsby.",

      "what is hydration in react": "Hydration is the process of attaching event listeners to server-rendered HTML, making it interactive.\nProcess: Server sends HTML → Client loads React → React 'hydrates' the HTML with interactivity.",

      "how do you optimize react performance": "Performance optimization techniques:\n• Use React.memo for component memoization\n• Use useMemo and useCallback for expensive computations\n• Lazy load components with React.lazy\n• Use virtualization for long lists (react-window)\n• Avoid inline functions in JSX\n• Use key props correctly\n• Code splitting\n• Use production build\n• Profile with React DevTools",

      "what are synthetic events": "Synthetic Events are React's cross-browser wrapper around native browser events.\nBenefits: Consistent behavior across browsers, performance optimizations.\nNote: Event pooling was removed in React 17.",

      "what is the difference between shadow dom and virtual dom": "Virtual DOM: React's optimization technique for updating the real DOM efficiently.\nShadow DOM: Web standard for encapsulating DOM and CSS in web components.\nKey difference: Virtual DOM is a concept, Shadow DOM is a browser feature.",

      "what is strictmode": "StrictMode is a development tool that highlights potential problems in an application.\nFeatures: Detects unsafe lifecycles, warns about legacy APIs, detects unexpected side effects.\nNote: Only runs in development mode, has no impact on production.",

      "what is the difference between class and functional components": "Functional: Simpler syntax, use Hooks, better performance, recommended approach.\nClass: Use lifecycle methods, more verbose, require 'this' binding.\nRecommendation: Use functional components with Hooks for new code.",

      "what are react refs": "Refs provide a way to access DOM nodes or React elements.\nUse cases: Managing focus, text selection, triggering animations, integrating with third-party DOM libraries.\nCreation: useRef hook or React.createRef().",

      "what is forwardref": "forwardRef allows you to pass refs through components to child components.\nSyntax: const FancyButton = React.forwardRef((props, ref) => <button ref={ref}>{props.children}</button>);\nUse case: HOCs, component libraries.",

      "what is the difference between state and context": "State: Local component data, triggers re-renders only in that component and children.\nContext: Global data shared across multiple components, avoids prop drilling.\nWhen to use: State for local data, Context for global/shared data.",

      "what are react design patterns": "Common patterns:\n• Container/Presentational Pattern\n• Higher-Order Components (HOC)\n• Render Props\n• Custom Hooks\n• Compound Components\n• Controlled/Uncontrolled Components\n• Provider Pattern",

      "what is react reconciliation": "Reconciliation is the process React uses to diff the virtual DOM with the actual DOM and determine the minimal set of changes needed.\nAlgorithm: React Fiber.\nOptimization: Uses keys to identify elements efficiently.",

      "what are lifecycle methods": "Class component lifecycle methods:\nMounting: constructor, getDerivedStateFromProps, render, componentDidMount\nUpdating: getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate\nUnmounting: componentWillUnmount\nError: getDerivedStateFromError, componentDidCatch",

      "how do you handle forms in react": "Two approaches:\n1. Controlled: Form data handled by React state (value prop controlled by state)\n2. Uncontrolled: Form data handled by DOM (access via refs)\nRecommended: Controlled components for better control and validation.",

      "what is the difference between createelement and jsx": "JSX is syntactic sugar that gets compiled to React.createElement() calls.\nExample:\n<div className='container'>Hello</div>\nCompiles to:\nReact.createElement('div', {className: 'container'}, 'Hello')",

      "what are react devtools": "React DevTools is a browser extension for debugging React applications.\nFeatures: Inspect component hierarchies, props, state, hooks, performance profiling.\nAvailable for: Chrome, Firefox, Edge.",

      "what is batching in react": "Batching is when React groups multiple state updates into a single re-render for better performance.\nReact 18: Automatic batching works everywhere (events, promises, setTimeout).\nBenefit: Improved performance, fewer re-renders.",

      "what is the useid hook": "useId generates unique IDs that are stable across server and client rendering.\nSyntax: const id = useId();\nUse case: Accessibility (linking labels to inputs), avoiding ID collisions in SSR.",

      "what are react server components": "Server Components run only on the server, reducing bundle size and enabling direct backend access.\nBenefits: Zero bundle size, direct database access, automatic code splitting.\nNote: Still experimental, available in Next.js 13+.",

      "how do you test react components": "Testing libraries:\n• Jest (test runner)\n• React Testing Library (testing utilities)\n• Enzyme (alternative)\nBest practices: Test behavior not implementation, use queries that resemble user interaction.",

      "what is proptypes": "PropTypes is a type-checking library for React props.\nExample: MyComponent.propTypes = { name: PropTypes.string.isRequired };\nNote: Often replaced by TypeScript in modern apps.",

      "what are new features in react 18": "New features:\n• Automatic batching\n• Transitions (useTransition, useDeferredValue)\n• Suspense for SSR\n• Concurrent rendering\n• New client rendering APIs (createRoot)\n• Strict Mode improvements",

      "what is the difference between react and reactdom": "React: Core library for creating components and managing component logic.\nReactDOM: Package for DOM-specific methods (rendering, hydration).\nSeparation allows: React to target different platforms (React Native, React VR)."
    };

    // Normalize: lowercase, trim, and remove punctuation
    const normalizedText = text.toLowerCase().trim().replace(/[?!.,]/g, '');

    const botResponse = botResponses[normalizedText] || "Sorry, I don't understand that!!!";

    const bot = await Bot.create({
      text: botResponse
    });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.log("Error in Message Controller:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};