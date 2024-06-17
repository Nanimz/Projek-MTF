### API Documentation

#### Base URL: `/api`

---

### Ticket Endpoints

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
