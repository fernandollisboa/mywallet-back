# YourWallet
<div align="center">

<a href="your-wallet.vercel.app"><img height="600px" src="https://i.imgur.com/hAqxdCx.png" title="source: imgur.com" /> </a>

</div>

## About 

YourWallet is an full-stack app developed to make your financial day-to-day life a little bit easier to track.
You can find its online deployment [here](your-wallet.vercel.app). With this aplication, you can:

- Sign Up
- Login
- View all transactions for a user
- Add expense
- Add income


## Technologies [back-end]

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/fernandollisboa/mywallet-back.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` inside the project's root directory and fill it with your database credencials (see `.env.example`).
    ```
    DB_USER=
    DB_PASSWORD=
    DB_PORT=
    DB_HOST=
    DB_NAME=
    PORT=
    DATABASE_URL=
    JWT_SECRET=  
    ```
3. Don't forget to fill your JWT_SECRET in `.env`
   ```
   const JWT_SECRET = something_really_secret
   ```
4. Enter your database and run `./dump.sql`. 
5. Run 
   ```sh
   npm start
   ```
6. (Optional) If you prefer to have the whole project in your machine, also install the [front-end rep](https://github.com/fernandollisboa/mywallet-front).

