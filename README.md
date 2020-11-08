# DigsUp-Server

The project implements the backend for the sample **Signup** mockup page .

It uses the following tools:

- Node.js (v13.12.x)
- Yarn (v1.22.x)
- Docker (v19.03.x)
- Mailcatcher
- SQLite

The application implements ONLY the back-end based for the digsup sample application. I chose to separate the front-end from back-end for scaling purposes in the future. Practically the application runs inside a docker container in port 8081.
Due to this design, the back-end application could be scaled properly (eg. with Kubernettes) and in combination with the front-end instances would compose a functional cluster offering high availability, resiliance, failover and other valuable QoS capabilities.

## Install locally
1. Clone from repo:

    ```git clone https://github.com/vnikolaou/digsup-server.git``` 
2. Go to project's root folder:

    ```cd digsup-server```
3. Run:  

    ```yarn install``` 
 
## Run the app in prod mode (as Docker container)
1. Go to project's dist folder:

    ```cd digsup-server```
2. Build the image:

    ```sudo docker-compose build```
    
    ```sudo docker-compose up```

3. Open a browser and given that the front-end is running visit the address:

    ```http://localhost:8080```
    
## Process the registered emails via the REST API
1. Open a new terminal or CLI
2. Run:
   
   ```curl -X PUT  localhost:8081/api/signup/process```
3. The API will return an array of entries in JSON format. For example:

   ```[{"email":"vnikolaou12@gmail.com","sent":true},
       {"email":"vnikolaou13@gmail.com","sent":true},
       {"email":"vnikolaou14@gmail.com","sent":true},
       {"email":"vnikolaou15@gmail.com","sent":true},
       {"email":"vnikolaou16@gmail.com","sent":true}]
  
   NOTE: the key 'sent' indicates whether an email has been sent to the recipient successfully or not 
