const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(user) {
    const {
      cities_id,
      user_name,
      user_cpf,
      user_login,
      user_password,
      user_address,
      user_neighborhood,
      user_complement,
      user_number,
      user_birthdate,
      user_phone,
      user_cellphone,
      user_email,
    } = user;

    const hashedPassword = await bcrypt.hash(user_password, 10);

    const [result] = await db.execute(
      `INSERT INTO user (
        cities_id, user_name, user_cpf, user_login, user_password, user_address,
        user_neighborhood, user_complement, user_number, user_birthdate,
        user_phone, user_cellphone, user_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cities_id,
        user_name,
        user_cpf,
        user_login,
        hashedPassword,
        user_address,
        user_neighborhood,
        user_complement,
        user_number,
        user_birthdate,
        user_phone,
        user_cellphone,
        user_email,
      ]
    );

    return result.insertId;
  }

  static async findByLogin(login) {
    const [rows] = await db.execute('SELECT * FROM user WHERE user_login = ?', [login]);
    return rows[0];
  }
}

module.exports = User;