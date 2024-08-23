# NodeJs-Repository-Pattern

# MIS Reporting

### How to Run

1. Clone this project.
2. Perform `npm install` to install the depedencies.
3. Update your own env vars`in`.env.dist` file
4. Rename `.env.sample` to `.env`.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.<br />

### `npm run start-dev`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `start redis server`

command: redis-server

### `npm start`

Runs the app in the production mode.<br />

### To deploy this project on aws ec2

```bash
Install NodeJS and NPM using nvm
Install Pm2 and nginx
 -  pm2 init simple
 - This will generate a sample ecosystem.config.js:
 - add following lines in ecosystem file
Install Git and clone repository from GitHub
Install dependencies
Run the application using Pm2
Configure security group to access via public URL
Access the application in browser
```

# Acting on PM2 Configuration File

### pm2 sample file

module.exports = {
apps : [{
name : "app1",
script : "./server.js" // build Path your dist/server.js
}]
}

# Start all applications

pm2 start ecosystem.config.js

# Stop all

pm2 stop ecosystem.config.js

# Restart all

pm2 restart ecosystem.config.js

# Reload all

pm2 reload ecosystem.config.js

# Delete all

pm2 delete ecosystem.config.js

## Architecture

```
├── components
│   ├── login
│   │   ├── controller.ts
│   │   └── router.ts
│   └── user
│       ├── classes.ts
│       ├── controller.ts
│       ├── model.ts
│       ├── repository.ts
│       └── router.ts
├── config
│   └── index.ts
├── helpers
│   ├── Email
│   │   └── index.ts
│   ├── db
│   │   └── index.ts
│   └── jwtHelper
│       └── index.ts
├── repository
│   ├── baseRepository.ts
│   └── interfaces.ts
├── router
│   └── index.ts
├── server.ts
├── types
│   └── index.ts
└── utils
    ├── authUtils.ts
    ├── response.ts
    └── utility.ts
```

## Authentication

Use Basic auth
credentials:

email: xxxxxx@gmail.com

password: xxxxxxx

Auth Key in Heade : idToken

## DB table

Will Add After completing
