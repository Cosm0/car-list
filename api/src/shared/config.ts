export default () => ({
  port: process.env.PORT || 3000,
  node_env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production', // change longitude/latitude types from numbers to GeoJSON 

  db: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
