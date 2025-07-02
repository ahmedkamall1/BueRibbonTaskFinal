# Blue Ribbon Backend Internship Task – Ahmad Kamal

This project is a backend service built with NestJS for managing sports, members, and their subscriptions in a club system. It was developed as part of the Blue Ribbon backend internship task.

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/ahmedkamall1/BueRibbonTaskFinal.git
cd BueRibbonTaskFinal

### 2. Install dependencies
npm install

3. Run the project in development mode
npm run start:dev


## API Overview
Sports
POST /sports - Add a new sport

GET /sports - Retrieve all sports

PATCH /sports/:id - Update an existing sport

DELETE /sports/:id - Delete a sport

Members
POST /members - Create a new member

GET /members - List all members

PATCH /members/:id - Update member details

DELETE /members/:id - Remove a member

Subscriptions
POST /subscriptions - Subscribe a member to a sport

DELETE /subscriptions - Unsubscribe a member from a sport

Features
Input validation using class-validator

Prevents duplicate subscriptions

Supports linking family members (via parentId)

Clean and organized service structure

Designed for high-read efficiency (e.g. home screen of mobile app)



### Testing
To run unit tests:

bash
Copy
Edit
npm run test
