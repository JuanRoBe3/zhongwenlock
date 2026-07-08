# ZhongwenLock

ZhongwenLock is a serverless AI-powered adaptive learning platform for beginner HSK Chinese learners.

The project transforms conversational study sessions with a Custom GPT tutor into structured learning events, concept tracking, adaptive flashcards, personalized exercises, progress analytics and a configurable simulated financial commitment ledger.

## Purpose

This project is designed as a portfolio case study covering three roles:

- Product Owner
- Solutions Architect
- Cloud Architect

The goal is to demonstrate product thinking, cloud architecture, serverless design, API design, data modeling and cost-aware engineering.

## Problem

Beginner Chinese learners, especially HSK1 and HSK2 students, often struggle with:

- fragmented study tools;
- lack of adaptive review;
- poor visibility of repeated mistakes;
- low consistency;
- weak short-term accountability;
- manual effort when turning mistakes into review material.

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

## Engineering Validation Path

Before implementing the target MVP import automation, ZhongwenLock validates the ingestion flow manually.

This path is used to prove:

- the study session JSON contract;
- backend validation rules;
- transformation from external study session output into internal learning items;
- concept-centered learning state;
- the rule that importing ChatGPT errors does not create ledger penalties.

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

## Current Status

Project documentation and MVP architecture definition are in progress.

The current backend prototype can validate a local study session JSON example through the `ingest-session` parser.

The next backend step is to transform the validated external study session event into internal concept-centered learning items.

## License

This project is licensed under the MIT License.