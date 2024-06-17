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
