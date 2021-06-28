// import React, { useState } from 'react';
// import { loginUser } from '../api';
// import { Modal, Button, Form } from 'react-bootstrap'

// const Login = () => {
//     const [show, setShow] = useState(false);
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  
//     return (
//       <>
//         <Button variant="primary" onClick={handleShow}>
//           Login
//         </Button>
  
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Login</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={async (event) => {
//                 event.preventDefault()
                
//                 try {
//                     const results = await loginUser(username, password)
//                     console.log(results)
//                 } catch (error) {
//                     console.log(error)
//                 }
//             }}>
//                 <Form.Group controlId="formBasicUsername">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control 
//                     type="username" 
//                     placeholder="Enter username" 
//                     value={username}
//                     onChange={(event) => setUsername(event.target.value)} />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password}
//                     onChange={(event) => setPassword(event.target.value)} />
//                 </Form.Group>

//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//           </Modal.Body>
//         </Modal>
//       </>
//     );
// }

// export default Login;