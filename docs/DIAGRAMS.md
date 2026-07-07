# Diagrams - ZhongwenLock

## Purpose

This document contains the first visual diagrams for ZhongwenLock.

The diagrams are intentionally simple. They are used to explain the product flow, responsibility boundaries and architecture decisions before the full implementation exists.

Each diagram also identifies which professional role would usually own or lead that type of work:

- Product Owner: focuses on user value, MVP scope, business rules and product behavior.
- Solutions Architect: focuses on system responsibilities, data flow, domain model and integration design.
- Cloud Architect: focuses on AWS services, deployment model, scalability, observability and infrastructure decisions.

---

## 1. Product Learning Loop

**Primary owner:** Product Owner  
**Supporting role:** Solutions Architect

**Why this diagram exists**

This diagram explains the product value loop from the user's point of view. It shows how a study session with ChatGPT becomes review material inside ZhongwenLock.

The Product Owner owns this diagram because it describes:

- the user journey;
- the MVP learning flow;
- the product value proposition;
- the moment when the user receives value.

The Solutions Architect supports it because the loop also implies system responsibilities and state transitions.

```mermaid
flowchart TD
    A[Study Chinese with ChatGPT tutor] --> B[ChatGPT generates structured study session JSON]
    B --> C[User manually imports JSON into ZhongwenLock]
    C --> D[ZhongwenLock validates the imported session]
    D --> E[ZhongwenLock creates concept-centered learning items]
    E --> F[User resumes pending review]
    F --> G[User completes flashcards, exercises and mini-tests]
    G --> H[ZhongwenLock updates mastery and review state]
    G --> I{Any failed in-app review item?}
    I -->|Yes| J[Create simulated ledger entry]
    I -->|No| K[No ledger entry]
    H --> F
```

---

## 2. High-Level Architecture

**Primary owner:** Solutions Architect  
**Supporting role:** Cloud Architect

**Why this diagram exists**

This diagram shows the main technical building blocks of the solution and how they communicate.

The Solutions Architect owns this diagram because it defines:

- the main application components;
- the relationship between the frontend, API and backend;
- the integration between ChatGPT-generated JSON and ZhongwenLock;
- the general system structure.

The Cloud Architect supports it because the diagram includes AWS services such as API Gateway, Lambda, DynamoDB, S3 and CloudWatch.

```mermaid
flowchart TD
    GPT[Custom GPT / ChatGPT Tutor] --> JSON[Structured study session JSON]
    JSON --> USER[User manually imports JSON]
    USER --> WEB[Web App / PWA]

    WEB --> API[API Gateway]
    API --> LAMBDA[AWS Lambda]
    LAMBDA --> DB[DynamoDB]

    DB --> LAMBDA
    LAMBDA --> API
    API --> WEB

    WEB --> UI[Dashboard, Concepts, Review and Ledger screens]

    LAMBDA --> CW[CloudWatch Logs]
    S3[S3 Static Hosting] --> WEB
```

---

## 3. Study Session Import Flow

**Primary owner:** Solutions Architect  
**Supporting roles:** Product Owner, Cloud Architect

**Why this diagram exists**

This diagram explains what happens when the user imports a ChatGPT-generated study session into ZhongwenLock.

The Solutions Architect owns this diagram because it describes:

- the end-to-end interaction flow;
- API boundaries;
- backend responsibilities;
- transformation from external JSON into internal learning items;
- where data persistence happens.

The Product Owner supports it because the flow reflects an MVP decision: JSON import is manual.

The Cloud Architect supports it because API Gateway, Lambda and DynamoDB are AWS implementation choices.

```mermaid
sequenceDiagram
    participant GPT as ChatGPT Tutor
    participant User
    participant App as Web/PWA App
    participant API as API Gateway
    participant Lambda as ingest-session Lambda
    participant DB as DynamoDB

    GPT->>User: Generates structured study session JSON
    User->>App: Pastes JSON into import screen
    App->>API: POST /sessions
    API->>Lambda: Forward request
    Lambda->>Lambda: Validate JSON schema
    Lambda->>Lambda: Transform external event into internal learning items
    Lambda->>Lambda: Prepare pending review items
    Lambda->>DB: Store session trace, concepts, errors and practice material
    Lambda->>API: Return success or validation error
    API->>App: Response
    App->>User: Show import result

    Note over Lambda,DB: Importing a ChatGPT session does not create ledger penalties.
```

---

## 4. Responsibility Split

**Primary owner:** Solutions Architect  
**Supporting role:** Product Owner

**Why this diagram exists**

This diagram defines what ChatGPT is allowed to do and what ZhongwenLock must own internally.

The Solutions Architect owns this diagram because it defines:

- responsibility boundaries;
- separation of concerns;
- what belongs to the external AI tutor;
- what belongs to the ZhongwenLock application state.

The Product Owner supports it because these boundaries are also product decisions. In particular, ChatGPT must not calculate mastery, progress, dashboard metrics or ledger values.

```mermaid
flowchart LR
    subgraph ChatGPT["ChatGPT / Custom GPT Tutor"]
        A[Detect mistakes]
        B[Identify affected concepts]
        C[Suggest review_priority]
        D[Generate explanations]
        E[Generate flashcards, exercises and mini-tests]
    end

    subgraph ZhongwenLock["ZhongwenLock"]
        F[Validate imported JSON]
        G[Transform import into internal learning items]
        H[Maintain concept-centered review state]
        I[Calculate mastery]
        J[Create ledger entries only after failed in-app reviews]
        K[Generate dashboard metrics]
    end

    A --> F
    B --> F
    C --> G
    D --> G
    E --> G
```

---

## 5. Concept-Centered Model

**Primary owner:** Solutions Architect  
**Supporting role:** Product Owner

**Why this diagram exists**

This diagram explains the logical learning model of ZhongwenLock.

The Solutions Architect owns this diagram because it defines:

- the core domain entities;
- the relationship between sessions, concepts, errors and review attempts;
- how learning material connects to concepts;
- how ledger entries are linked to failed answers.

The Product Owner supports it because the decision to make the product concept-centered is a product decision, not only a technical one.

The important idea is that sessions are used for traceability, but the product revolves around concepts, mastery, review state and ledger behavior.

```mermaid
erDiagram
    SESSION ||--o{ ERROR_EVENT : contains
    SESSION ||--o{ FLASHCARD : imports
    SESSION ||--o{ EXERCISE : imports
    SESSION ||--o{ MINI_TEST : imports

    CONCEPT ||--o{ ERROR_EVENT : has
    CONCEPT ||--o{ FLASHCARD : has
    CONCEPT ||--o{ EXERCISE : has
    CONCEPT ||--o{ MINI_TEST : appears_in
    CONCEPT ||--|| MASTERY_STATE : has
    CONCEPT ||--|| REVIEW_STATE : has

    REVIEW_ATTEMPT ||--o{ ANSWER : contains
    ANSWER }o--|| CONCEPT : updates
    ANSWER ||--o{ LEDGER_ENTRY : may_create
    LEDGER_ENTRY }o--|| CONCEPT : belongs_to
```

---

## 6. Ledger Flow

**Primary owner:** Product Owner  
**Supporting role:** Solutions Architect

**Why this diagram exists**

This diagram explains when the simulated ledger is updated.

The Product Owner owns this diagram because it defines an important product rule:

- importing mistakes from ChatGPT does not punish the user;
- the ledger is updated only when the user fails review items inside ZhongwenLock.

The Solutions Architect supports it because this rule must be reflected in the backend flow, data model and event handling.

```mermaid
flowchart TD
    A[User imports ChatGPT session] --> B[Errors, concepts and practice material are stored]
    B --> C[No ledger entry is created on import]
    C --> D[Review items are prepared]
    D --> E[User answers flashcards, exercises or mini-tests inside ZhongwenLock]
    E --> F{Answer correct?}
    F -->|Yes| G[Increase or maintain mastery]
    F -->|No| H[Decrease mastery]
    H --> I[Create simulated ledger entry]
    I --> J[Update cost by concept and category]
```

---

## Diagram Ownership Summary

| Diagram | Primary owner | Supporting role | Main purpose |
|---|---|---|---|
| Product Learning Loop | Product Owner | Solutions Architect | Explain user value and MVP learning loop |
| High-Level Architecture | Solutions Architect | Cloud Architect | Explain the main technical components |
| Study Session Import Flow | Solutions Architect | Product Owner / Cloud Architect | Explain import, validation, transformation and persistence |
| Responsibility Split | Solutions Architect | Product Owner | Define what ChatGPT owns and what ZhongwenLock owns |
| Concept-Centered Model | Solutions Architect | Product Owner | Define the core learning domain model |
| Ledger Flow | Product Owner | Solutions Architect | Define when ledger entries are created |

---

## Notes

These diagrams describe the current intended MVP design.

Key design decisions:

- ChatGPT acts as a tutor and content generator.
- ChatGPT does not calculate mastery, progress, dashboard values or ledger values.
- ZhongwenLock owns mastery, review state, dashboard metrics and simulated ledger logic.
- Importing a ChatGPT session does not create ledger penalties.
- Ledger entries are created only when the user fails review items inside ZhongwenLock.
- The product model is concept-centered. Sessions are used for traceability.