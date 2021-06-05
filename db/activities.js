const client = require("./client");

async function createActivity({
    name,
    description
}) {
    try {
        const { rows: [activity] } = await client.query(`
        INSERT INTO activities(name, description)
        VALUES($1, $2)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `, [name, description]);
    
    return activity;
    } catch (error) {
        throw error;
    }
}

async function getActivityById(id){
    try {
        const { rows: [ activity ] } = await client.query(`
        SELECT *
        FROM activities
        WHERE id= $1;
        `,
        [id]
        );
    
    if (!activity) {
        return null
    }

    return activity;
    } catch (e) {
        throw e;
    }
}

async function getAllActivities() {
    try {
        const { rows } = await client.query(`
          SELECT * 
          FROM activities;
        `);
    
        return rows;
      } catch (error) {
        throw error;
      }
}

const updateActivity = async ({ id, name, description }) => {
    try {
      const {
        rows: [activity],
      } = await client.query(
        `
        UPDATE activities
        SET name = $2, description = $3
        WHERE id = $1
        RETURNING *;
        `,
        [id, name, description]
      );
  
      return activity;
    } catch (error) {
      throw error;
    }
  };
   

module.exports = {
    client,
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity
}