# ZhongwenLock

ZhongwenLock is a serverless AI-powered adaptive learning platform for beginner HSK Chinese learners.

The project transforms conversational study sessions with a Custom GPT tutor into structured learning events, concept tracking, adaptive flashcards, personalized exercises, progress analytics and a configurable simulated financial commitment ledger.

## Purpose

This project is designed as a portfolio case study covering three roles:

- Product Owner
- Solutions Architect
- Cloud Architect

The goal is to demonstrate product thinking, cloud architecture, serverless design, API design, data modeling and cost-aware engineering.

## Portfolio Role Coverage

| Role | What this project demonstrates | Main artifacts |
|---|---|---|
| Product Owner | Defines the learning problem, target user, MVP scope, product priorities, user stories, roadmap and success criteria. | [`docs/PRD.md`](docs/PRD.md), [`docs/USER_STORIES.md`](docs/USER_STORIES.md), [`docs/PRODUCT_BACKLOG.md`](docs/PRODUCT_BACKLOG.md), [`docs/ROADMAP.md`](docs/ROADMAP.md) |
| Solutions Architect | Defines system boundaries, responsibility split, data flows, API contracts, ingestion flow and the concept-centered learning model. | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md), [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md), [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md) |
| Cloud Architect | Designs a low-cost serverless AWS architecture focused on API Gateway, Lambda, DynamoDB, S3, CloudWatch, IAM and cost control. | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md) |

## Problem

Beginner Chinese learners, especially HSK1 and HSK2 students, often struggle with:

- fragmented study tools;
- lack of adaptive review;
- poor visibility of repeated mistakes;
- low consistency;
- weak short-term accountability;
- manual effort when turning mistakes into review material;
- difficulty resuming personalized practice across sessions or devices.

## Solution

ZhongwenLock creates a closed learning loop:

1. The learner studies Chinese with a Custom GPT tutor.
2. The tutor generates structured study session output with detected errors, affected concepts and generated practice material.
3. In the target MVP, the structured output is sent or handed off to ZhongwenLock through an assisted/direct import flow.
4. ZhongwenLock validates the received data.
5. AWS processes and stores the learning data.
6. ZhongwenLock updates concept mastery, review state and progress analytics.
7. The learner continues from the last pending review state.
8. Failed review items inside the app update the configurable simulated ledger.

During development, a manual JSON import path is used as an engineering validation step. This allows the project to validate the JSON contract, backend ingestion pipeline and transformation logic before automating the Custom GPT integration.

Manual JSON import is not the intended target MVP user experience.

## Target Architecture

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

During engineering validation, the same ingestion backend can also be tested through a manual JSON import path.

For detailed architecture diagrams, see [`docs/DIAGRAMS.md`](docs/DIAGRAMS.md).

## MVP Scope

The target MVP focuses on:

- Custom GPT assisted/direct study session import;
- backend validation of structured study session output;
- storing mistakes, weak concepts and generated material;
- browsing a concept library by HSK level, category and concept type;
- showing adaptive flashcards;
- showing personalized exercises and mini-tests;
- resuming learning from the last pending review state;
- tracking concept mastery;
- ranking mistakes by frequency, importance and simulated cost;
- configuring simulated penalty values;
- maintaining a simulated financial ledger.

The MVP does not include:

- real money transfers;
- native mobile development;
- multi-user SaaS;
- paid AI inference inside AWS;
- real fintech integration;
- authenticated automatic session sync.

For the full product definition, see [`docs/PRD.md`](docs/PRD.md).

## Engineering Validation Path

Before implementing the target MVP import automation, ZhongwenLock validates the ingestion flow manually.

This path is used to prove:

- the study session JSON contract;
- backend validation rules;
- transformation from external study session output into internal learning items;
- concept-centered learning state;
- the rule that importing ChatGPT errors does not create ledger penalties.

The sample study session event is available in [`samples/session-event-example.json`](samples/session-event-example.json).

## Tech Stack

Planned stack:

- AWS API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon S3
- Amazon CloudWatch
- AWS IAM
- AWS Budgets
- React + Vite
- Terraform or AWS SAM

## Repository Structure

```text
docs/       Product, architecture and API documentation
samples/    Example JSON events used for testing and validation
backend/    Lambda functions and shared backend logic
frontend/   Future web/PWA application
infra/      Future Infrastructure as Code definitions
```

Main folders:

- [`docs/`](docs/) - product, architecture and API documentation.
- [`samples/`](samples/) - example JSON events used for testing and validation.
- [`backend/`](backend/) - Lambda functions and shared backend logic.
- [`frontend/`](frontend/) - future web/PWA application.
- [`infra/`](infra/) - future Infrastructure as Code definitions.

## Project Progress

ZhongwenLock follows an incremental roadmap that separates engineering validation, the target MVP product experience and future product evolution.

The project is currently aligned with the early roadmap phases:

- [Phase 0 - Engineering Validation](docs/ROADMAP.md#phase-0---engineering-validation)
- [Phase 1 - Transform Imported Data](docs/ROADMAP.md#phase-1---transform-imported-data)

The immediate backend focus is to move from validating the structured study session payload to transforming it into internal concept-centered learning items.

For the complete delivery plan, see [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Local Validation

The current backend parser can validate the sample study session event locally.

Detailed local setup instructions will be added as the backend prototype becomes more stable.

## License

This project is licensed under the MIT License.