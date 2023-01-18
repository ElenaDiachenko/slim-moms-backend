// const corsOptions = {
//   credentials: true,
//   origin: process.env.FRONTEND_URL,
  // methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
// };
// module.exports = corsOptions;

const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
  optionsSuccessStatus: 200,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}

module.exports = corsOptions 