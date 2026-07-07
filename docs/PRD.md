# Product Requirements Document - ZhongwenLock

## 1. Product Vision

ZhongwenLock is an adaptive learning platform for beginner Chinese learners preparing for HSK1 and HSK2.

The product transforms study sessions with ChatGPT into structured learning events, concept tracking, flashcards, exercises, progress analytics and a configurable simulated financial commitment ledger.

The main goal is to help the learner understand which Chinese concepts are weak, repeated, expensive and worth reviewing next.

## 2. Problem

Beginner Chinese learners often struggle with:

- fragmented study tools;
- lack of adaptive review;
- poor visibility of repeated mistakes;
- low consistency;
- manual effort when creating flashcards or review material.

## 3. Target User

The initial target user is a self-directed HSK1/HSK2 learner who studies Chinese with AI tools and wants a structured way to track mistakes and review weak concepts.

The first real user of the MVP is the project owner.

## 4. MVP Solution

The MVP creates a closed learning loop:

1. The user studies Chinese with a Custom GPT tutor.
2. ChatGPT generates a structured JSON event with detected errors, affected concepts and generated practice material.
3. The user imports the JSON into the ZhongwenLock web app.
4. AWS processes and stores the learning data.
5. ZhongwenLock updates concept mastery, review state, analytics and the simulated ledger.
6. The app helps the user continue learning from the last pending state.

## 5. MVP Features

The first version should include:

- study session import;
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

## 6. Out of Scope for MVP

The MVP will not include:

- real money transfers;
- native mobile app;
- multi-user SaaS;
- paid AI generation inside AWS;
- real fintech integration.

## 7. Success Metrics

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

## 8. Current Status

Version: PRD v0.1

The product is currently in the design and architecture definition phase.