# Application Overview

The functionality of this application is straightforward: users can create posts that are open for reading and commenting by other users.

In the user profile section, users can view a comprehensive list of posts they have created. Simultaneously, the main page aggregates all posts from every user.

## Data model

The application comprises the following essential models:

- **User**: Represents an individual user within the application.
- **Post**: Signifies posts created by users.
- **Comment**: Captures all comments associated with a particular post.

## Getting Started

### Prerequisites

Ensure that you have [Node.js](https://nodejs.org/) installed on your system.

### Setup Instructions

#### Clone the repository

```bash
git clone https://github.com/luismarques-io/best-practices-app-react
cd your-repo-name
cp .env.example .env
npm install
```

### Run the App in Development Mode

Execute the following command to start the development server:

```bash
npm start
```

Visit <http://localhost:3000> to view the application in your browser.

### Build the App for Production

For optimal performance, bundle React in production mode:

```bash
npm run build
```

The optimized build is available in the build directory.

### Test the App

To run all existing tests for the application:

```bash
npm test
```
