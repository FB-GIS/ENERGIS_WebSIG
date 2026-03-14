module.exports = (_db) => {
    db = _db
    return DeveloperModel
}

class DeveloperModel {
    
    static getAllDeveloper() {
    return db.query(`SELECT * FROM developer ORDER BY name`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
    
    static getDeveloperByName(name) {
    return db.query(`SELECT id FROM developer WHERE name = ?`, [name])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
     static getDeveloperById(id) {
    return db.query(`SELECT * FROM developer WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static addDeveloper(name) {
    return db.query(`INSERT INTO developer (name) VALUES (?)`, [name])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static updateDeveloper(name, id) {
    return db.query(`UPDATE developer SET name = ? WHERE id = ?`, [name, id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static deleteDeveloper(id) {
    return db.query(`DELETE FROM developer WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
}