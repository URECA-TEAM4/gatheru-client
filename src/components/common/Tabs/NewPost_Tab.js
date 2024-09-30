import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography, Container } from '@mui/material'
import 'react-tabs/style/react-tabs.css'
import NewPostPage from '../../views/NewPostPage/NewPostPage'
import NewPostPagemok from '../../views/NewPostPage/NewPost_mok'

export default function NewPostTab() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth="md" sx={{ my: 3 }}>
      <h2>모집 글 작성</h2>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="스터디 / 공모 및 대회" />
        <Tab label="모각코" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <NewPostPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NewPostPagemok />
      </TabPanel>
    </Container>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
          <Typography component="div"> {children}</Typography>
        </Box>
      )}
    </div>
  )
}
