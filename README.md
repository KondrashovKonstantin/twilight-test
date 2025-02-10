# Running the Application

## Running with Docker Compose

1. Ensure you have Docker and Docker Compose installed on your machine.
2. If you use MacOS, check that the Docker daemon is started.
3. Run the following commands to start the services:
   ```sh
   docker-compose build
   docker-compose up -d
   ```
4. The `client-app` will be available at `http://localhost:3001` and the `core-api` will be available at `http://localhost:3000`.

## Running without Docker Compose

### Running `client-app`

1. Navigate to the `client-app` directory:
   ```sh
   cd ./client-app
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. The `client-app` will be available at `http://localhost:3001`.

### Running `core-api`

1. Navigate to the `core-api` directory:
   ```sh
   cd ./core-api
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. The `core-api` will be available at `http://localhost:3000`.
