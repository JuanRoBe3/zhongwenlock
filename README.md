# ZhongwenLock

ZhongwenLock is a serverless AI-powered adaptive learning platform for beginner HSK Chinese learners.

The project transforms conversational study sessions into structured learning events, concept tracking, adaptive flashcards, personalized exercises, progress analytics and a configurable simulated financial commitment ledger.

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
- weak short-term accountability.

## Solution

ZhongwenLock creates a closed learning loop:

1. The learner studies Chinese with a Custom GPT tutor.
2. At the end of the session, the tutor generates a structured JSON event with detected errors, affected concepts and generated practice material.
3. The user imports that JSON into the ZhongwenLock web app.
4. AWS processes and stores the learning data.
5. ZhongwenLock updates concept mastery, review state, progress analytics and the simulated ledger.
6. The learner continues from the last pending review state.

## Target Architecture

```text
Custom GPT / ChatGPT
        ↓
Web App / Import Screen
        ↓
API Gateway
        ↓
AWS Lambda
        ↓
DynamoDB
        ↓
Web App / PWA
```

## MVP Scope

The MVP focuses on:

- importing study session events;
- storing mistakes, weak concepts and generated material;
- browsing a concept library by HSK level, category and concept type;
- showing adaptive flashcards;
- showing personalized exercises and mini-tests;
- resuming learning from the last pending review state;
- tracking concept mastery;
- ranking mistakes by frequency, importance and simulated cost;
- configuring simulated penalty values;
- maintaining a simulated financial ledger.

The MVP does not include real money transfers, native mobile development or paid AI inference inside AWS.

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
backend/    Future Lambda functions and shared backend logic
frontend/   Future web/PWA application
infra/      Future Infrastructure as Code definitions
```

## Current Status

Project documentation and MVP architecture definition in progress.

The current backend prototype can validate a local study session JSON example through the `ingest-session` parser.

## License

This project is licensed under the MIT License.