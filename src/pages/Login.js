import {  gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import {  Col, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const LOGIN_USER =gql`
    query login(
        $username: String!  
        $password: String! 
        ){
        login(
            username: $username
             password: $password
            ){
            username 
            email 
            createdAt
            token
        }
    }
`;


export default function Login(props) {
    
  const [variables, setVariables] = useState({
    username:'',
    password: '',
  })

  const [errors, setErrors] = useState({

  })

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {

      onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
      onCompleted(data){
          localStorage.setItem('token', data.login.token)
          props.history.push('/')
      }
  });

  const submitLoginForm = e =>{
    e.preventDefault()
    loginUser({variables})
  }

    return (
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={4} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <Form onSubmit={submitLoginForm}>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className={errors.username && 'text-danger'}>{ errors.username ?? 'Username'}</Form.Label>
              <Form.Control  
                value={variables.username} 
                className={errors.username && 'is-invalid'}
                onChange={ (e)=>setVariables({ ...variables, username: e.target.value })}  
                type="text" 
                placeholder="Enter username" 
             />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={errors.password && 'text-danger'}>{ errors.password ?? 'Password'}</Form.Label>
              <Form.Control
               value={variables.password}
               className={errors.password && 'is-invalid'}
               onChange={ (e)=>setVariables({ ...variables, password: e.target.value })}  
               type="password" 
               placeholder="Password"
             />
            </Form.Group>

            <div className="text-center"> 
              <Button variant="success" type="submit" disabled={loading}>
                { loading ? 'loading..' : 'Login'}  
              </Button> <br />
              <small> Don't have an account! <Link to="/register">Register</Link></small>
            </div>
            
          </Form>
        </Col>
      </Row>
    )
}
