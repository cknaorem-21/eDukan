# eDUKAN

This is an e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

## Deployment

The project is deployed and accessible at [https://edukan-ap98.onrender.com/](https://edukan-ap98.onrender.com/).

**Note: Intial load time may take long due use of free plan at render. Load time will be faster after the initial load.**

## Admin Credentials

- email: admin@email.com
- Password: 123456

## User Credentials

- email: userone@email.com
- Password: 123456

## Features

- **Admin Panel**: Allows administrators to perform CRUD operations on products and users.
- **User Accounts**: Users can register, log in, and perform actions such as purchasing products, rating, and reviewing.
- **JWT Custome Auth**: Implemented custom authentication using JWT(Json Web Tokens).
- **Role based access control**: Implemented protected routes depending on user role using middlewares in backend and React router in frontend.
- **Redux-toolkit**: Used Redux-tooolkit for global state management.
- **RTK Queries**: Used Redux Toolkit Queries(RTK Queries) for efficient query fetching and caching.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Tailwind CSS


## Usage

### Admin Panel

- Access the admin panel by logging in with the above given credentials 
- Click on 'Admin' dropdown in the top left.
- From the admin panel, you can:
  - Create, read, update, and delete products.
  - Manage orders and user accounts.

### User Account

- Users can register for an account or log in using the user credentials provided above.
- Once logged in, users can:
  - Browse products.
  - Add products to the cart.
  - Purchase products.
  - Rate and review products.

## Snapshots
### User views:
#### Sign up page
![Sign up page](./Screenshots/user/signup.jpg)

#### Log in page
![Log in page](./Screenshots/user/login.jpg)

#### Product page
![Product page](./Screenshots/user/product.jpg)

#### Product Reviews
![Product reviews](./Screenshots/user/productReviews.jpg)

#### Cart page
![Cart page](./Screenshots/user/cart.jpg)

#### Shipping details page
![Shipping details page](./Screenshots/user/enterShippingDetails.jpg)

#### Choose payment method page
![Choose payment method page](./Screenshots/user/paymentMethod.jpg)

#### Payment page
![Payment page](./Screenshots/user/payment.jpg)

#### Place order page
![Place order page](./Screenshots/user/placeOrder.jpg)

#### Orders page
![Orders page](./Screenshots/user/orders.jpg)

#### Cart page
![Cart page](./Screenshots/user/cart.jpg)

#### Update profile page
![Update profile page](./Screenshots/user/updateprofile.jpg)

#### Cart page
![Cart page](./Screenshots/user/cart.jpg)

### Admin additional views:
#### View all products page
![View all products page](./Screenshots/admin/admin_all_products.jpg)

#### Edit product page
![Edit product page](./Screenshots/admin/admin_edit_product.jpg)

#### View all users page
![View all users page](./Screenshots/admin/admin_view_all_users.jpg)

#### View all orders page
![View all orders page](./Screenshots/admin/admin_view_orders.jpg)

## Disclaimer

Products in this projects belongs to Amazon, Flipkart and Google. This webapp is built for educational purposes only and reselling of any kind is not intended.
