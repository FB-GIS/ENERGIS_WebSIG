module.exports = (_db) => {
    db = _db
    return StatusProjectModel
}

class StatusProjectModel {
    
    static getAllStatus() {
    return db.query(`SELECT * FROM status_project ORDER BY status`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
    
    static getStatusByStatus(status) {
    return db.query(`SELECT id FROM status_project WHERE status = ?`, [status])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
     static getStatusById(id) {
    return db.query(`SELECT * FROM status_project WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static addStatus(status) {
    return db.query(`INSERT INTO status_project (status) VALUES (?)`, [status])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static updateStatus(status, id) {
    return db.query(`UPDATE status_project SET status = ? WHERE id = ?`, [status, id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static deleteStatus(id) {
    return db.query(`DELETE FROM status_project WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
}