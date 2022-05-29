require('dotenv').config();
module.exports =

{
  // "development" :
  // {
  //   "username":    process.env.DB_USERNAME,
  //   "password":    process.env.DB_PASSWORD,
  //   "database":    process.env.DB_DATABASE,
  //   "host"  :      process.env.DB_HOST,
  //       "dialect":    "mysql"
  // },
    "development":
        {
            "username":    process.env.RDS_USERNAME,
            "password":    process.env.RDS_PASSWORD,
            "database":    process.env.RDS_DB_NAME,
            "host"  :      process.env.RDS_HOSTNAME,
            "dialect":    "mysql"
        },
  "test":
      {
          "username":    process.env.DB_USERNAME,
          "password":    process.env.DB_PASSWORD,
          "database":    process.env.DB_DATABASE,
          "host"  :      process.env.DB_HOST,
          "dialect":    "mysql"
      },
  "production":
      {
          "username":    process.env.RDS_USERNAME,
          "password":    process.env.RDS_PASSWORD,
          "database":    process.env.RDS_DB_NAME,
          "host"  :      process.env.RDS_HOSTNAME,
          "dialect":    "mysql"
      }
}