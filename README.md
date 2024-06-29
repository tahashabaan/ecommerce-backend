# E-commerce Application
 This e-commerce application allows customers to browse products, authenticate, manage orders, use a cart, leave reviews, and process payments with Stripe. It also 
 includes user profiles and a search feature with pagination.

## Features

### Product Listing
- **Browse Products:** View a wide range of products with detailed descriptions, prices, and images.
- **Product Categories:** Filter products by categories for easier navigation.
- **Product Details:** Access comprehensive details for each product, including specifications and customer reviews.

### User Authentication
- **Sign Up:** Create a new account using an email address and password.
- **Login:** Securely log in to your account.
- **Password Reset:** Reset your password via email if forgotten.

### Order Management
- **Order Placement:** Easily place orders for products added to the cart.
- **Order History:** View past orders, including order details and statuses.
- **Order Tracking:** Track the status and delivery of active orders.

### Shopping Cart
- **Add to Cart:** Add products to your shopping cart.
- **Cart Management:** Update product quantities or remove items from the cart.
- **Checkout:** Proceed to payment and finalize purchases.

### Product Reviews
- **Write Reviews:** Share your feedback and rate products.
- **View Reviews:** Read reviews from other customers.
- **Moderation:** Ensure reviews meet community guidelines before they are published.

### Stripe Payment Integration
- **Secure Payments:** Process payments securely using Stripe.
- **Multiple Payment Methods:** Support for various payment methods, including credit cards and digital wallets.
- **Payment Confirmation:** Receive confirmation of successful payments.

### User Profiles
- **Profile Management:** Update personal information, such as name, email, and password.
- **Address Book:** Manage shipping and billing addresses.
- **Wishlist:** Save products to a wishlist for future reference.

### Search with Pagination
- **Search Functionality:** Quickly find products using the search bar.
- **Pagination:** Efficiently navigate through search results with pagination.
- **Filters and Sorting:** Apply filters and sorting options to refine search results.


## How to Install
1. **Clone the repository:**
    ```bash
    git clone https://github.com/tahashabaan/ecommerce-backend.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd ecommerce-backend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up environment variables:**
    Create a `.env` file in the root directory and add your configuration settings.
    
    ```plaintext
       PORT
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
5. **Run the application:**
    ```bash
    npm start
    ```

Provide step-by-step instructions on how to install and set up your application.

---

Feel free to adjust the instructions based on the specific details and requirements of your project. Let me know if there's anything else you need!




  
