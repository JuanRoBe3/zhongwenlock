# Architecture - ZhongwenLock

## 1. Architecture Goal

ZhongwenLock uses a serverless AWS architecture designed for personal low-cost usage and portfolio demonstration.

The system avoids always-on infrastructure and focuses on event-driven processing.

The main goals are:

- keep operational cost close to zero for personal usage;
- avoid servers that remain running all day;
- process study sessions only when events happen;
- store learning progress in a structured way;
- provide a web/PWA app as the main user interface.

---

## 2. High-Level Architecture

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

---

## 3. Component Overview

### Custom GPT / ChatGPT

Acts as the Chinese HSK tutor.

It helps the user study and generates a structured JSON event at the end of each session.

In the first MVP, ChatGPT does not send data directly to AWS. The user manually copies the JSON and imports it into the web app.

### Web App / PWA

Acts as the main product interface.

It allows the user to import study sessions, review flashcards, complete tests, see progress analytics and view the simulated financial ledger.

### API Gateway

Acts as the public HTTP entry point for the backend.

The web app sends requests to API Gateway, and API Gateway routes them to the correct Lambda function.

### AWS Lambda

Acts as the serverless backend compute layer.

Lambda functions process events such as importing a study session, generating the daily review, completing a review session or retrieving dashboard data.

### DynamoDB

Acts as the main database.

It stores study sessions, mistakes, flashcards, exercises, tests, progress data and simulated ledger entries.

### S3

May be used later to host the static web app and store optional exports such as JSON, CSV or Markdown files.

### CloudWatch

Used for logs and debugging.

It helps understand whether requests reached the backend and whether Lambda functions failed.

### IAM

Controls permissions between AWS services.

Each Lambda should only have the permissions it needs.

### AWS Budgets

Used to create cost alerts and reduce the risk of unexpected AWS charges.

---

## 4. MVP Design Decisions

The MVP intentionally avoids:

- EC2;
- RDS;
- NAT Gateway;
- OpenSearch;
- ECS/Fargate;
- real banking integrations;
- paid AI inference inside AWS.

The reason is to keep the architecture small, serverless and cost-aware.