# Amazon MERN Ecommerce

Seed first @ http://khiz-amazon.herokuapp.com/api/users/seed then use site @ http://khiz-amazon.herokuapp.com/

## Build:

1. Home Screen
   - Create react app
   - List data using JSX and map function
2. Product Screen
   - Url routing in react
   - Handle events in react
3. Cart Screen
   - Save and retrieve data in local storage
   - Working javascript array functions
   - Update summary based on cart changes
4. Sign-in and Register Screen
   - Create dynamic form
   - Input validation in frontend and backend
   - Create web server using node.js
   - Connect to Mongodb database
   - Add registered user to the database
   - Authenticate user based on email and password
   - Using Jsonwebtoken to authorize users
5. Shipping and Payment Screen
   - Create wizard form to get user data in multiple steps
   - Save user info in the local storage
6. Place Order Screen
   - Validate and create order in the database
7. Order Screen
   - Payment with Paypal
   - Show order state based on user and admin activities
8. Profile Screen
   - Create authenticated routes
   - enable user to update their informations
   - enable user to logout and clear local storage
   - show list of orders to user and link it to details
9. Seller Menu
   - add products, upload files
   - manage orders
10. Admin Menu
    - manage users
    - add seller permission

### Deploy on Heroku:

    1. Create git repository
    2. Create heroku account
    3. Install Heroku CLI
    4. `heroku login`
    5. `heroku apps:create <yourname>-amazon`
    6. Edit package.json
    7. `"heroku-postbuild": "cd frontend && npm install && npm run build"`
    8. `"engines": { "node": "12.4.0", "npm": "6.9.0" }`
    9. Create Procfile
    10. `web: node --experimental-modules backend/server.js`
    11. Create MongoDB Atlas Account
    12. Open cloud.mongodb.com
    13. Create new database
    14. Add new user and save username and password
    15. Set Network Access to accept all requests
    16. Copy connection string
    17. Replace db name, username and password with yours.
    18. `heroku config:set MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.nb7oz.mongodb.net/<dbname>?retryWrites=true&w=majority`
    19. Set SKIP_PREFLIGHT_CHECK=true
    20. `heroku config:set SKIP_PREFLIGHT_CHECK=true`
    21. Commit and push
    22. Open `https://<yourname>-amazon.herokuapp.com/api/users/seed`
    23. Open `https://<yourname>-amazon.herokuapp.com`

### Deploy on AWS Elastic Beanstalk:

    1. Install elastic beanstalk
    2. add .elasticbeanstalk/ to .gitignore
    3. `eb init --platform node.js --region <your region like eu-west-2>`
    4. `eb create --sample node-express-env`
    5. `eb open`
    6. create file `.ebextensions/nodecommand.config`
    7. add option_settings `NodeCommand: "npm run serve"`
    8. add commands `command: "sudo chown -R 496:494 /tmp/.npm"`
    9. update package.json add `serve` script
    10. `cd frontend && npm install && npm run build && cd .. && node --experimental-modules backend/server.js`
    11. Set env variables
    12. `eb setenv MONGODB_URL="mongodb+srv://xx"`
    13. `eb setenv SKIP_PREFLIGHT_CHECK=true`
    14. optional env vars: GOOGLE_API_KEY, PAYPAL_CLIENT_ID and JWT_SECRET
    15. Commit changes
    16. `git add . && git commit`
    17. Deploy on aws
    18. `eb deploy`
    19. Watch logs
    20. `eb logs -cw enable`
    21. open `httpsconsole.aws.amazon.com/cloudwatch`
    22. select Logs > Log groups > Node.js Logs
