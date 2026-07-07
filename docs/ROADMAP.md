# Roadmap - ZhongwenLock

## Purpose

This roadmap defines the planned steps to complete the ZhongwenLock MVP.

The goal is to keep the project realistic, focused and incremental.

---

## MVP Goal

The MVP should allow the user to:

1. continue learning from a ChatGPT study session;
2. extract concepts, errors and generated practice material;
3. review weak concepts inside ZhongwenLock;
4. update mastery based on review results;
5. see a simple dashboard;
6. update a simulated ledger when review items are failed.

---

## Phase 1 - Study Session Import

Goal: prove that ZhongwenLock can receive and validate structured study data from ChatGPT.

Planned work:

- keep the JSON import manual in the first MVP;
- validate the study session payload;
- reject invalid payloads with clear errors;
- accept valid payloads for processing.

Reason:

Manual import keeps the MVP simple and avoids debugging Custom GPT Actions too early.

---

## Phase 2 - Transform Imported Data

Goal: transform the imported JSON into internal learning data.

Planned work:

- create session data;
- create concept data;
- create error event data;
- create flashcard data;
- create exercise data;
- create mini-test data;
- prepare review state.

Reason:

The app should not depend directly on the raw ChatGPT JSON. ZhongwenLock needs its own internal representation.

---

## Phase 3 - DynamoDB Design

Goal: design how the internal learning data will be stored in DynamoDB.

Planned work:

- define the DynamoDB table strategy;
- define partition key and sort key structure;
- define item types;
- document access patterns;
- decide whether raw imported JSON should also be stored.

Reason:

The data model is concept-centered, so the DynamoDB design must support dashboard, concept library, review and ledger queries.

---

## Phase 4 - First API Endpoint

Goal: expose the import flow through an HTTP API.

Planned work:

- create `POST /sessions`;
- connect API Gateway to Lambda;
- return validation errors;
- return success response;
- store processed learning data.

Reason:

This turns the local parser into the first real backend capability.

---

## Phase 5 - Web/PWA Import Screen

Goal: create the first user-facing flow.

Planned work:

- create the React + Vite app;
- create a JSON import screen;
- send the JSON to `POST /sessions`;
- show success and error messages.

Reason:

The user needs a simple way to bring ChatGPT study data into ZhongwenLock during the MVP.

---

## Phase 6 - Concept Library and Dashboard

Goal: make the imported data useful to the learner.

Planned work:

- show a dashboard summary;
- show weak concepts;
- show most repeated mistakes;
- show a concept library;
- filter by HSK level, category and concept type;
- open a concept detail page.

Reason:

The product should help the learner understand what to review next.

---

## Phase 7 - Review Flow

Goal: allow the user to practice inside ZhongwenLock.

Planned work:

- show pending flashcards;
- show exercises and mini-tests;
- submit review answers in batches;
- update mastery;
- update review state.

Reason:

The app should become an adaptive learning loop, not only a viewer of imported data.

---

## Phase 8 - Simulated Ledger

Goal: add accountability after review mistakes.

Planned work:

- add penalty configuration;
- calculate penalties when review items are failed;
- show total simulated balance;
- show cost by concept;
- show cost by category;
- keep all money movement simulated.

Reason:

The ledger should reinforce consistency without involving real money.

---

## Phase 9 - AWS Deployment

Goal: deploy the MVP using low-cost serverless AWS services.

Planned work:

- deploy Lambda;
- deploy API Gateway;
- deploy DynamoDB;
- host the frontend with S3;
- add CloudWatch logs;
- configure AWS Budgets.

Reason:

The project should demonstrate Cloud Architect skills while avoiding unnecessary always-on infrastructure.

---

## Future Backlog

These ideas are outside the first MVP:

- direct Custom GPT Action integration;
- authentication;
- notifications;
- advanced spaced repetition;
- advanced HSK estimation;
- native mobile app;
- exports to CSV or Markdown.