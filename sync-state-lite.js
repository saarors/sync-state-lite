// sync-state-lite.js

export function createSharedState({ key, initial }) {
  const listeners = new Set();

  let state = load() ?? initial;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }

  function save() {
    localStorage.setItem(key, JSON.stringify(state));
    broadcast();
  }

  function set(partial) {
    state = typeof partial === "function"
      ? partial(state)
      : { ...state, ...partial };

    save();
    notify();
  }

  function get() {
    return state;
  }

  function subscribe(fn) {
    listeners.add(fn);
    fn(state);
    return () => listeners.delete(fn);
  }

  function notify() {
    listeners.forEach(fn => fn(state));
  }

  function broadcast() {
    // cross-tab sync
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: JSON.stringify(state)
      })
    );
  }

  window.addEventListener("storage", (e) => {
    if (e.key !== key) return;
    try {
      state = JSON.parse(e.newValue);
      notify();
    } catch {}
  });

  return {
    get,
    set,
    subscribe
  };
}
