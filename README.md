# ecommerce-wep-app
   Ecommerce wep API  i using node js to control services and routes and mongodb to store database

## Features
### 1- Product Management: 
   - Display products with images, descriptions, and pricing
   - Organize products into categories and apply tags for easy navigation
   - Implement a search functionality for users to find products quickly
   - Allow customers to leave reviews and ratings for products
   ### 2- Shopping Cart:
   - Enable users to add products to their shopping cart.
   - View and modify the contents of the shopping cart.
   - Provide a seamless checkout process with multiple payment options.
  ### 3- User Accounts:
   - Allow users to create accounts and log in securely.
   - Display past orders and order details for logged-in users.

##  How to Install and Run the Project
  to install it project using it command `npm install` to install all dependencies.
    - ```bcryptjs
       body
       parser
       colors
       compression
       cors
       dotenv
       express
       express-async-handler
       express-validator
       jsonwebtoken
       mongoose
       morgan
       multer
       nodemailer
       nodemon
       sharp
       slugify
       supertest
      swagger-
      ui-express```
- to run you need configuration file called `config.env` includes 
 ```PORT
 NODE_ENV
 BASE_URL_ENV
 SECRET_JWT_CODE
 DB_USER
 DB_PASSWORD
 DB_URI
JWT_SECRET_KEY
JWT_EXPIRE_TIME
HOST
PORT_GMAIL
SERVICE
USER
PASS
STRIPE_WEBHOOK_SECRET
```
## How to Use the Project
  you can run ptoject using it command `npm run dev` and  you can show Api docs  using  it route `/api/docs`



  
