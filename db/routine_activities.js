const client = require("./client.js");

const getRoutineActivityById = async (id) => {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE id = $1;
        `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
};

const addActivityToRoutine = async ({
  routineId,
  activityId,
  count,
  duration,
}) => {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES($1, $2, $3, $4)
        RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
};

const updateRoutineActivity = async (fields = {}) => {
  const setString = Object.keys(fields)
    .map((key, index) => `${key}=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return "";
  }

  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        UPDATE routine_activities
        SET ${setString}
        WHERE id = ${fields.id}
        RETURNING id, count, duration;
    `,
      Object.values(fields)
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
};

const destroyRoutineActivity = async (id) => {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        DELETE FROM routine_activities
        WHERE id = $1
        RETURNING *;
      `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
};

const getRoutineActivitiesByRoutine = async ({ id }) => {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM routine_activities
        WHERE "routineId" = $1;
      `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine,
  };