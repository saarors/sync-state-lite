# install

```javascript
npm install sync-state-lite
```



# 1. Create a shared state
```javascript
import { createSharedState } from "./sync-state-lite.js";

const counterState = createSharedState({
key: "counter",
initial: { count: 0 }
});
```

# 2. Get the state
```javascript
console.log(counterState.get()); // { count: 0 }
```
# 3. Update the state (set)

There are two forms:
```javascript
Partial update (merge)
counterState.set({ count: 1 });
Update by previous value (function)
counterState.set(prev => ({
count: prev.count + 1
}));
```
# 4. Subscribe to changes
```javascript
const unsubscribe = counterState.subscribe(state => {
console.log("state updated:", state);
});
```

# Unsubscribe:
```javascript
unsubscribe();
```
