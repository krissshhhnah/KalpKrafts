# Advanced React Patterns

If you know how to `useState` and `useEffect`, you are a Junior. To reach Senior levels, you must understand rendering pipelines, context constraints, and the Next.js Server paradigm.

## 1. The Rendering Lifecycle

A component renders when its State changes, its Props change, or its Parent renders.

### React.memo()
If a component receives the same props, you can prevent re-rendering using memoization.

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

However, if `data` is an Array or Object, it will always fail the equality check unless you use `useMemo` in the parent!

## 2. Custom Hooks (Logic Abstraction)

Hooks are not just for basic state; they are designed to totally detach Component Logic from Component UI.

```javascript
// useAuth.js
export function useAuth() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/api/me').then(res => res.json()).then(setUser);
  }, []);

  return user;
}
```

Now, your UI is clean:
```javascript
function Profile() {
  const user = useAuth();
  if (!user) return <Spinner />;
  return <h1>{user.name}</h1>;
}
```

## 3. Server Components (RSC)

In Next.js App Router, components default to **Server Components**.
This means they run entirely on the Node.js backend. They never ship Javascript to the browser.
- **When to use RSC:** Fetching data directly from DB, rendering static layouts, passing data to Client Components.
- **When to use 'use client':** When you need `onClick`, `useState`, or browser APIs like localStorage.
