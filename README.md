# react-usetask-z

[![NPM](https://img.shields.io/npm/v/react-usetask-z.svg)](https://www.npmjs.com/package/react-usetask-z)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Downloads](https://img.shields.io/npm/dt/react-usetask-z.svg)

A lightweight **React custom hook** for creating flexible tasks/timers.

🔹 Supports sequential or fixed interval tasks
🔹 Repeat tasks a fixed number of times or infinitely
🔹 Cancel, reset, and auto-restart tasks
🔹 Works with async or sync functions

---

## 🚀 Live Demo

👉 [Codesandbox Example](https://codesandbox.io/p/sandbox/nl3s57)

---

## 📦 Installation

```bash
npm install react-usetask-z
# or
yarn add react-usetask-z
```

Import in your project:

```ts
import useTask from "react-usetask-z";
```

---

## 🛠 Usage

### Initialize a task

```ts
const { execute, executeAsync, cancel, reset } = useTask({
  fn: async () => {
    console.log("⚡ Task executed!");
  },
  delay: 1000, // Initial delay in ms
  repeat: 5, // Repeat 5 times, true = infinite
  interval: 500, // Interval between repeats in ms
  mode: "sequential", // sequential | fixed
  retry: 2, // retry 2 times on error
  retryDelay: 1000, // 1s between retries
});
```

### Run task immediately

```ts
execute();
```

### Run async task with await

```ts
await executeAsync(async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log("✅ API completed", data);
});
```

### Run after custom delay

```ts
execute(() => console.log("⏱ Run after 2 seconds"), 2000);
```

### Stop or reset tasks

```ts
cancel(); // 🛑 Stop current task
reset(); // 🔄 Reset repeat count and stop
```

### Sequential vs Fixed mode

- ⏱ `sequential`: waits for previous async task to complete before next iteration
- ⚡ `fixed`: runs tasks on a fixed interval regardless of previous task completion

```ts
useTask({ mode: "fixed", interval: 1000 });
```

### Auto-restart

```ts
useTask({
  fn: () => console.log("🔄 Restart task"),
  repeat: 3,
  restartDelay: 2000, // restart 2 seconds after completion
});
```

---

## ⚙️ API

| Function                                               | Description                            |
| ------------------------------------------------------ | -------------------------------------- |
| `execute(fn?, delay?, repeat?, interval?, mode?)`      | ⚡ Run task (sync / normal callback)   |
| `executeAsync(fn?, delay?, repeat?, interval?, mode?)` | ✅ Run task async with promise support |
| `cancel()`                                             | 🛑 Stop current task immediately       |
| `reset()`                                              | 🔄 Stop and reset repeat count         |

---

## ✨ Notes

- 🔁 If `repeat` is set to `true`, the task will loop infinitely until `cancel()` is called
- ⚡ Use `executeAsync` if your task returns a promise and you want sequential execution
- ✅ `restartDelay` allows tasks to automatically restart after finishing all repeats
- 🔄 Retry mechanism available with `retry` and `retryDelay`
- 🛠 Error handling via `onError` callback

---

## 📋 License

MIT
