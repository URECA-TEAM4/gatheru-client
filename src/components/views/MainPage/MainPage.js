import React from 'react'
import Tab from '../../common/Tabs/Tab'
import Post from './Post'
import { Container } from '@mui/material'
import Auth from "../../../hoc/auth"

function MainPage() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Tab />
        <Post postType="mogako" pastDeadline={false} />
        <Post postType="etc" pastDeadline={true} />
      </Container>
    </div>
  )
}

export default Auth(MainPage, true);