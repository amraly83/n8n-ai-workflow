# Tech Context: AI-Powered n8n Workflow Generator

## 1. Core Technologies & Frameworks

*   **Frontend Framework:** React (via Next.js)
    *   **Reasoning:** Industry standard, large ecosystem, component-based architecture.
*   **Full-Stack Framework:** Next.js (App Router preferred for new projects)
    *   **Reasoning:** Specified by user. Provides server-side rendering (SSR), static site generation (SSG), API routes, routing, image optimization, and a great developer experience.
*   **UI Component Library:** Shadcn/ui
    *   **Reasoning:** Specified by user. Provides beautifully designed, accessible, and customizable components that are not pre-styled, allowing full control with Tailwind CSS. Users typically copy-paste component code into their project.
*   **CSS Framework:** Tailwind CSS
    *   **Reasoning:** Specified by user. Utility-first CSS framework for rapid UI development and easy customization. Works seamlessly with Shadcn/ui.
*   **Language:** TypeScript
    *   **Reasoning:** While not explicitly stated for all parts, Next.js and modern React development strongly favor TypeScript for its static typing benefits, leading to more robust and maintainable code. This will be assumed unless specified otherwise.

## 2. Backend & API

*   **API Development:** Next.js API Routes
    *   **Reasoning:** Integrated with the Next.js framework, allowing for easy creation of backend endpoints. Suitable for monolithic architecture initially.
*   **Webhook Handling:** Implemented within Next.js API Routes.
    *   **Reasoning:** To receive responses from the AI Agent Service.

## 3. Database

*   **Primary Database:** PostgreSQL (Recommended Default)
    *   **Reasoning:** Powerful open-source relational database, robust, scalable, and well-supported. Good for structured user data and workflow metadata.
    *   **Alternatives:** SQLite for local development simplicity if preferred initially, or a NoSQL option like MongoDB if data structure is highly dynamic (though PostgreSQL's JSONB capabilities are strong).
*   **Database ORM/Client:** Prisma (Recommended)
    *   **Reasoning:** Modern ORM for Node.js and TypeScript, provides type safety, auto-migration, and a fluent API for database interactions. Simplifies database access and schema management.
    *   **Alternatives:** Drizzle ORM, TypeORM, or a query builder like Knex.js.

## 4. Authentication

*   **Authentication Library:** NextAuth.js
    *   **Reasoning:** Full-featured authentication solution for Next.js applications. Supports various providers (OAuth, email/password, magic links), session management, and is highly customizable.
    *   **Consideration:** Will need to configure appropriate providers (e.g., Google, GitHub, Email/Password).

## 5. AI Agent Service Integration

*   **Interaction Method:** Webhook API calls.
    *   **Request:** The Next.js backend will send a POST request (likely JSON payload containing the user's plain text input) to a predefined AI Agent Service endpoint.
    *   **Response:** The AI Agent Service will send a POST request (likely JSON payload containing the n8n workflow JSON) to a webhook URL exposed by the Next.js application.
    *   **Security:** The webhook endpoint on the Next.js application should be secured (e.g., using a secret token shared with the AI Agent Service) to prevent unauthorized requests. The call to the AI agent might also require an API key.

## 6. Development Environment & Tooling

*   **Package Manager:** npm or yarn (User preference, yarn is common with Next.js). pnpm is also a strong contender for speed and efficiency.
*   **Version Control:** Git (with a platform like GitHub, GitLab, or Bitbucket).
*   **Code Editor:** VS Code (Assumed, common for web development).
*   **Linting & Formatting:** ESLint and Prettier.
    *   **Reasoning:** Enforce code quality, consistency, and readability.
*   **Local Development Server:** Next.js development server (`next dev`).

## 7. Deployment (Initial Considerations)

*   **Platform:** Vercel (Recommended for Next.js)
    *   **Reasoning:** Built by the creators of Next.js, offers seamless deployment, CI/CD, serverless functions, global CDN, and a generous free tier.
    *   **Alternatives:** Netlify, AWS Amplify, Google Cloud Run, Azure Static Web Apps, or self-hosting with Docker.
*   **Database Hosting:**
    *   Supabase (PostgreSQL hosting with additional features like auth, storage)
    *   Neon.tech (Serverless PostgreSQL)
    *   Railway.app (Easy deployment for various services including PostgreSQL)
    *   AWS RDS, Google Cloud SQL, Azure Database for PostgreSQL.

## 8. Technical Constraints & Limitations (Initial)

*   The AI Agent Service is treated as a black box for now. Its internal workings are not part of this application's direct build, only the integration contract (webhook API).
*   The primary interaction with the agent is a single request-response cycle per workflow generation attempt, as per the prompt. More complex conversational interactions are out of scope for the MVP.

## 9. MCP Integration Log (Placeholder)

*   **MCP Tool:** [To be identified if/when specific MCP tools are leveraged, e.g., for advanced AI model interaction, data processing, or specialized computation beyond the primary AI agent.]
*   **Integration Purpose:**
*   **Methodology:**
*   **Results/Insights:**
*   **Performance Improvements:**

*(This section will be updated as MCP tools are integrated as per the Genesis Engine protocol.)*
