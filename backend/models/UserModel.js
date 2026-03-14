const bcrypt = require("bcryptjs")
const saltRounds = 10

module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel {

    static getAllUsers() {
        return db.query('SELECT u.id, u.firstname, u.lastname, u.email, u.address, u.zipcode, u.city, u.phone, r.type  FROM user u LEFT JOIN role r ON u.role_id = r.id ORDER BY u.id LIMIT 150')
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }


    static getUserById(id) {
        return db.query(`SELECT u.id, u.firstname, u.lastname, u.email, u.address, u.zipcode, u.city, u.phone, r.type  FROM user u LEFT JOIN role r ON u.role_id = r.id WHERE u.id = ?`, [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    static deleteUser(id) {
        return db.query(`DELETE FROM user WHERE id = ?`, [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }


    static getUserByEmail(email) {
        return db.query(`SELECT u.id, u.firstname, u.lastname, u.email, u.address, u.zipcode, u.city, u.city, u.phone, u.password, r.type  FROM user u LEFT JOIN role r ON u.role_id = r.id WHERE u.email = ?`, [email])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }


    static saveUser(req, hash) {
        return db.query(`INSERT INTO user (firstname, lastname, email, address, zipcode, city, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [req.body.firstname, req.body.lastname, req.body.email, req.body.address, req.body.zipcode, req.body.city, req.body.phone, hash])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }


    static updateUser(req, userId, hash) {
        let sql = `
            UPDATE user 
            SET firstname = ?, lastname = ?, email = ?, address = ?, zipcode = ?, city = ?, phone = ?`;
    
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.address,
            req.body.zipcode,
            req.body.city,
            req.body.phone,
        ];
    
        if (hash) {
            sql += `, password = ?`;
            values.push(hash);
        }
        
        sql += `, role_id = ?`;
        values.push(req.body.role_id);
    
    
        sql += ` WHERE id = ?`;
        values.push(userId);
    
        return db.query(sql, values)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    }


}
