const pool = require('../../db');
const queries = require('./query');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json(res.rows)
    })
}

const addUser = (req, res) => {
    const {username, email, password, first_name, last_name, phone_number, address, city, country, zip_code, is_admin, registration_date} = req.body;

    // Validate input
    if (!username || !email || !password || !first_name || !last_name || !phone_number || !address || !city || !country || !zip_code || registration_date == null) {
        return res.status(400).send('Incomplete data. Please provide all required fields.');
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Check if the user already exists
        pool.query(queries.checkEmailExists, [email], (err, result) => {
            if (err) {
                console.error('Error checking email existence:', err);
                return res.status(500).send('Internal Server Error');
            }

            if (result.rows.length) {
                return res.status(409).send('User Already Exists');
            }

            // Add the user to the database with hashed password
            pool.query(queries.addUser, [username, email, hashedPassword, first_name, last_name, phone_number, address, city, country, zip_code, is_admin, registration_date], (err, result) =>  {
                if (err) {
                    console.error('Error adding user:', err);
                    return res.status(500).send('Internal Server Error');
                }

                res.status(201).send('User Created Successfully!');
            });
        });
    });
};

const addSubscribers = async (req, res) => {
    const email = req.body.email;
    if(email) {
        try {
            const values = [email];
            pool.query(queries.addSubscribers, values)
            res.send('Thank you for subscribing!');
        } catch (err) {
            res.status(500).send('Error saving email.')
        }
    } else {
        res.status(400).send('Email is required.')
    }
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    addSubscribers
}