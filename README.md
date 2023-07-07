# Next 13 + Prisma PoC

Concept app that uses NextJS as fullstack framework that handles requests from frontend and serves data from database. Prisma is used as source of data types for frontend and backend parts, and keeps them in sync with data types from database. 

⚛️ Next 13\
💨 Tailwind\
🟦 TS\
🔌 Prisma \
🗂️ Dockerized MySQL DB\
🗃️ CVA 

## Requirements
🟩 Node >=14.18

🐳 Docker


## Starting project
1. Use docker compose to make DB running
    ```
    docker compose up 
    ```
2. Copy .env file
    ```
    cp .env.sample .env  
    ```

2. Install node dependencies
    ```
    npm install
    ```

2. Generate prisma stuff to connect ORM with DB
    ```
    npm run prisma
    ````
    Confirm if warnings about missing migrations occour. 

3. Run app in dev mode
    ```
    npm run dev
    ```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).