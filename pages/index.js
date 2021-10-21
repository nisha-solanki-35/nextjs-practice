import { Button, TextField } from '@mui/material'
import axios from 'axios';
import Router from 'next/router'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import { Crypt } from 'hybrid-crypto-js'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUH3YJ9lSOPsof/8qyHKPG1kuA
QXNLEWE4bd+VLBgbEitOwm9+TLpzcnzweaiVfr9NIoaEydxP4ZlJF/h/7fhOuazS
QRld429/k+ZzyfmpDkGIPbgKOndPdy0AuWZoiEMXKQvSbtmbCN0isWlquW1vU7Fn
SJi4Dm1LbgpnL6FLgwIDAQAB
-----END PUBLIC KEY-----`

function encryption(sPassword) {
  var crypt = new Crypt();
  var encrypted = crypt.encrypt(publicKey, sPassword);
  return encrypted.toString()
}

export default function Login() {

  // const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errUsername, setErrUsername] = useState('')
  const [errPassword, setErrPassword] = useState('')

  function handleOnchange(e, type) {
    switch (type) {
      case 'username':
        if(e.target.value){
          setErrUsername('')
        }
        setUsername(e.target.value)
        break;
      case 'password':
        if(e.target.value){
          setErrPassword('')
        }
        setPassword(e.target.value)
        break;
      default:
        break;
    }
  }

  function handleOnSubmit() {
    if(!username || !password){
      if(!username){
        setErrUsername('Required field')
      }
      if(!password){
        setErrPassword('Required field')
      }
    } else {
        const Password = encryption(password);
        const response = axios.post('https://nodeback.fantasywl.tk/api/admin/auth/login/v2', { sLogin: username, sPassword: Password })
        localStorage.setItem('Token', response.Authorization)
        localStorage.setItem('adminData', JSON.stringify(response.data))
        // const token = response.data.Authorization
        // const resMessage= response.data.message
        Router.push({pathname : '/users', state: {token: localStorage.getItem('token')}});
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <TextField
          id="filled-username-input"
          label="Username"
          type="text"
          autoComplete="username"
          variant="filled"
          value={username}
          onChange={e=> handleOnchange(e, 'username')}
        />
      <p className='error-text'>{errUsername}</p>
      <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={password}
          onChange={e=> handleOnchange(e, 'password')}
        />
      <p className='error-text'>{errPassword}</p>
      <Button variant="outlined" onClick={handleOnSubmit}>Submit</Button>
    </div>
  )
}