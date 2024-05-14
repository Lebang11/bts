const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: 'postgres://bts_user:c7gAVc21ogMiMSGunzPtF7CWGanVYAQV@dpg-cp1p9guct0pc73d5t0gg-a.frankfurt-postgres.render.com/bts',
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool;