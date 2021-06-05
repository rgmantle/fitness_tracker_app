const client = require("./client.js");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ username, password }) => {
  const hashedPassword = bcrypt.hashSync(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        RETURNING id, username;
        `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ username, password }) => {
    try {
      const user = await getUserByUserName(username);
  
      const passwordsMatch = bcrypt.compareSync(password, user.password);
  
      if (passwordsMatch) {
        delete user.password;
        return user;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to get user:", username);
      throw error;
    }
  };

async function getUserById(id) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${ id }
        `);
    
    if (!user) {
        return null
    }

    return user;
    } catch (e) {
        throw e;
    }
}

const getUserByUserName = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    client,
    createUser, 
    getUser,
    getUserById,
    getUserByUserName
}