  
import React from "react";

const Home = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h3>{user ? `Welcome back ${user.username}` : "Sign up and Get Shredded Today!"}</h3>
      <img src={"https://www.gannett-cdn.com/presto/2020/07/07/PPHX/508be681-5dae-4448-9a50-b18ca14af634-DW1_4476.jpg?crop=3887,2187,x0,y197&width=3200&height=1801&format=pjpg&auto=webp"} width="33%" height="33%"/> ;
    </div>
  )


};

export default Home;