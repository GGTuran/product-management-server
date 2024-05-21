# Product Management Server

This project is an Express application developed with TypeScript, integrating MongoDB with Mongoose for effective data management. The application focuses on managing product data for an e-commerce platform, providing CRUD operations for product management and order management.This README file gives the instruction on how to set up the project and run it on the local server.

## Clone the repository

**Follow this simple step to clone the project:**

```bash
https://github.com/GGTuran/product-management-server.git
cd product-management-server
```

**Now install the dependencies of the project:**

```bash
npm install
```

## Set up the server   

**Set up the environment variables in .env file**

```
PORT = 5000
DATABASE_URL=your_own_mongodb_uri
```

**You can compile typescript**

```
npm run build
```

## Start the server

**You can run the dev command for typescript and this will start the server**

```
npm run start:dev
```

**Or you can start the server by running the js files which is recommended**

```
npm run start:prod
```




