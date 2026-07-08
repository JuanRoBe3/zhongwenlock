# Architecture - ZhongwenLock

## 1. Architecture Goal

ZhongwenLock uses a serverless AWS architecture designed for personal low-cost usage and portfolio demonstration.

The system avoids always-on infrastructure and focuses on event-driven processing.

The main goals are:

- keep operational cost close to zero for personal usage;
- avoid servers that remain running all day;
- process study sessions only when events happen;
- store learning progress in a structured way;
- provide a web/PWA app as the main user interface;
- keep ZhongwenLock as the source of truth for long-term learning state.

---

## 2. Delivery Horizons

ZhongwenLock separates the implementation path from the target MVP experience.

| Horizon | Purpose | Import model |
|---|---|---|
| Engineering Validation | Validate the contract and ingestion flow safely | Manual JSON paste/upload or local sample |
| Target MVP | Deliver the first usable product loop | Custom GPT assisted/direct import |
| Future Product | Improve continuity and automation | Authenticated automatic sync |

Manual JSON import is not the target MVP user experience. It is used to reduce risk while validating the ingestion pipeline.

---

## 3. High-Level Architecture

Target MVP:

```text
Custom GPT / ChatGPT Tutor
        ↓
Assisted / Direct Study Session Import
        ↓
API Gateway
        ↓
AWS Lambda
        ↓
DynamoDB
        ↓
Web App / PWA
```

Engineering validation path:

```text
Sample JSON / Manual Import
        ↓
Web App, local script or backend parser
        ↓
Same validation and transformation logic
        ↓
Internal learning items
```

Both paths should reuse the same ZhongwenLock validation and transformation logic.

---

## 4. Component Overview

### Custom GPT / ChatGPT

Acts as the Chinese HSK tutor.

It helps the user study and generates structured study session output at the end of each session.

The structured output represents observed learning events:

- detected mistakes;
- affected concepts;
- suggested review priority;
- explanations;
- generated flashcards;
- generated exercises;
- generated mini-tests.

ChatGPT does not calculate authoritative mastery scores, accumulated progress, review state, dashboard metrics or final penalty amounts.

Those values are managed by ZhongwenLock.

In the target MVP, the Custom GPT sends or hands off structured study session output to ZhongwenLock through an assisted/direct import flow.

### Web App / PWA

Acts as the main product interface.

It allows the user to:

- see imported study results;
- review flashcards;
- complete exercises and tests;
- browse the concept library;
- see progress analytics;
- resume pending learning;
- view the simulated financial ledger.

During engineering validation, the web app may also provide a manual JSON import screen to test the ingestion pipeline.

### API Gateway

Acts as the public HTTP entry point for the backend.

The target MVP import flow sends structured study session output to API Gateway.

API Gateway routes requests to the correct Lambda function.

### AWS Lambda

Acts as the serverless backend compute layer.

Lambda functions process events such as:

- importing a study session;
- validating structured study session output;
- transforming external events into internal learning items;
- resuming pending review;
- completing a review session;
- retrieving dashboard data;
- calculating simulated penalties;
- updating concept mastery.

### DynamoDB

Acts as the main database.

It stores:

- study sessions;
- concepts;
- error events;
- flashcards;
- exercises;
- mini-tests;
- review state;
- mastery scores;
- penalty configuration;
- simulated ledger entries.

### S3

May be used to host the static web app and store optional exports such as JSON, CSV or Markdown files.

### CloudWatch

Used for logs and debugging.

It helps understand whether requests reached the backend and whether Lambda functions failed.

### IAM

Controls permissions between AWS services.

Each Lambda should only have the permissions it needs.

### AWS Budgets

Used to create cost alerts and reduce the risk of unexpected AWS charges.

---

## 5. MVP Design Decisions

The MVP intentionally avoids:

- EC2;
- RDS;
- NAT Gateway;
- OpenSearch;
- ECS/Fargate;
- real banking integrations;
- paid AI inference inside AWS;
- authenticated automatic session sync.

The reason is to keep the architecture small, serverless and cost-aware.

---

## 6. Responsibility Split

ZhongwenLock separates observed learning events from long-term learning state.

ChatGPT is responsible for:

- detecting mistakes during a study session;
- identifying affected concepts;
- suggesting categories and review priority;
- generating explanations;
- generating flashcards, exercises and mini-tests;
- preparing structured study session output.

ZhongwenLock is responsible for:

- validating received study session data;
- transforming external events into internal learning items;
- storing learning data;
- preparing review items;
- calculating mastery scores;
- calculating simulated penalties after failed review answers;
- maintaining the simulated ledger;
- deciding what the user should review next;
- generating dashboard metrics.

The import mechanism may evolve, but this responsibility split does not change.

---

## 7. Ledger Rule

Importing a ChatGPT study session does not create a ledger penalty.

The ledger is updated only when the user fails review items inside ZhongwenLock.

This protects the user from being punished for mistakes detected during a study conversation and keeps penalties tied to in-app review attempts.

---

## 8. Current Implementation Status

The current implementation is still local.

At this stage, the project includes:

- product and architecture documentation;
- an example study session JSON;
- a local `ingest-session` backend parser;
- validation of the imported study session structure.

The next backend steps are:

- transform the validated external study session event into internal learning items;
- define the DynamoDB physical design;
- create the first API endpoint;
- connect the target MVP import flow to the backend.