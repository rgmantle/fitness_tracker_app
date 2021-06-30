import React, { useEffect } from 'react';
import { getActivities } from '../api';

import './style.css';

const Activities = (props) => {
    const {activities, setActivities } = props;

    useEffect(() => {
        Promise.all([getActivities()])
            .then(([activities]) => {
                setActivities(activities);
            })
        .catch(console.error);
    }, []);

    return (
        <div id="activities">
            <h2>There are currently {activities.length} activities in the database.</h2>
            <ul>
                {activities.map((activity, index) => {
                    return (
                        <li key={index}>
                            Activity {index + 1}
                            <ul>
                                <li>{activity.name}</li>
                                <li>{activity.description}</li>
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Activities;

// import React from 'react';

// const Activities = () => {
//     return (
//         <button>
//             Activities
//         </button>
//     )
// }

// export default Activities;