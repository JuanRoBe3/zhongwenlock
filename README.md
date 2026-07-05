# ZhongwenLock

ZhongwenLock is a serverless AI-powered adaptive learning platform for HSK Chinese learners.

The project transforms conversational study sessions into structured learning events, adaptive flashcards, personalized exercises, progress analytics and a simulated financial commitment ledger.

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
- poor visibility of real progress;
- low consistency;
- weak short-term accountability.

## Solution

ZhongwenLock creates a closed learning loop:

1. The learner studies Chinese with a Custom GPT tutor.
2. At the end of the session, the tutor generates a structured JSON event.
3. The user imports that JSON into the ZhongwenLock web app.
4. AWS processes and stores the session data.
5. The app displays flashcards, tests, exercises, progress analytics and a simulated financial ledger.

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
- showing adaptive flashcards;
- showing personalized exercises and mini-tests;
- generating a daily review;
- tracking HSK progress;
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

## License

This project is licensed under the MIT License.