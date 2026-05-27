# ⚛️ react-usetask-z

![NPM Version](https://img.shields.io/npm/v/react-usetask-z.svg) ![Downloads](https://img.shields.io/npm/dt/react-usetask-z.svg) ![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-usetask-z.svg)

[LIVE EXAMPLE](https://codesandbox.io/p/sandbox/82l6rm)

🚀 Structured concurrency runtime for React with task orchestration, cancellation trees, retries, polling, async scopes, and AbortController propagation.

> Kotlin-style coroutine runtime for React applications.

---

# What is react-usetask-z?

`react-usetask-z` is a lightweight async runtime layer for React applications.

Instead of manually handling:

- `setTimeout`
- `setInterval`
- `AbortController`
- retry loops
- polling
- cleanup
- async race conditions

the runtime provides a structured task system inspired by:

- Kotlin Coroutines
- Structured Concurrency
- Async runtimes
- React concurrent rendering

---

# Why react-usetask-z?

Managing async logic in React becomes difficult as applications scale.

Common problems:

- Memory leaks from unfinished async work
- Stale requests updating state
- Manual AbortController management
- Nested async callbacks
- Retry boilerplate everywhere
- Polling cleanup issues
- Race conditions between requests
- Parent-child async orchestration becoming messy

`react-usetask-z` solves this using task-based async orchestration.

---

# Features

- ⚡ Structured concurrency
- 🌲 Cancellation tree propagation
- 🛑 AbortController integration
- 🔁 Retry policies
- ⏱ Timeout support
- 🔄 Polling / interval tasks
- 🧩 Parent-child tasks
- 🚀 Task scopes
- ⚛️ React hooks integration
- 🧠 Async orchestration helpers
- 📦 Lightweight runtime
- ✅ Full TypeScript support

---

# Mental Model

```text
React Component
      ↓
    useTask
      ↓
   Task Runtime
      ↓
 Parent Task
   ├── Child Task
   ├── Retry Logic
   ├── Timeout
   └── Abort Propagation
```

---

# Installation

```bash
npm install react-usetask-z
```

---

# Quick Start

## Basic Task

```tsx
import { useTask } from 'react-usetask-z'

export function App() {
  const userTask = useTask(
    async ({ signal }) => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1',
        {
          signal,
        },
      )

      return response.json()
    },
    {
      immediate: true,
    },
  )

  if (userTask.isRunning) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <pre>
        {JSON.stringify(
          userTask.data,
          null,
          2,
        )}
      </pre>

      <button
        onClick={() => userTask.run()}
      >
        Reload
      </button>
    </div>
  )
}
```

---

# Timeout

```tsx
const task = useTask(fetchUsers, {
  timeout: 5000,
})
```

Automatically aborts task after timeout.

---

# Retry Policies

## Simple Retry

```tsx
const task = useTask(fetchUsers, {
  retry: 3,
})
```

---

## Advanced Retry

```tsx
const task = useTask(fetchUsers, {
  retry: {
    maxAttempts: 5,
    delay: 1000,
    backoff: 'exponential',
    jitter: true,
  },
})
```

---

# Polling

```tsx
const task = useTask(fetchUsers, {
  interval: 3000,
})
```

Automatically reruns task every 3 seconds.

---

# Delays

```tsx
const task = useTask(
  async ({ delay }) => {
    await delay(1000)

    console.log('done')
  },
)
```

---

# Child Tasks

```tsx
const task = useTask(
  async ({ fork }) => {
    const user = await fork(
      async ({ signal }) => {
        const response =
          await fetch('/user', {
            signal,
          })

        return response.json()
      },
    )

    const posts = await fork(
      async ({ signal }) => {
        const response =
          await fetch('/posts', {
            signal,
          })

        return response.json()
      },
    )

    return {
      user,
      posts,
    }
  },
)
```

If parent task is cancelled:
- all child tasks abort automatically
- all fetches stop
- retries stop
- timers clean up

---

# Parallel Tasks

```tsx
const task = useTask(
  async ({ all }) => {
    const results = await all([
      () => fetchUsers(),
      () => fetchPosts(),
    ])

    return results
  },
)
```

---

# Race Tasks

```tsx
const task = useTask(
  async ({ race }) => {
    return race([
      () => fetchMirrorA(),
      () => fetchMirrorB(),
    ])
  },
)
```

---

# Task Scope

```tsx
import {
  useTaskScope,
} from 'react-usetask-z'

export function App() {
  const scope = useTaskScope()

  async function load() {
    await scope.launch(
      async ({ signal }) => {
        const response =
          await fetch('/api/users', {
            signal,
          })

        return response.json()
      },
    )
  }

  return (
    <button onClick={load}>
      Load Users
    </button>
  )
}
```

---

# useTaskEffect

Async effect with automatic cleanup.

```tsx
import {
  useTaskEffect,
} from 'react-usetask-z'

useTaskEffect(
  async ({ signal }) => {
    const response = await fetch(
      '/api/users',
      {
        signal,
      },
    )

    console.log(
      await response.json(),
    )
  },
  [],
)
```

---

# API

| API | Purpose |
|---|---|
| `useTask()` | Create reactive async task |
| `useTaskEffect()` | Async effect with cleanup |
| `useTaskScope()` | Create structured task scope |
| `run()` | Execute task |
| `cancel()` | Abort task tree |
| `restart()` | Cancel and rerun |
| `reset()` | Reset task state |

---

# Task Lifecycle

```text
idle
 ↓
running
 ↓
success
error
cancelled
```

---

# Cancellation Tree

```text
Root Task
 ├── Fetch User
 ├── Fetch Posts
 │    ├── Fetch Comments
 │    └── Fetch Reactions
 └── Upload Avatar
```

Cancelling root task automatically aborts all descendants.

---

# Retry Backoff Modes

```ts
backoff:
  | 'fixed'
  | 'linear'
  | 'exponential'
```

---

# Philosophy

```text
You control:
- Business logic
- Async orchestration
- Task composition
- Runtime flow

react-usetask-z controls:
- Cancellation
- Abort propagation
- Cleanup
- Retry lifecycle
- Async orchestration
```

---

# Principles

- Structured concurrency first
- Abort everything safely
- Parent owns child lifecycle
- Cleanup by default
- Async composition over callbacks
- Tiny runtime surface
- Full TypeScript inference

---

# Comparison

| Feature | react-usetask-z | React Query | SWR | RxJS |
|---|---|---|---|---|
| Structured concurrency | ✅ | ❌ | ❌ | ⚠️ |
| Abort propagation | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Parent-child tasks | ✅ | ❌ | ❌ | ⚠️ |
| Retry policies | ✅ | ✅ | ✅ | ⚠️ |
| Polling | ✅ | ✅ | ✅ | ⚠️ |
| Task scopes | ✅ | ❌ | ❌ | ❌ |
| Cancellation tree | ✅ | ❌ | ❌ | ❌ |
| Async orchestration | ✅ | ⚠️ | ❌ | ✅ |
| React-first API | ✅ | ✅ | ✅ | ❌ |
| Lightweight runtime | ✅ | ❌ | ✅ | ❌ |

---

# When to Use

## Great Fit

- Complex async workflows
- Polling systems
- File uploads
- Realtime apps
- Dashboards
- Async orchestration
- Enterprise frontends
- Abort-heavy systems

---

## Probably Overkill

- Static websites
- Tiny apps
- Very simple fetch-only apps
- One-off API calls

---

# License

MIT
