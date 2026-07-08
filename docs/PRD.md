# Product Requirements Document - ZhongwenLock

## 1. Product Vision

ZhongwenLock is an adaptive learning platform for beginner Chinese learners preparing for HSK1 and HSK2.

The product transforms study sessions with a Custom GPT tutor into structured learning events, concept tracking, flashcards, exercises, progress analytics and a configurable simulated financial commitment ledger.

The main goal is to help the learner understand which Chinese concepts are weak, repeated, expensive and worth reviewing next.

---

## 2. Problem

Beginner Chinese learners often struggle with:

- fragmented study tools;
- lack of adaptive review;
- poor visibility of repeated mistakes;
- low consistency;
- manual effort when creating flashcards or review material;
- difficulty knowing what to review next.

AI tutors can help during a conversation, but mistakes and corrections often disappear after the session ends.

---

## 3. Target User

The initial target user is a self-directed HSK1/HSK2 learner who studies Chinese with AI tools and wants a structured way to track mistakes and review weak concepts.

The first real user of the MVP is the project owner.

---

## 4. Product Principle

ChatGPT / Custom GPT acts as a tutor and content generator.

ChatGPT can generate:

- detected errors;
- affected concepts;
- `review_priority`;
- explanations;
- flashcards;
- exercises;
- mini-tests;
- structured study session output.

ChatGPT must not generate or own:

- mastery scores;
- accumulated progress;
- review state;
- dashboard metrics;
- ledger balances;
- final penalty amounts.

Those values are calculated and owned by ZhongwenLock.

---

## 5. Target MVP Solution

The target MVP creates a closed learning loop:

1. The user studies Chinese with a Custom GPT tutor.
2. The Custom GPT generates structured study session output with detected errors, affected concepts and generated practice material.
3. The structured output is sent or handed off to ZhongwenLock through an assisted/direct import flow.
4. ZhongwenLock validates the received data.
5. ZhongwenLock transforms the external study session output into internal concept-centered learning items.
6. AWS processes and stores the learning data.
7. ZhongwenLock prepares pending review items.
8. The app helps the user continue learning from the last pending review state.
9. ZhongwenLock updates concept mastery, review state and progress analytics based on in-app review attempts.
10. If the user fails review items inside the app, ZhongwenLock updates the simulated ledger.

---

## 6. Engineering Validation Path

Before implementing the target MVP import automation, ZhongwenLock uses a manual JSON import path as an engineering validation step.

This is not the intended target MVP user experience.

The manual import path exists to validate:

- the study session JSON contract;
- backend validation rules;
- transformation into internal learning items;
- concept-centered data modeling;
- the rule that importing ChatGPT errors does not create ledger penalties.

This reduces integration risk before connecting the Custom GPT assisted/direct import flow.

---

## 7. MVP Features

The target MVP should include:

- Custom GPT assisted/direct study session import;
- validation of structured study session output;
- transformation into internal learning items;
- error tracking by concept;
- generated flashcards;
- generated exercises;
- mini-tests;
- resume learning from the last pending review state;
- progress dashboard;
- concept library by HSK level, category and concept type;
- concept detail page with historical mistakes and corrections;
- concept mastery tracking;
- ranking of most frequent mistakes;
- ranking of most expensive mistakes;
- configurable simulated penalty values;
- simulated financial ledger.

---

## 8. Out of Scope for MVP

The MVP will not include:

- real money transfers;
- native mobile app;
- multi-user SaaS;
- paid AI generation inside AWS;
- real fintech integration;
- authenticated automatic session sync;
- advanced spaced repetition;
- advanced HSK estimation;
- notifications.

---

## 9. Success Metrics

Potential success metrics:

- number of study sessions imported;
- number of concepts detected;
- number of flashcards reviewed;
- review completion rate;
- reduction of repeated mistakes;
- mastery score by concept;
- estimated HSK progress;
- most frequent mistakes;
- most expensive concepts;
- simulated ledger balance.

---

## 10. Current Status

Version: PRD v0.2

The product is currently in the design, architecture definition and engineering validation phase.

The current implementation validates a local study session JSON example before moving to internal learning item transformation and AWS persistence.