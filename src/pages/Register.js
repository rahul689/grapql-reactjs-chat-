import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';
import {  Col, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const REGISTER_USER =gql`
    mutation register($username: String! $email: String! $password: String! $confirmPassword:String!){
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword){
            username email createdAt
        }
    }
`;


export default function Register(props) {
    
  const [variables, setVariables] = useState({
    email: '',
    username:'',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({

  })

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {

      update: (_, __)=> props.history.push('/login'),
      onError: (err) => setErrors(err.graphQLErrors[0].extensions)

  });

  const submitRegisterForm = e =>{
    e.preventDefault()
    registerUser({variables})
  }

    return (
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={4} md={6} lg={4}>
          <h1 className="text-center">Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={errors.email && 'text-danger'}> { errors.email ?? 'Email address' }</Form.Label>
              <Form.Control 
              value={variables.email} 
              className={errors.email && 'is-invalid'}
              onChange={ (e)=>setVariables({ ...variables, email: e.target.value })}  
              type="email" 
              placeholder="Enter email" 
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label  className={errors.confirmPassword && 'text-danger'}>{ errors.confirmPassword ?? 'Confirm Password'}</Form.Label>
              <Form.Control
                value={variables.confirmPassword} 
                className={errors.confirmPassword && 'is-invalid'}
                onChange={ (e)=>setVariables({ ...variables, confirmPassword: e.target.value })}  
                type="password" 
                placeholder="Password" 
            />
            </Form.Group>
            <div className="text-center"> 
              <Button variant="success" type="submit" disabled={loading}>
                { loading ? 'loading..' : 'Register'}  
              </Button> <br />
              <small> Allready have an account! <Link to="/login">Login</Link></small>
            </div>
            
          </Form>
        </Col>
      </Row>
    )
}
