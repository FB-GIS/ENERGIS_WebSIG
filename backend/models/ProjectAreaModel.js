module.exports = (_db) => {
    db = _db
    return ProjectAreaModel
}

class ProjectAreaModel {
    
    static getAllProjectAreas() {
        return db.query(
                `SELECT pa.id, pa.area, pa.comment, u.lastname AS author, ST_AsGeoJSON(geom) AS geom 
                   FROM project_area pa
                   INNER JOIN user u
                   ON pa.user_id = u.id`
            ).then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    

    static getProjectArea(req) {
        return db.query(
                `SELECT pa.id, pa.area, pa.comment, u.lastname AS author, ST_AsGeoJSON(geom) AS geom
                   FROM project_area pa
                   INNER JOIN user u
                   ON pa.user_id = u.id 
                   WHERE user_id = ?`, [req.id]
            ).then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    
    static getProjectAreaById(req) {
        return db.query(
                `SELECT id, area, comment, ST_AsGeoJSON(geom) AS geom 
                   FROM project_area 
                   WHERE id = ?`, [req.params.id]
            ).then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    static addProjectArea(req) {
        return db.query(
                `INSERT INTO project_area (area, comment, user_id, geom)
                VALUES (?, ?, ?, ST_GeomFromGeoJSON(?))`, [req.body.area, req.body.comment, req.id, JSON.stringify(req.body.geojson.geometry)]
            ).then((res) => {
                return res
            })
            .catch((err) => {
                console.error("Erreur MySQL : ", err.sqlMessage);
                return err
            })
    }

    static deleteProjectArea(id) {
        return db.query(
                `DELETE FROM project_area WHERE id = ?`, [id]
            ).then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
     static updateProjectArea(req, id) {
        return db.query(
               `UPDATE project_area
               SET area = ?, comment = ?, geom = ST_GeomFromGeoJSON(?)
               WHERE id = ? AND user_id = ?`, [req.body.area, req.body.comment, JSON.stringify(req.body.geojson), id, req.id]
            ).then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    } 
    
}
