let config = {
  key: {
    sqlServer: process.env.RIEMON_SERVER_SQL,
    sqlPort: process.env.RIEMON_PORT_SQL,
    sqlUser: process.env.RIEMON_USER_SQL,
    sqlPassword: process.env.RIEMON_PASS_SQL,
    sqlDatabase: process.env.RIEMON_DB_SQL,
    keyVal1: process.env.RIEMON_DB_VAL1,
    keyVal2: process.env.RIEMON_DB_VAL2,
    keyVal3: process.env.RIEMON_DB_VAL3
  }
}

module.exports = config