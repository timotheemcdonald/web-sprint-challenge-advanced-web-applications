import React, {useState} from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../utils/axiosWithAuth'
import {useHistory} from 'react-router-dom'

const RedSpan = styled.span`
color: red;
`
const CenterDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:whitesmoke;
width:30%;
margin:20px auto;
border:3px black solid;
padding:10px;
`

const StyledButton = styled.button`
color:ivory;
background-color:black;
border:none;
padding:15px;
margin:20px auto;
width:200px;
`

const StyledInput = styled.input`
width:190px;`


const blankForm = {
    username: '',
    password:''
    
}

const Login = () => {

    const [form, setForm] = useState(blankForm)

    const history = useHistory()

    const onSubmit = (event) => {
        event.preventDefault()
        axiosWithAuth()
        .post('/api/login', form)
        // .post('/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
        .then(value => {
            console.log(value, 'this is value in submit button')
            localStorage.setItem('token', value.data.payload)
            history.push('/protected')
            console.log(value.data, 'this is value.data')
            console.log('submit sucessful on login page')
        })
        .catch(error => {
            console.log(error, 'error in submit on login')
        })
    }
    
    const onChange = (event) => {
       setForm({
           ...form,
           [event.target.name]: event.target.value
       })
    }

    return(
        <div>
       
            <CenterDiv>
              <h1>Welcome to the Bubble App!</h1>
           </CenterDiv>
           <CenterDiv>
            <div>
           Enter <RedSpan>Lambda School</RedSpan> and <RedSpan>{`i<3Lambd4`}</RedSpan>:
           </div>
           </CenterDiv>

           <CenterDiv>
            <form onSubmit={onSubmit}>
                <h4>Username:</h4>
                <StyledInput 
                type="text"
                name="username"
                value={form.username}
                onChange={onChange}
                />
                <h4>Password:</h4>
                <StyledInput 
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                />
                <div>
                <StyledButton>Login</StyledButton>
                </div>
            </form>
        </CenterDiv>

        </div>
    )
}

export default Login;