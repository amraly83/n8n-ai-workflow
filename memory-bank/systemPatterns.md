# System Patterns: AI-Powered n8n Workflow Generator

## 1. System Architecture (Initial High-Level)

```mermaid
graph TD
    User[User Browser] -- HTTPS --> NextApp[Next.js Frontend & Backend API Routes]
    NextApp -- Authenticates/Authorizes --> AuthProvider[Authentication Provider (e.g., NextAuth.js)]
    NextApp -- Stores/Retrieves User Data/Workflows --> Database[Database (e.g., PostgreSQL)]
    NextApp -- Sends Plain Text via Webhook --> AgentService[AI Agent Service (External/Internal)]
    AgentService -- Processes Text, Generates n8n JSON --> AgentService
    AgentService -- Returns n8n JSON via Webhook --> NextApp
    NextApp -- Displays Result/Enables Download --> User

    subgraph "Application Core (Next.js)"
        direction LR
        Frontend[React Components (Shadcn/ui, Tailwind CSS)]
        BackendAPI[API Routes (User Auth, Workflow Management, Webhook Handling)]
    end

    NextApp --> Frontend
    NextApp --> BackendAPI

    %% Styling for better readability
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef user fill:#E6F3FF,stroke:#007bff;
    classDef next fill:#D4EDDA,stroke:#28a745;
    classDef service fill:#FFF3CD,stroke:#ffc107;
    classDef db fill:#F8D7DA,stroke:#dc3545;
    classDef auth fill:#E2D9F3,stroke:#6f42c1;

    class User user;
    class NextApp next;
    class AgentService service;
    class Database db;
    class AuthProvider auth;
```

## 2. Key Technical Decisions & Justifications (Initial Thoughts)

*   **Monolithic Frontend & Backend (Next.js):**
    *   **Justification:** For an MVP and initial development speed, Next.js's full-stack capabilities (React components for frontend, API routes for backend) offer a streamlined development experience. This simplifies deployment and reduces initial architectural complexity.
    *   **Scalability Consideration:** While monolithic, Next.js applications can be scaled effectively, and API routes can be designed to be easily migrated to separate microservices if future needs dictate.
*   **Serverless Functions for API Routes (Implicit with Vercel/Netlify deployment):**
    *   **Justification:** Cost-efficiency (pay-per-use), automatic scaling, and reduced server management overhead. Aligns well with the Next.js paradigm.
*   **Webhook-based AI Agent Interaction:**
    *   **Justification:** As specified by the user. This decouples the AI agent from the main application, allowing it to be developed, scaled, and potentially replaced independently. It simplifies the initial integration point.
    *   **Consideration:** Webhooks are asynchronous by nature. The UI will need to handle pending states gracefully while waiting for the agent's response. For the MVP, the prompt implies a synchronous-like experience from the user's perspective (send request, get response), so the webhook implementation on the Next.js backend will likely await the agent's response before replying to the client.
*   **Component-Based UI (React with Shadcn/ui):**
    *   **Justification:** Promotes reusability, maintainability, and a structured approach to UI development. Shadcn/ui provides well-designed, accessible components that can be customized with Tailwind CSS, aligning with the "premium UI" requirement.

## 3. Design Patterns (To Be Employed)

*   **MVC/MVVM-like for Frontend:** React components will manage their state and presentation, with data fetching and business logic handled in services or hooks, and API routes acting as controllers.
*   **Repository Pattern (for Database Interaction):** Abstract data access logic to keep API routes cleaner and make it easier to switch database technologies if needed.
*   **Service Layer (for Business Logic):** Encapsulate core business logic (e.g., managing user workflows, interacting with the AI agent service) in dedicated service modules.
*   **Provider Pattern (React Context API / State Management Libraries):** For managing global state like user authentication status, themes, etc.
*   **API Gateway (Implicit with Next.js API Routes):** API routes will serve as the single entry point for all client-side requests to the backend.

## 4. Component Relationships & Data Flows (High-Level)

*   **User Authentication Flow:**
    1.  User interacts with Sign Up/Sign In components (Frontend).
    2.  Credentials/OAuth flow handled by NextAuth.js (Backend API Route).
    3.  Session created/retrieved, user data stored/updated in Database.
    4.  Authenticated state propagated to Frontend.
*   **Workflow Generation Flow:**
    1.  User inputs plain text into a form/component in their Dashboard (Frontend).
    2.  Frontend sends this text to a dedicated API Route (Backend API).
    3.  Backend API Route constructs a webhook request and sends it to the AI Agent Service.
    4.  Backend API Route awaits the webhook response from the AI Agent Service.
    5.  AI Agent Service processes the text and returns n8n JSON via webhook.
    6.  Backend API Route receives the JSON, potentially stores it in the Database associated with the user.
    7.  Backend API Route sends the JSON back to the Frontend.
    8.  Frontend displays the JSON, allows copying, or initiates download.
*   **Landing Page Flow:**
    1.  User visits the main domain.
    2.  Next.js serves static/server-rendered landing page components (Sticky Header, Hero, Features, etc.).
    3.  Interactions (e.g., Contact Us form) may hit specific API Routes.

## 5. Critical Implementation Paths & Dependencies

*   **Authentication Setup (NextAuth.js):** Critical for securing the application and enabling user-specific data.
*   **AI Agent Webhook Integration:** The core feature depends on successfully sending requests to and receiving responses from the AI agent service. The exact contract (request/response structure, authentication for the webhook itself) with the agent service needs to be defined.
*   **Database Schema Design:** For users, their generated workflows, and potentially API keys for interacting with the agent service.
*   **Shadcn/ui & Tailwind CSS Theming:** Establishing the visual identity and ensuring a premium look and feel.
*   **Core UI Components:** Building the landing page sections, dashboard layout, and workflow interaction elements.
