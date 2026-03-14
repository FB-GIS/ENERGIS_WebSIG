module.exports = (_db) => {
    db = _db
    return RoleModel
}

class RoleModel {
    
     static getAllRoles() {
        return db.query(`SELECT * FROM role`)
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
 
      static getRoleById(id) {
        return db.query(`SELECT * FROM role WHERE id = ?`, [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    
      static getRoleByType(type) {
        return db.query(`SELECT * FROM role WHERE type = ?`, [type])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }    
    
    
    static deleteRoleById(id) {
        return db.query(`DELETE FROM role WHERE id = ?`, [id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }


    static addRole(req) {
        return db.query(`INSERT INTO role (type) VALUES (?)`, [req.body.type])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }

    
    static updateRoleById(req, id) {
        return db.query(`UPDATE role SET type = ? WHERE id = ?`, [req.body.type, id])
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
    }
    
}