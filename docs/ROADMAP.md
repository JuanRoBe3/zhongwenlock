# Roadmap - ZhongwenLock

## Purpose

This roadmap defines the planned steps to complete the ZhongwenLock target MVP.

The goal is to keep the project realistic, focused and incremental.

ZhongwenLock separates:

- engineering validation work;
- target MVP product experience;
- future product evolution.

Manual JSON import is part of the engineering validation path, not the intended target MVP user experience.

---

## Target MVP Goal

The target MVP should allow the user to:

1. continue learning from a Custom GPT study session;
2. receive or hand off structured study session output into ZhongwenLock;
3. extract concepts, errors and generated practice material;
4. review weak concepts inside ZhongwenLock;
5. update mastery based on review results;
6. see a simple dashboard;
7. update a simulated ledger when review items are failed.

---

## Phase 0 - Engineering Validation

Goal: validate the structured study session contract and ingestion pipeline before automating the Custom GPT import flow.

Planned work:

- create a representative study session JSON sample;
- validate the study session payload locally;
- reject invalid payloads with clear errors;
- confirm that ChatGPT does not provide mastery, progress or ledger values;
- confirm that importing a study session does not create ledger penalties.

Reason:

Manual validation reduces integration risk before implementing the target MVP import flow.

It allows the project to debug the JSON contract, backend validation and transformation logic independently.

---

## Phase 1 - Transform Imported Data

Goal: transform the validated external study session event into internal learning data.

Planned work:

- create session trace data;
- create concept data;
- create error event data;
- create flashcard data;
- create exercise data;
- create mini-test data;
- prepare pending review state;
- keep ledger entries empty on import.

Reason:

The app should not depend directly on raw Custom GPT output. ZhongwenLock needs its own internal representation and remains the source of truth.

---

## Phase 2 - DynamoDB Design

Goal: design how the internal learning data will be stored in DynamoDB.

Planned work:

- define the DynamoDB table strategy;
- define partition key and sort key structure;
- define item types;
- document access patterns;
- decide whether raw imported JSON should also be stored;
- include `import_source` for traceability.

Reason:

The data model is concept-centered, so the DynamoDB design must support dashboard, concept library, review and ledger queries.

---

## Phase 3 - First API Endpoint

Goal: expose the ingestion flow through an HTTP API.

Planned work:

- create `POST /sessions`;
- connect API Gateway to Lambda;
- return validation errors;
- return success response;
- store processed learning data;
- support both engineering validation imports and target MVP Custom GPT assisted/direct imports through the same validation logic.

Reason:

This turns the local parser into the first real backend capability and prepares the system for the target MVP import flow.

---

## Phase 4 - Target MVP Import Flow

Goal: implement the Custom GPT assisted/direct import path.

Planned work:

- define how the Custom GPT sends or hands off structured study session output;
- ensure `POST /sessions` can receive target MVP imports;
- preserve ZhongwenLock validation before storing data;
- keep ZhongwenLock as the source of truth for mastery, review state, dashboard metrics and ledger logic;
- show import results to the user inside the web/PWA.

Reason:

The target MVP should not rely on manual copy/paste as the normal user experience.

Manual import is useful for engineering validation, but the product value improves when the Custom GPT can send or hand off structured output more directly.

---

## Phase 5 - Web/PWA Review Experience

Goal: create the first user-facing review flow.

Planned work:

- create the React + Vite app;
- show pending review items;
- show generated flashcards;
- show exercises and mini-tests;
- allow the user to submit review answers;
- display success and error states.

Reason:

The user needs a simple way to continue learning after the Custom GPT study session.

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

## Phase 7 - Mastery and Review State

Goal: allow the app to behave like an adaptive learning loop.

Planned work:

- update mastery from flashcard results;
- update mastery from exercise answers;
- update mastery from mini-test results;
- maintain pending review state;
- prioritize weak concepts;
- support continuing from the last pending state.

Reason:

ZhongwenLock should become more than a viewer of imported data. It should actively maintain learning state.

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

Ledger entries are created only from failed review attempts inside ZhongwenLock, not from ChatGPT import.

---

## Phase 9 - AWS Deployment

Goal: deploy the MVP using low-cost serverless AWS services.

Planned work:

- deploy Lambda;
- deploy API Gateway;
- deploy DynamoDB;
- host the frontend with S3;
- add CloudWatch logs;
- configure AWS Budgets;
- apply least-privilege IAM permissions.

Reason:

The project should demonstrate Cloud Architect skills while avoiding unnecessary always-on infrastructure.

---

## Future Backlog

These ideas are outside the target MVP:

- authenticated automatic session sync;
- account linking;
- multi-user authentication;
- notifications;
- advanced spaced repetition;
- advanced HSK estimation;
- native mobile app;
- exports to CSV or Markdown.