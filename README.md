
# Eshop README


Welcome to the documentation for my e-shop application. This README provides essential information on how to set up, configure, and run e-shop application.

# Introduction
E-shop application is a platform for online shopping that allows customers to browse, search, and purchase products online. 

# Features
- User Registration: New users can register by providing necessary details such as username, email, and password.
- User Authentication: Registered users can log in securely using their credentials.
- Shopping Cart Management: Users can add items to their shopping cart, remove items from their cart, and adjust quantities as needed.
- Order Confirmation: Users can confirm their orders by providing shipping details.
- Profile Management: Users can modify their profile information, including username, email, password, and shipping address.
- Order History: Users can view their order history, including details of past purchases.




## Run Locally

Clone the repository:

```bash
git clone https://github.com/matthewpatthew/nnpia_eshop.git
```

Run the project:

To set up the database, navigate to the directory containing the ``` docker-compose.yaml ``` file in your terminal and execute:

```bash
docker-compose up
```

To start the frontend, open terminal in src/main/js/frontend

```bash
npm run dev
```


## Application structure
Application is structured into backend and frontend components:

- Backend: 
Written in Java Spring Framework, the backend includes packages such as controller, service, repository, and security. Each package contains classes responsible for specific functionalities following standard practices. The backend server runs on port 9000.
- Frontend: 
Developed in JavaScript using React.js, the frontend resides in the ``` src/main/js/frontend ``` directory. 

The frontend application is structured into packages, including components and services.
Components package contains reusable UI components that are used throughout the application for a consistent look and feel.
Services package serves as the bridge between the frontend and backend. It handles API calls and communication with the server. For authentication and authorization, JSON Web Tokens (JWT) are utilized to secure communication between the frontend and backend, ensuring secure user authentication and access control. The frontend server runs on port 3000.
