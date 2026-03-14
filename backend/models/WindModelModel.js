module.exports = (_db) => {
    db = _db
    return WindModelModel
}

class WindModelModel {
    
    static getAllWind() {
    return db.query(` SELECT * FROM wind_model ORDER BY model`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
    
    static getWindByModel(model) {
    return db.query(` SELECT id FROM wind_model WHERE model = ?`, [model])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static getWindById(id) {
    return db.query(` SELECT * FROM wind_model WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static addWind(model) {
    return db.query(`INSERT INTO wind_model (model) VALUES (?)`, [model])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static updateWind(model, id) {
    return db.query(`UPDATE wind_model SET model = ? WHERE id = ?`, [model, id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
    static deleteWind(id) {
    return db.query(`DELETE FROM wind_model WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
}