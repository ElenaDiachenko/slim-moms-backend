const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
module.exports = corsOptions;
