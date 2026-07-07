# Product Backlog - ZhongwenLock

## Purpose

This document prioritizes the first product backlog for the ZhongwenLock MVP.

The backlog is based on the user stories and acceptance criteria defined in:

```text
docs/USER_STORIES.md
```

The goal is to keep the MVP focused on the first useful learning loop.

---

## Priority Levels

- P0: required for the first end-to-end MVP learning loop;
- P1: important for the first usable version;
- P2: useful after the core loop works;
- P3: future backlog.

---

## P0 - Core MVP Learning Loop

These stories are required to prove the main product idea.

| Priority | Story | Title | Reason |
|---|---|---|---|
| P0 | US1.1 | Turn ChatGPT study into review material | Core product promise. |
| P0 | US1.2 | Keep long-term progress inside ZhongwenLock | Prevents ChatGPT from becoming the source of truth. |
| P0 | US2.1 | See concepts I often fail | The product is concept-centered. |
| P0 | US3.1 | Continue from where I left off | Core review flow. |
| P0 | US3.2 | Review generated flashcards | First practice mechanism. |

---

## P1 - First Usable Product

These stories make the MVP useful beyond the first technical loop.

| Priority | Story | Title | Reason |
|---|---|---|---|
| P1 | US2.2 | Browse concepts by HSK level and category | Makes concept data easier to explore. |
| P1 | US2.3 | Open a concept detail page | Helps the learner understand repeated mistakes. |
| P1 | US3.3 | Complete exercises and mini-tests | Checks whether the learner really understood the concepts. |
| P1 | US4.1 | View a simple dashboard | Makes progress visible. |

---

## P2 - Accountability Layer

These stories add the simulated financial commitment layer.

| Priority | Story | Title | Reason |
|---|---|---|---|
| P2 | US4.2 | See what mistakes cost me | Adds accountability after failed review. |
| P2 | US4.3 | Configure penalty values | Makes the simulated ledger personal and adjustable. |

---

## P3 - Future Backlog

These items are intentionally outside the first MVP.

| Priority | Item | Reason |
|---|---|---|
| P3 | Direct Custom GPT Action integration | Removes manual JSON import later. |
| P3 | Authentication | Needed for real multi-user usage. |
| P3 | Notifications | Useful for habit building. |
| P3 | Advanced spaced repetition | Improves review quality. |
| P3 | Advanced HSK estimation | Needs more learning data first. |
| P3 | Native mobile app | Not needed for the first web/PWA MVP. |

---

## MVP Cut

The first MVP should prove this loop:

```text
ChatGPT study session
        ↓
structured import
        ↓
concepts, errors and practice material
        ↓
review inside ZhongwenLock
        ↓
mastery update
```

The simulated ledger is important, but it depends on failed review answers. For that reason, it comes after the basic review flow exists.