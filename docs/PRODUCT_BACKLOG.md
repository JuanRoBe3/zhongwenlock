# Product Backlog - ZhongwenLock

## Purpose

This document prioritizes the first product backlog for the ZhongwenLock target MVP.

The backlog is based on the user stories and acceptance criteria defined in:

```text
docs/USER_STORIES.md
```

The goal is to keep the MVP focused on the first useful learning loop.

Manual JSON import is treated as an engineering validation step, not as the intended target MVP user experience.

---

## Priority Levels

- P0: required to validate the ingestion and learning-data foundation;
- P1: required for the target MVP user experience;
- P2: useful after the core learning loop works;
- P3: future backlog.

---

## P0 - Engineering Validation and Learning Data Foundation

These items are required to prove the main technical and product assumptions before automating the Custom GPT import flow.

| Priority | Story / Item | Title | Reason |
|---|---|---|---|
| P0 | US1.1 | Turn Custom GPT study into review material | Core product promise. |
| P0 | US1.2 | Keep long-term progress inside ZhongwenLock | Prevents ChatGPT from becoming the source of truth. |
| P0 | Validation item | Validate study session JSON manually | Reduces integration risk before Custom GPT assisted/direct import. |
| P0 | Validation item | Transform external study session output into internal learning items | Proves the concept-centered backend model. |
| P0 | Validation item | Confirm no ledger entry is created on import | Protects the product rule that users are not punished for importing mistakes. |

---

## P1 - Target MVP Learning Loop

These stories are required for the first usable product experience.

| Priority | Story / Item | Title | Reason |
|---|---|---|---|
| P1 | US1.3 | Import study sessions through Custom GPT assisted/direct flow | Removes manual copy/paste from the normal MVP experience. |
| P1 | US2.1 | See concepts I often fail | The product is concept-centered. |
| P1 | US3.1 | Continue from where I left off | Core review flow. |
| P1 | US3.2 | Review generated flashcards | First practice mechanism. |
| P1 | US3.3 | Complete exercises and mini-tests | Checks whether the learner really understood the concepts. |

---

## P2 - Product Usability and Accountability Layer

These stories make the MVP useful beyond the first review loop.

| Priority | Story | Title | Reason |
|---|---|---|---|
| P2 | US2.2 | Browse concepts by HSK level and category | Makes concept data easier to explore. |
| P2 | US2.3 | Open a concept detail page | Helps the learner understand repeated mistakes. |
| P2 | US4.1 | View a simple dashboard | Makes progress visible. |
| P2 | US4.2 | See what mistakes cost me | Adds accountability after failed review. |
| P2 | US4.3 | Configure penalty values | Makes the simulated ledger personal and adjustable. |

---

## P3 - Future Backlog

These items are intentionally outside the target MVP.

| Priority | Item | Reason |
|---|---|---|
| P3 | Authenticated automatic session sync | Useful after the assisted/direct import flow is proven. |
| P3 | Multi-user authentication | Needed for real SaaS usage. |
| P3 | Notifications | Useful for habit building. |
| P3 | Advanced spaced repetition | Improves review quality. |
| P3 | Advanced HSK estimation | Needs more learning data first. |
| P3 | Native mobile app | Not needed for the first web/PWA product. |
| P3 | Exports to CSV or Markdown | Useful for later portability. |

---

## MVP Cut

The target MVP should prove this loop:

```text
Custom GPT study session
        ↓
assisted/direct structured import
        ↓
ZhongwenLock validation
        ↓
concepts, errors and practice material
        ↓
review inside ZhongwenLock
        ↓
mastery and review state update
        ↓
ledger update only after failed in-app review
```

The manual JSON import path is kept as an engineering validation step before the target MVP import flow is automated.

The simulated ledger is important, but it depends on failed review answers. For that reason, it comes after the basic review flow exists.