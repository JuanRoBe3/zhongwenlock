# Diagrams - ZhongwenLock

## Purpose

This document contains the first visual diagrams for ZhongwenLock.

The diagrams are intentionally simple. They are used to explain the product flow, responsibility boundaries, delivery evolution and architecture decisions before the full implementation exists.

ZhongwenLock separates the target MVP product experience from the engineering validation steps used to build it safely.

Manual JSON import is not the intended MVP user experience. It is an engineering validation step used before automating the Custom GPT import flow.

---

## Diagram Ownership

Each diagram identifies which professional role would usually own or lead that type of work:

- Product Owner: focuses on user value, MVP scope, business rules and product behavior.
- Solutions Architect: focuses on system responsibilities, data flow, domain model and integration design.
- Cloud Architect: focuses on AWS services, deployment model, scalability, observability and infrastructure decisions.

---

## Delivery Horizons

ZhongwenLock is represented across three delivery horizons:

| Horizon | Purpose | Import model | Main concern |
|---|---|---|---|
| Engineering Validation | Validate the JSON contract and ingestion pipeline with minimum risk | Manual JSON paste/upload or local sample | Debuggability and contract validation |
| Target MVP | Deliver the first usable learning loop | Custom GPT assisted/direct import with ZhongwenLock validation | User experience and product value |
| Future Product | Reduce manual steps and improve continuity | Authenticated automatic sync | Automation, security and scalability |

The manual import flow demonstrates the implementation path used to reduce risk before the target MVP automation.

---

## 1. Delivery Evolution

**Primary owner:** Product Owner  
**Supporting roles:** Solutions Architect, Cloud Architect  
**Horizon:** Engineering Validation to Future Product

This diagram explains how ZhongwenLock evolves from a low-risk validation step to the target MVP and then to a more automated future product.

```mermaid
flowchart LR
    A[Engineering Validation: Manual JSON Import] --> B[Target MVP: Custom GPT Assisted/Direct Import]
    B --> C[Future Product: Authenticated Automatic Sync]

    A --> A1[Validate JSON contract]
    A --> A2[Debug ingestion safely]
    A --> A3[Prove transformation logic]
    A --> A4[Confirm no ledger penalty on import]

    B --> B1[Remove manual copy/paste from normal UX]
    B --> B2[Keep ZhongwenLock validation]
    B --> B3[Create review items automatically]
    B --> B4[Deliver usable review loop]

    C --> C1[Account linking]
    C --> C2[Automatic session history]
    C --> C3[Advanced personalization]
    C --> C4[Improved continuity across devices]
```

**Key decision**

Manual JSON import is part of the engineering path, not the target MVP product experience.

---

## 2. MVP Product Learning Loop

**Primary owner:** Product Owner  
**Supporting role:** Solutions Architect  
**Horizon:** Target MVP

This diagram represents the intended MVP learning loop.

In the MVP, the user studies Chinese with a Custom GPT tutor. The Custom GPT generates structured study session output and sends or hands off that output to ZhongwenLock through an assisted or direct import flow.

```mermaid
flowchart TD
    A[Study Chinese with Custom GPT tutor] --> B[Custom GPT generates structured study session output]
    B --> C[Custom GPT sends or hands off the study session to ZhongwenLock]
    C --> D[ZhongwenLock validates the received session]
    D --> E[ZhongwenLock creates concept-centered learning items]
    E --> F[User resumes pending review]
    F --> G[User completes flashcards, exercises and mini-tests]
    G --> H[ZhongwenLock updates mastery and review state]
    G --> I{Any failed in-app review item?}
    I -->|Yes| J[Create simulated ledger entry]
    I -->|No| K[No ledger entry]
    H --> F
```

**Design decision**

The target MVP should not require the user to manually paste JSON as the normal product experience.

Manual import is used earlier as an engineering validation step.

---

## 3. Engineering Validation Flow - Manual Import

**Primary owner:** Solutions Architect  
**Supporting role:** Cloud Architect  
**Horizon:** Engineering Validation

This diagram shows the manual import flow used during development to validate the JSON contract, backend ingestion logic and data transformation before automating the Custom GPT integration.

```mermaid
flowchart TD
    A[ChatGPT generates sample study session JSON] --> B[Developer copies or saves JSON sample]
    B --> C[Manual import through Web/PWA or local script]
    C --> D[Backend validates JSON schema]
    D --> E[Backend checks product rules]
    E --> F[Backend transforms external event into internal learning items]
    F --> G[Verify generated concepts, errors, flashcards, exercises and mini-tests]
    G --> H[Confirm no ledger entry is created on import]
    H --> I[Use validated flow as basis for automated MVP import]
```

**Why this exists**

Manual import is not the final user experience. It is a deliberate implementation step used to reduce risk before connecting the Custom GPT directly to ZhongwenLock.

It helps validate:

- the study session JSON contract;
- backend validation rules;
- transformation into internal learning items;
- concept-centered data design;
- the rule that importing ChatGPT errors does not create ledger penalties.

---

## 4. High-Level Architecture

**Primary owner:** Solutions Architect  
**Supporting role:** Cloud Architect  
**Horizon:** Target MVP

This diagram shows the main technical building blocks of the target MVP.

The same ingestion backend should be reusable across the manual engineering validation path and the Custom GPT assisted/direct import path.

```mermaid
flowchart TD
    GPT[Custom GPT / ChatGPT Tutor] --> OUTPUT[Structured study session output]

    OUTPUT --> GPT_IMPORT[Target MVP: Assisted/direct import]
    OUTPUT --> MANUAL_IMPORT[Engineering validation: Manual JSON import]

    MANUAL_IMPORT --> WEB[Web App / PWA]
    WEB --> API[API Gateway]

    GPT_IMPORT --> API

    API --> LAMBDA[AWS Lambda]
    LAMBDA --> DB[DynamoDB]

    DB --> LAMBDA
    LAMBDA --> API
    API --> WEB

    WEB --> UI[Dashboard, Concepts, Review and Ledger screens]

    S3[S3 Static Hosting] --> WEB
    LAMBDA --> CW[CloudWatch Logs]
```

**Design decision**

Both import paths go through ZhongwenLock validation and transformation logic.

ChatGPT never becomes the source of truth for mastery, progress, review state, dashboard metrics or ledger values.

---

## 5. Study Session Import Flow

**Primary owner:** Solutions Architect  
**Supporting roles:** Product Owner, Cloud Architect  
**Horizon:** Target MVP

This diagram explains the target MVP import flow when the Custom GPT sends or hands off a structured study session to ZhongwenLock.

```mermaid
sequenceDiagram
    participant GPT as Custom GPT Tutor
    participant User
    participant App as Web/PWA App
    participant API as API Gateway
    participant Lambda as ingest-session Lambda
    participant DB as DynamoDB

    User->>GPT: Studies Chinese
    GPT->>GPT: Detects mistakes and affected concepts
    GPT->>GPT: Generates structured study session output
    GPT->>API: Sends or hands off study session output
    API->>Lambda: Forward request
    Lambda->>Lambda: Validate JSON schema and product rules
    Lambda->>Lambda: Transform external event into internal learning items
    Lambda->>Lambda: Prepare pending review items
    Lambda->>DB: Store session trace, concepts, errors and practice material
    Lambda->>API: Return success or validation error
    API->>App: Response
    App->>User: Show import result and pending review

    Note over Lambda,DB: Importing a ChatGPT session does not create ledger penalties.
```

**Design decision**

The import mechanism can evolve, but ZhongwenLock must always validate the received data before creating internal learning items.

---

## 6. Responsibility Split

**Primary owner:** Solutions Architect  
**Supporting role:** Product Owner  
**Horizon:** All phases

This diagram defines what ChatGPT is allowed to do and what ZhongwenLock must own internally.

```mermaid
flowchart LR
    subgraph ChatGPT["ChatGPT / Custom GPT Tutor"]
        A[Detect mistakes]
        B[Identify affected concepts]
        C[Suggest review_priority]
        D[Generate explanations]
        E[Generate flashcards, exercises and mini-tests]
        F[Prepare structured study session output]
    end

    subgraph ZhongwenLock["ZhongwenLock"]
        G[Validate imported data]
        H[Transform import into internal learning items]
        I[Maintain concept-centered review state]
        J[Calculate mastery]
        K[Create ledger entries only after failed in-app reviews]
        L[Generate dashboard metrics]
    end

    A --> G
    B --> G
    C --> H
    D --> H
    E --> H
    F --> G
```

**Design decision**

The import mechanism may evolve from manual validation to assisted or automatic import, but the responsibility split does not change.

ZhongwenLock remains the system of record.

---

## 7. Concept-Centered Model

**Primary owner:** Solutions Architect  
**Supporting role:** Product Owner  
**Horizon:** All phases

This diagram explains the logical learning model of ZhongwenLock.

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

**Design decision**

The product model is concept-centered, not session-centered.

Sessions provide traceability. Concepts drive review, mastery and ledger behavior.

---

## 8. Ledger Flow

**Primary owner:** Product Owner  
**Supporting role:** Solutions Architect  
**Horizon:** All phases

This diagram explains when the simulated ledger is updated.

```mermaid
flowchart TD
    A[Study session is imported into ZhongwenLock] --> B[Errors, concepts and practice material are stored]
    B --> C[No ledger entry is created on import]
    C --> D[Review items are prepared]
    D --> E[User answers flashcards, exercises or mini-tests inside ZhongwenLock]
    E --> F{Answer correct?}
    F -->|Yes| G[Increase or maintain mastery]
    F -->|No| H[Decrease mastery]
    H --> I[Create simulated ledger entry]
    I --> J[Update cost by concept and category]
```

**Design decision**

Importing mistakes from ChatGPT does not punish the user.

The simulated ledger is updated only when the user fails review items inside ZhongwenLock.

---

## Diagram Ownership Summary

| Diagram | Primary owner | Supporting role | Main purpose |
|---|---|---|---|
| Delivery Evolution | Product Owner | Solutions Architect / Cloud Architect | Explain how the project moves from validation to MVP and future product |
| MVP Product Learning Loop | Product Owner | Solutions Architect | Explain the intended MVP user value loop |
| Engineering Validation Flow | Solutions Architect | Cloud Architect | Explain why manual import is used before automation |
| High-Level Architecture | Solutions Architect | Cloud Architect | Explain the main technical components |
| Study Session Import Flow | Solutions Architect | Product Owner / Cloud Architect | Explain import, validation, transformation and persistence |
| Responsibility Split | Solutions Architect | Product Owner | Define what ChatGPT owns and what ZhongwenLock owns |
| Concept-Centered Model | Solutions Architect | Product Owner | Define the core learning domain model |
| Ledger Flow | Product Owner | Solutions Architect | Define when ledger entries are created |

---

## Notes

These diagrams describe the current intended MVP design and the engineering path used to reach it.

Key design decisions:

- ChatGPT acts as a tutor and content generator.
- ChatGPT generates structured study session output.
- The target MVP uses a Custom GPT assisted/direct import flow.
- Manual JSON import is an engineering validation step, not the target MVP user experience.
- ChatGPT does not calculate mastery, progress, dashboard values or ledger values.
- ZhongwenLock owns validation, mastery, review state, dashboard metrics and simulated ledger logic.
- Importing a ChatGPT session does not create ledger penalties.
- Ledger entries are created only when the user fails review items inside ZhongwenLock.
- The product model is concept-centered. Sessions are used for traceability.