# YourWallet
<div align="center">

<a href="your-wallet.vercel.app"><img height="600px" src="https://i.imgur.com/hAqxdCx.png" title="source: imgur.com" /> </a>

</div>

## About 

YourWallet is an full-stack app developed to make your financial day-to-day life a little bit easier to track.
You can find its online deployment [here](https://your-wallet.vercel.app/). With this aplication, you can:

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
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/fernandollisboa/your-wallet-backend.git
   ```
2. Install npm packages
   ```sh
   npm install
   ```
3. Create a `.env` inside the project's root directory and fill it with your database credencials (see `.env.example`).

4. Don't forget to fill your JWT_SECRET in `.env`
   ```sh
   JWT_SECRET = something_really_secret
   ```
5. Enter your database and run `./dump.sql`. 

6. Install the [front-end repo](https://github.com/fernandollisboa/your-wallet-frontend).
7. Run 
   ```sh
   npm start
   ```

