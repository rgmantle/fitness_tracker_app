import React, { useEffect } from 'react';
import { getActivities } from '../api';

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