module.exports = (_db) => {
    db = _db
    return TypeSolarModel
}

class TypeSolarModel {
    
    static getAllSolar() {
    return db.query(` SELECT * FROM type_solar ORDER BY type_project`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
    
    static getSolarByType(type) {
    return db.query(` SELECT id FROM type_solar WHERE type_project = ?`, [type])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
     static getSolarById(id) {
    return db.query(` SELECT * FROM type_solar WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static addSolar(type) {
    return db.query(`INSERT INTO type_solar (type_project) VALUES (?)`, [type])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static updateSolar(type, id) {
    return db.query(`UPDATE type_solar SET type_project = ? WHERE id = ?`, [type, id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static deleteSolar(id) {
    return db.query(`DELETE FROM type_solar WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
}