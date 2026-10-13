# Vue Chat

**A real-time chat room built with Vue 3, Vite, and Firebase: email/password sign-up and login, a single shared room whose messages stream in live from Firestore, relative timestamps, and auto-scroll to the newest message.** The UI text is partly in Russian.

## How it works

- **Auth** — sign-up creates a Firebase Auth user and stores the display name on the profile; login and logout use the same Auth instance. The current user is tracked reactively in `useUser`.
- **Live messages** — `getCollection('messages')` subscribes to the Firestore collection ordered by `createdAt` with `onSnapshot`, skips documents whose server timestamp hasn't resolved yet, and unsubscribes when the component unmounts.
- **Sending** — `useCollection('messages').addDoc` writes `{name, message, createdAt}` with a server timestamp; Enter sends and clears the input.
- **Display** — `date-fns` renders "x minutes ago" in Russian, and the message list scrolls to the bottom on every update.

| Route | View |
|---|---|
| `/` | Welcome: sign-up or login form |
| `/chatroom` | Navbar with greeting and logout, message window, input |

Logic is split into composables (`src/composables/`) — `useSignup`, `useLogin`, `useLogout`, `useUser`, `getCollection`, `useCollection` — so components stay thin.

## Running

Requires Node.js and a Firebase project with Email/Password authentication and Firestore enabled. Update `src/firebase/config.js` with your project's web config, then:

```bash
git clone https://github.com/AliAzamat/vue-chat.git
cd vue-chat
npm install
npm run dev
```

## Status

The production build doesn't currently succeed. Three fixes make `vite build` pass (verified):

1. **Add `date-fns`** to dependencies — it's imported but not in `package.json`.
2. **Fix an import's casing** — `Chatroom.vue` imports `../components/Navbar.vue`, but the file is `NavBar.vue`. This works on case-insensitive filesystems (macOS, Windows) but fails on Linux and most CI.
3. **Use Firebase's compat imports** — the code uses the v8 namespaced API (`firebase.auth()`, `firebase.firestore()`), but `package.json` installs Firebase 9; importing from `firebase/compat/app`, `firebase/compat/auth`, and `firebase/compat/firestore` restores that API.

Other notes:

- `/chatroom` has no route guard, so an unauthenticated visitor can open it.
- Error messages from failed writes are set on the wrong variable in `useCollection` and never reach the UI.
- There's one global room; no message editing, deletion, or pagination.
