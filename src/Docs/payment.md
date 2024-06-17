### API Documentation

#### Base URL: `/api`

---

### Payment Endpoints

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
