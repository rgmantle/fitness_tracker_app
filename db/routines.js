const client = require("./client");

async function getRoutineById(id){
  try {
      const { rows: [ routine ] } = await client.query(`
      SELECT id, "creatorId", name, goal
      FROM routines
      WHERE id=${ id }
      `);
  
  if (!routine) {
      return null
  }

  return routine;
  } catch (e) {
      throw e;
  }
}


const getAllRoutines = async () => {
  try {
    const { rows } = await client.query(`
        SELECT r."creatorId", r.goal, r.id, r."isPublic", r.name, a.description, a.id AS "activityId", u.username AS "creatorName", ra.duration, ra.count
        FROM routines r
        JOIN routine_activities ra ON r.id = ra."routineId"
        JOIN activities a ON ra."activityId" = a.id
        JOIN users u ON r."creatorId" = u.id;
    `);

    rows.forEach((row) => {
      row.activities = [
        {
          id: row.activityId,
          description: row.description,
          count: row.count,
          duration: row.duration,
        },
      ];
      delete row.activityId;
      delete row.description;
      delete row.duration;
      delete row.count;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllPublicRoutines = async () => {
  try {
    const { rows } = await client.query(`
        SELECT r."creatorId", r.goal, r.id, r."isPublic", r.name, a.description, a.id AS "activityId", u.username AS "creatorName", ra.duration, ra.count
        FROM routines r
        JOIN routine_activities ra ON r.id = ra."routineId"
        JOIN activities a ON ra."activityId" = a.id
        JOIN users u ON r."creatorId" = u.id
        WHERE r."isPublic" IS true;
    `);

    rows.forEach((row) => {
      row.activities = [
        {
          id: row.activityId,
          description: row.description,
          count: row.count,
          duration: row.duration,
        },
      ];
      delete row.activityId;
      delete row.description;
      delete row.duration;
      delete row.count;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllRoutinesByUser = async (user) => {
  const { id, username } = user;

  try {
    const { rows } = await client.query(`
        SELECT r."creatorId", r.goal, r.id, r."isPublic", r.name, a.description, a.id AS "activityId", u.username AS "creatorName", ra.duration, ra.count
        FROM routines r
        JOIN routine_activities ra ON r.id = ra."routineId"
        JOIN activities a ON ra."activityId" = a.id
        JOIN users u ON r."creatorId" = u.id
        WHERE u.username = $1 and u.id = $2;
    `,
    [username, id]);

    rows.forEach((row) => {
      row.activities = [
        {
          id: row.activityId,
          description: row.description,
          count: row.count,
          duration: row.duration,
        },
      ];
      delete row.activityId;
      delete row.description;
      delete row.duration;
      delete row.count;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

const getPublicRoutinesByUser = async (user) => {
  const { id, username } = user;

  try {
    const { rows } = await client.query(`
        SELECT r."creatorId", r.goal, r.id, r."isPublic", r.name, a.description, a.id AS "activityId", u.username AS "creatorName", ra.duration, ra.count
        FROM routines r
        JOIN routine_activities ra ON r.id = ra."routineId"
        JOIN activities a ON ra."activityId" = a.id
        JOIN users u ON r."creatorId" = u.id
        WHERE u.username = $1 and u.id = $2 and r."isPublic" = true;
    `,
    [username, id]);

    rows.forEach((row) => {
      row.activities = [
        {
          id: row.activityId,
          description: row.description,
          count: row.count,
          duration: row.duration,
        },
      ];
      delete row.activityId;
      delete row.description;
      delete row.duration;
      delete row.count;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};

const getPublicRoutinesByActivity = async({ id }) => {
  try {
    const { rows } = await client.query(`
      SELECT r."creatorId", r.goal, r.id, r."isPublic", r.name, a.description, a.id AS "activityId", u.username AS "creatorName", ra.duration, ra.count
      FROM routines r
      JOIN routine_activities ra ON r.id = ra."routineId"
      JOIN activities a ON ra."activityId" = a.id
      JOIN users u ON r."creatorId" = u.id
      WHERE a.id = $1 AND r."isPublic" = true;
    `,
    [id]);

    rows.forEach((row) => {
      row.activities = [
        {
          id: row.activityId,
          description: row.description,
          count: row.count,
          duration: row.duration,
        },
      ];
      delete row.activityId;
      delete row.description;
      delete row.duration;
      delete row.count;
    });

    return rows;
  } catch (error) {
    throw error;
  }
};
    
const createRoutine = async({
  creatorId,
  isPublic,
  name,
  goal
}) => {
  try {
      const { rows: [routine] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES($1, $2, $3, $4)
      RETURNING *;
      `, 
      [creatorId, isPublic, name, goal]
      );
  
  return routine;
  } catch (error) {
      throw error;
  }
};

const updateRoutine = async (fields = {}) => {
  const { id } = fields;
  delete fields.id;

  const setString = Object.keys(fields)
    .map((key, index) => {
      if (key === "isPublic") {
        return `"${key}"=$${index + 1}`;
      } else {
        return `${key}=$${index + 1}`;
      }
    })
    .join(", ");

  if (setString.length === 0) {
    return "";
  }

  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,
      Object.values(fields)
    );

    return routine;
  } catch (error) {
    throw error;
  }
};

const destroyRoutine = async (id) => {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      DELETE FROM routines
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    await client.query(
      `
      DELETE FROM routine_activities
      WHERE "routineId" = $1;
      `,
      [id]
    );

    return routine;
  } catch (error) {
    throw error;
  }
};

async function getRoutinesWithoutActivities() {
  try {
      const { rows } = await client.query(`
        SELECT * 
        FROM routines;
      `);
  
      return rows;
    } catch (error) {
      throw error;
    }
} 




module.exports = {
    client,
    getRoutinesWithoutActivities,
    getRoutineById,    
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine
}