
## Aplikasi Pemesanan Tiket Konser

This concert ticket booking application is designed to make it easier for users to order concert tickets. The app allows users to explore various concert events, select seats, make secure payments and get digital tickets.


## Prisma Schema Documentation

## Overview
This document provides an overview of the Prisma schema for the Concert Ticket Booking System. It includes the definitions of models, fields, and relationships between them.

## Models

### User

The `User` model represents the users of the system.

```prisma
model User {
  user_id      Int      @id @default(autoincrement())
  username     String   @unique
  password     String
  email        String   @unique
  phone_number String?
  tickets      Ticket[]
  payments     Payment[]
}
```

- **user_id**: Integer, Primary Key, Auto-increment
- **username**: String, Unique username of the user
- **password**: String, Password of the user
- **email**: String, Unique email of the user
- **phone_number**: String, Phone number of the user (optional)
- **tickets**: One-to-Many relation with `Ticket` model
- **payments**: One-to-Many relation with `Payment` model

### Event

The `Event` model represents the events available for booking.

```prisma
model Event {
  event_id    Int       @id @default(autoincrement())
  event_name  String
  description String?
  date        DateTime
  venue_id    Int
  venue       Venue     @relation(fields: [venue_id], references: [venue_id])
  tickets     Ticket[]
}
```

- **event_id**: Integer, Primary Key, Auto-increment
- **event_name**: String, Name of the event
- **description**: String, Description of the event (optional)
- **date**: DateTime, Date and time of the event
- **venue_id**: Integer, Foreign Key referencing `Venue` model
- **venue**: Many-to-One relation with `Venue` model
- **tickets**: One-to-Many relation with `Ticket` model

### Ticket

The `Ticket` model represents the tickets for events.

```prisma
model Ticket {
  ticket_id   Int     @id @default(autoincrement())
  event_id    Int
  user_id     Int
  seat_number String?
  price       Float
  event       Event   @relation(fields: [event_id], references: [event_id], onDelete: Cascade)
  user        User    @relation(fields: [user_id], references: [user_id], onDelete: Cascade)
  payments    Payment[]
}
```

- **ticket_id**: Integer, Primary Key, Auto-increment
- **event_id**: Integer, Foreign Key referencing `Event` model
- **user_id**: Integer, Foreign Key referencing `User` model
- **seat_number**: String, Seat number for the ticket (optional)
- **price**: Float, Price of the ticket
- **event**: Many-to-One relation with `Event` model
- **user**: Many-to-One relation with `User` model
- **payments**: One-to-Many relation with `Payment` model

### Venue

The `Venue` model represents the venues where events are held.

```prisma
model Venue {
  venue_id    Int     @id @default(autoincrement())
  venue_name  String
  address     String
  city        String
  events      Event[]
}
```

- **venue_id**: Integer, Primary Key, Auto-increment
- **venue_name**: String, Name of the venue
- **address**: String, Address of the venue
- **city**: String, City where the venue is located
- **events**: One-to-Many relation with `Event` model

### Payment

The `Payment` model represents the payments made for tickets.

```prisma
model Payment {
  payment_id  Int     @id @default(autoincrement())
  user_id     Int
  ticket_id   Int
  amount      Float
  payment_date DateTime @default(now())
  user        User    @relation(fields: [user_id], references: [user_id], onDelete: Cascade)
  ticket      Ticket  @relation(fields: [ticket_id], references: [ticket_id], onDelete: Cascade)
}
```

- **payment_id**: Integer, Primary Key, Auto-increment
- **user_id**: Integer, Foreign Key referencing `User` model
- **ticket_id**: Integer, Foreign Key referencing `Ticket` model
- **amount**: Float, Amount of the payment
- **payment_date**: DateTime, Date and time of the payment (default to current timestamp)
- **user**: Many-to-One relation with `User` model
- **ticket**: Many-to-One relation with `Ticket` model

## Schema File

Below is the full content of the `schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = "mysql://user:password@localhost:3306/concert"
}

model User {
  user_id      Int      @id @default(autoincrement())
  username     String   @unique
  password     String
  email        String   @unique
  phone_number String?
  tickets      Ticket[]
  payments     Payment[]
}

model Event {
  event_id    Int       @id @default(autoincrement())
  event_name  String
  description String?
  date        DateTime
  venue_id    Int
  venue       Venue     @relation(fields: [venue_id], references: [venue_id])
  tickets     Ticket[]
}

model Ticket {
  ticket_id   Int     @id @default(autoincrement())
  event_id    Int
  user_id     Int
  seat_number String?
  price       Float
  event       Event   @relation(fields: [event_id], references: [event_id], onDelete: Cascade)
  user        User    @relation(fields: [user_id], references: [user_id], onDelete: Cascade)
  payments    Payment[]
}

model Venue {
  venue_id    Int     @id @default(autoincrement())
  venue_name  String
  address     String
  city        String
  events      Event[]
}

model Payment {
  payment_id  Int     @id @default(autoincrement())
  user_id     Int
  ticket_id   Int
  amount      Float
  payment_date DateTime @default(now())
  user        User    @relation(fields: [user_id], references: [user_id], onDelete: Cascade)
  ticket      Ticket  @relation(fields: [ticket_id], references: [ticket_id], onDelete: Cascade)
}
```
### API Documentation

#### Base URL: `/api`
---

### User Endpoints

#### Create User
- **URL**: `/users`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "Mr. Nanimz",
    "password": "Nanimz29",
    "email": "MrNanimz@gmail.com",
    "phone_number": "085156832741"
  }
  ```
- **Response**:
  ```json
  {
    "user_id": 1,
    "username": "Mr. Nanimz",
    "email": "MrNanimz@gmail.com",
    "phone_number": "085156832741"
  }
  ```

#### Get User by Id
- **URL**: `/users/:user_id`
- **Method**: `GET`
- **URL Parameters**:
  - `user_id` (integer): ID of the user to retrieve.
- **Response**:
  ```json
  {
    "user_id": 1,
    "username": "Mr. Nanimz",
    "email": "MrNanimz@gmail.com",
    "phone_number": "085156832741"
  }
  ```

#### Update User by Id
- **URL**: `/users/:user_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `user_id` (integer): ID of the user to update.
- **Request Body**:
  ```json
  {
    "username": "Nanimz",
    "password": "Nanimz07",
    "email": "MrNanimz29@gmail.com",
    "phone_number": "0851568327412"
  }
  ```
- **Response**:
  ```json
  {
    "user_id": 1,
    "username": "Nanimz",
    "email": "MrNanimz29@gmail.com",
    "phone_number": "0851568327412"
  }
  ```

#### Delete User by Id
- **URL**: `/users/:user_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `user_id` (integer): ID of the user to delete.
- **Response**:
  ```json
  {
    "message": "User berhasil dihapus."
  }
  ```

### Event Endpoints
---
  #### Create Event

  - **URL**: `/events`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "event_name": "Melodi Nusantara: Konser Musik Spektakuler",
      "venue_id": "1",
      "description": "Sebuah konser musik yang menampilkan kekayaan budaya dan talenta musikal terbaik.",
      "date": "2024-06-16"
    }
    ```
  - **Response**:
    ```json
    {
      "event_id": 1,
      "event_name": "Melodi Nusantara: Konser Musik Spektakuler",
      "venue_id": "1",
      "description": "Sebuah konser musik yang menampilkan kekayaan budaya dan talenta musikal terbaik.",
      "date": "2024-06-16"
    }
    ```

  #### Get Event by ID

  - **URL**: `/events/:event_id`
  - **Method**: `GET`
  - **URL Parameters**:
    - `event_id` (integer): ID of the event to retrieve.
  - **Response**:
    ```json
    {
      "event_id": 1,
      "event_name": "Melodi Nusantara: Konser Musik Spektakuler",
      "venue_id": "1",
      "description": "Sebuah konser musik yang menampilkan kekayaan budaya dan talenta musikal terbaik.",
      "date": "2024-06-16"
    }
    ```

  #### Update Event by Id

  - **URL**: `/events/:event_id`
  - **Method**: `PUT`
  - **URL Parameters**:
    - `event_id` (integer): ID of the event to update.
  - **Request Body**:
    ```json
    {
      "event_name": "Melodi Nusantara: Konser Musik Spektakuler",
      "venue_id": "3",
      "description": "Sebuah konser musik yang menampilkan kekayaan budaya dan talenta musikal terbaik.",
      "date": "2024-06-22"
    }
    ```
  - **Response**:
    ```json
    {
      "event_id": 1,
      "event_name": "Melodi Nusantara: Konser Musik Spektakuler",
      "venue_id": "3",
      "description": "Sebuah konser musik yang menampilkan kekayaan budaya dan talenta musikal terbaik.",
      "date": "2024-06-22"
    }
    ```

  #### Delete Event by Id

  - **URL**: `/events/:event_id`
  - **Method**: `DELETE`
  - **URL Parameters**:
    - `event_id` (integer): ID of the event to delete.
  - **Response**:
    ```json
    {
      "message": "Event berhasil dihapus."
    }
    ```
### Ticket Endpoints
---

#### Create Ticket

- **URL**: `/tickets`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "event_id": "1",
    "user_id": "1",
    "seat_number": "1",
    "price": "125.50"
  }
  ```
- **Response**:
  ```json
  {
    "ticket_id": 1,
    "event_id": "1",
    "user_id": "1",
    "seat_number": "1",
    "price": "125.50"
  }
  ```

#### Get Ticket by ID

- **URL**: `/tickets/:ticket_id`
- **Method**: `GET`
- **URL Parameters**:
  - `ticket_id` (integer): ID of the ticket to retrieve.
- **Response**:
  ```json
  {
    "ticket_id": 1,
    "event_id": "1",
    "user_id": "1",
    "seat_number": "1",
    "price": "125.50"
  }
  ```

#### Update Ticket by Id

- **URL**: `/tickets/:ticket_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `ticket_id` (integer): ID of the ticket to update.
- **Request Body**:
  ```json
  {
    "event_id": "1",
    "user_id": "2",
    "seat_number": "10",
    "price": "150.00"
  }
  ```
- **Response**:
  ```json
  {
    "ticket_id": "1",
    "event_id": "1",
    "user_id": "2",
    "seat_number": "10",
    "price": "150.00"
  }
  ```

#### Delete Ticket by Id

- **URL**: `/tickets/:ticket_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `ticket_id` (integer): ID of the ticket to delete.
- **Response**:
  ```json
  {
    "message": "Tiket berhasil dihapus."
  }
  ```

### Venue Endpoints
---

#### Create Venue
- **URL**: `/venues`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "venue_name": "The Balava",
    "address": "Jl. Peltu Sujono 19",
    "city": "Surabaya"
  }
  ```
- **Response**:
  ```json
  {
    "venue_id": 1,
    "venue_name": "The Balava",
    "address": "Jl. Peltu Sujono 19",
    "city": "Surabaya"
  }
  ```

#### Get Venue by ID
- **URL**: `/venues/:venue_id`
- **Method**: `GET`
- **URL Parameters**:
  - `venue_id` (integer): ID of the venue to retrieve.
- **Response**:
  ```json
  {
    "venue_id": 1,
    "vanue_name": "The Balava",
    "address": "Jl. Peltu Sujono 19",
    "city": "Surabaya"
  }
  ```

#### Update Venue by Id
- **URL**: `/venues/:venue_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `venue_id` (integer): ID of the venue to update.
- **Request Body**:
  ```json
  {
    "venue_name": "The Balava",
    "address": "Jl. Peltu Sujono 19",
    "city": "Malang"
  }
  ```
- **Response**:
  ```json
  {
    "venue_id": 1,
    "vanue_name": "The Balava",
    "address": "Jl. Peltu SUjono 19",
    "city": "Malang"
  }
  ```

#### Delete Venue by Id
- **URL**: `/venues/:venue_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `venue_id` (integer): ID of the venue to delete.
- **Response**:
  ```json
  {
    "message": "Venue berhasil dihapus."
  }
  ```

### Payment Endpoints
---

#### Create Payment

- **URL**: `/payments`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "user_id": "1",
    "ticket_id": "1",
    "amount": "125.50",
    "payment_date": "2024-06-17"
  }
  ```
- **Response**:
  ```json
  {
    "payment_id": 1,
    "user_id": "1",
    "ticket_id": "1",
    "amount": "125.50",
    "payment_date": "2024-06-17"
  }
  ```

#### Get Payment by ID

- **URL**: `/payments/:payment_id`
- **Method**: `GET`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to retrieve.
- **Response**:
  ```json
  {
    "payment_id": 1,
    "user_id": "1",
    "ticket_id": "1",
    "amount": "125.50",
    "payment_date": "2024-06-17"
  }
  ```

#### Update Payment by Id

- **URL**: `/payments/:payment_id`
- **Method**: `PUT`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to update.
- **Request Body**:
  ```json
  {
    "user_id": "1",
    "ticket_id": "2",
    "amount": "150.00",
    "payment_date": "2024-06-23"
  }
  ```
- **Response**:
  ```json
  {
    "payment_id": 1,
    "user_id": "1",
    "ticket_id": "2",
    "amount": "150.00",
    "payment_date": "2024-06-23"
  }
  ```

#### Delete Payment by Id

- **URL**: `/payments/:payment_id`
- **Method**: `DELETE`
- **URL Parameters**:
  - `payment_id` (integer): ID of the payment to delete.
- **Response**:
  ```json
  {
    "message": "Payment berhasil dihapus."
  }
  ```

