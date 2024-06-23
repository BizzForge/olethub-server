const getUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE id = $1'
const checkEmailExists = 'SELECT * FROM users WHERE email = $1';
const addUser = 'INSERT INTO users (username, email, password, first_name, last_name, phone_number, address, city, country, zip_code, is_admin, registration_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)'
const addSubscribers = 'INSERT INTO subscribers (email) VALUES ($1) RETURNING id';

module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    addSubscribers
}