export default () => ({
  port: process.env.PORT || 3000,
  db: {
    host: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});
