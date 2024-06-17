### Prisma Schema Documentation

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
