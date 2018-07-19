let config = {
  key: {
    sqlServer: process.env.RIEMON_SERVER_SQL,
    sqlPort: process.env.RIEMON_PORT_SQL,
    sqlUser: process.env.RIEMON_USER_SQL,
    sqlPassword: process.env.RIEMON_PASS_SQL,
    sqlDatabase: process.env.RIEMON_DB_SQL
  }
}

module.exports = config