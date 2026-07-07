# User Stories - ZhongwenLock

## Purpose

This document defines the first user stories for the ZhongwenLock MVP.

The stories describe what the learner or product stakeholder wants to achieve. They include acceptance criteria so they can be used as agile requirements.

Some technical decisions, such as manual JSON import, are included as MVP implementation notes when needed.

---

## Epic 1 - Continue Learning from ChatGPT

### US1.1 - Turn ChatGPT study into review material

As an HSK learner,  
I want my ChatGPT study session to become review material in ZhongwenLock,  
so that I can keep practicing the concepts I struggled with.

Acceptance criteria:

- The app can receive structured study data from ChatGPT.
- The app identifies affected concepts.
- The app stores generated flashcards, exercises and mini-tests.
- The user can review that material later.
- For the MVP, the study data can be imported manually as JSON.

Implementation notes:

- Manual JSON import is a temporary MVP decision.
- Direct Custom GPT Action integration is out of scope for the first MVP.
- The JSON must follow `samples/session-event-example.json`.

---

### US1.2 - Keep long-term progress inside ZhongwenLock

As an HSK learner,  
I want ZhongwenLock to calculate my progress independently from ChatGPT,  
so that my mastery, review state and ledger remain consistent over time.

Acceptance criteria:

- ChatGPT does not provide mastery scores.
- ChatGPT does not provide ledger balances.
- ChatGPT does not decide final penalty amounts.
- ZhongwenLock owns mastery, progress, review state and ledger calculations.

---

## Epic 2 - Understand Weak Concepts

### US2.1 - See concepts I often fail

As an HSK learner,  
I want to see which concepts I fail most often,  
so that I know what I should focus on.

Acceptance criteria:

- Errors are grouped by concept.
- Concepts show number of mistakes.
- Concepts can be ranked by error frequency.
- Concepts can show their latest review status.

---

### US2.2 - Browse concepts by HSK level and category

As an HSK learner,  
I want to browse concepts by HSK level, category and type,  
so that I can review vocabulary, grammar and weak areas in an organized way.

Acceptance criteria:

- Concepts can be filtered by HSK level.
- Concepts can be filtered by category.
- Concepts can be filtered by concept type.
- Concepts show mastery level when available.
- Concepts show number of errors when available.

---

### US2.3 - Open a concept detail page

As an HSK learner,  
I want to open a concept and see my mistakes, corrections and practice material,  
so that I can understand exactly why I keep failing it.

Acceptance criteria:

- The concept page shows concept information.
- The concept page shows historical mistakes.
- The concept page shows corrections.
- The concept page shows related flashcards.
- The concept page shows related exercises and mini-tests.
- The concept page shows mastery and simulated cost if available.

---

## Epic 3 - Practice and Improve

### US3.1 - Continue from where I left off

As an HSK learner,  
I want to continue from my last pending review state,  
so that I can keep learning without manually deciding what to study next.

Acceptance criteria:

- The app knows which review items are pending.
- The app can resume unfinished or pending material.
- The app prioritizes weak concepts.
- The app does not depend only on a strict daily review.

---

### US3.2 - Review generated flashcards

As an HSK learner,  
I want to review flashcards based on my weak concepts,  
so that I can reinforce what I previously failed.

Acceptance criteria:

- Flashcards are linked to concepts.
- The user can answer or mark flashcards during review.
- Flashcard results update concept mastery.
- Failed flashcards can be recorded as review mistakes.

---

### US3.3 - Complete exercises and mini-tests

As an HSK learner,  
I want to complete exercises and mini-tests based on my weak concepts,  
so that I can check whether I have actually understood them.

Acceptance criteria:

- Exercises are linked to concepts.
- Mini-tests are linked to concepts.
- The user can submit answers inside the app.
- Results update mastery.
- Failed answers may create simulated ledger entries.

---

## Epic 4 - Progress and Accountability

### US4.1 - View a simple dashboard

As an HSK learner,  
I want to see a dashboard with my progress and weak areas,  
so that I know what to study next.

Acceptance criteria:

- The dashboard shows global progress.
- The dashboard shows weak concepts.
- The dashboard shows pending review items.
- The dashboard shows recent activity.
- The dashboard can show simulated ledger information when available.

---

### US4.2 - See what mistakes cost me

As an HSK learner,  
I want to see which concepts cost me the most simulated money,  
so that I feel accountable for repeated mistakes.

Acceptance criteria:

- The ledger shows total simulated balance.
- The ledger shows cost by concept.
- The ledger shows cost by category.
- Ledger entries are created from failed review items, not from ChatGPT import.
- Ledger entries are simulated and do not move real money.

---

### US4.3 - Configure penalty values

As an HSK learner,  
I want to decide how much failed review items cost,  
so that the simulated ledger feels motivating but not excessive.

Acceptance criteria:

- The user can configure the cost of a failed flashcard.
- The user can configure the cost of a failed exercise.
- The user can configure the cost of a failed mini-test.
- The user can define a maximum penalty per review session.

---

## MVP Notes

Manual JSON import is not the final desired user experience.

It is a temporary MVP decision used to validate the learning loop before building direct Custom GPT Action integration.