# Usage

### Import

```tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-pine';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider>
    <App></App>
  </Provider>
);
```

### Define Store

```typescript
import { createStore } from 'react-pine';

export const useStore = createStore('id', {
  states: {
    count: 0,
  },
  buildMoreActions: ({ count, setCount }) => {
    return {
      add: () => {
        setCount(1);
      },
    };
  },
  buildGetters: ({ count }) => {
    return {
      newCount: count + 1,
    };
  },
});
```

### Use Store

```tsx
function App() {
  const { count, add, setCount, newCount } = useStore();

  return (
    <>
      <div>{count}</div>
      <div>{newCount}</div>
      <button onClick={add}>add</button>
    </>
  );
}
```
