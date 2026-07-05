# Product Requirements Document - ZhongwenLock

## 1. Product Vision

ZhongwenLock is an adaptive learning platform for beginner Chinese learners preparing for HSK1 and HSK2.

The product transforms study sessions with ChatGPT into structured learning events, flashcards, exercises, progress analytics and a simulated financial commitment ledger.

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
2. ChatGPT generates a structured JSON event at the end of the session.
3. The user imports the JSON into the ZhongwenLock web app.
4. AWS processes and stores the session data.
5. The app displays flashcards, exercises, mini-tests, progress analytics and a simulated financial ledger.

## 5. MVP Features

The first version should include:

- study session import;
- error tracking;
- generated flashcards;
- generated exercises;
- mini-tests;
- daily review;
- progress dashboard;
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
- number of flashcards reviewed;
- daily review completion rate;
- reduction of repeated mistakes;
- mastery score by HSK concept;
- simulated ledger balance.

## 8. Current Status

Version: PRD v0.1

The product is currently in the design and architecture definition phase.