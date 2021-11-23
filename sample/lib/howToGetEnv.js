const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../.env')})

const ENV_KEY = process.env.ENV_KEY

console.log(ENV_KEY);