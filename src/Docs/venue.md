### API Documentation

#### Base URL: `/api`
---

### Venue Endpoints

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
