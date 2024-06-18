  ### API Documentation

  #### Base URL: `/api`

  ---

  ### Event Endpoints

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
