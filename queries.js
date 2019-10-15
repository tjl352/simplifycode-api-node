const pg = require('pg');
const config = {
  user: 'postgres', //this is the db user credential
  database: 'postgres',
  password: 'postgres',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users.users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM users.users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const {name, email} = request.body;

  pool.query(
    'INSERT INTO users.users (name, email) VALUES ($1, $2)',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const {name, email} = request.body;

  pool.query(
    'UPDATE users.users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM users.users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
