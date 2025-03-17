export default () => ({
    port: process.env.HOST_PORT || 3000,
    database: {
      dbUrlL: process.env.DATABASE_URL
    }
  });
  