module.exports = (_db) => {
  db = _db
  return ProjectModel
}

class ProjectModel {

  static getAllProjects() {
    return db.query(` SELECT 
                        p.id, 
                        p.name,
                        p.city,
                        p.energy,
                        d.name AS developer_name,
                        s.status AS status,
                        ts.type_project AS solar_type,
                        wm.model AS wind_model,
                        ST_AsGeoJSON(p.geom) AS geom
                      FROM project p
                      LEFT JOIN developer d ON p.developer_id = d.id
                      LEFT JOIN status_project s ON p.status_project_id = s.id
                      LEFT JOIN type_solar ts ON p.type_solar_id = ts.id
                      LEFT JOIN wind_model wm ON p.wind_model_id = wm.id`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  static getAllProjectsByEnergy(energy) {
    return db.query(` SELECT 
                        p.id, 
                        p.name,
                        p.city,
                        p.energy,
                        d.name AS developer_name,
                        s.status AS status,
                        ts.type_project AS solar_type,
                        wm.model AS wind_model,
                        ST_AsGeoJSON(p.geom) AS geom
                      FROM project p
                      LEFT JOIN developer d ON p.developer_id = d.id
                      LEFT JOIN status_project s ON p.status_project_id = s.id
                      LEFT JOIN type_solar ts ON p.type_solar_id = ts.id
                      LEFT JOIN wind_model wm ON p.wind_model_id = wm.id
                      WHERE p.energy = ?`, [energy])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  
  
  static getProjectById(id) {
    return db.query(`      
                 SELECT 
                        p.id, 
                        p.name,
                        p.city,
                        p.energy,
                        d.name AS developer_name,
                        s.status AS status,
                        ts.type_project AS solar_type,
                        wm.model AS wind_model,
                        ST_AsGeoJSON(p.geom) AS geom
                      FROM project p
                      LEFT JOIN developer d ON p.developer_id = d.id
                      LEFT JOIN status_project s ON p.status_project_id = s.id
                      LEFT JOIN type_solar ts ON p.type_solar_id = ts.id
                      LEFT JOIN wind_model wm ON p.wind_model_id = wm.id
                      WHERE p.id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }

  static addProject(data) {
    return db.query(`      
                  INSERT INTO project (
                    name,
                    city,
                    energy,
                    type_solar_id,
                    status_project_id,
                    developer_id,
                    wind_model_id,
                    geom
                    )
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ST_GeomFromGeoJSON(?))
                    `, 
                    [data.name, data.city, data.energy, data.type_solar_id, data.status_project_id, data.developer_id, data.wind_model_id, JSON.stringify(data.geojson)]
                    )
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }




  static updateProject(data, id) {
    return db.query(`      
                  UPDATE project SET
                    name = ?,
                    city = ?,
                    energy = ?,
                    type_solar_id = ?,
                    status_project_id = ?,
                    developer_id = ?,
                    wind_model_id = ?,
                    geom = ST_GeomFromGeoJSON(?)
                  WHERE id = ?`, [data.name, data.city, data.energy, data.type_solar_id, data.status_project_id, data.developer_id, data.wind_model_id, JSON.stringify(data.geojson), id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }



  static deleteProject(id) {
    return db.query(`DELETE FROM project WHERE id = ?`, [id])
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  


}
