import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Tabs,
  Tab,
  Box
} from '@mui/material'

import Auth from '../../../hoc/auth'
import Calendar from './Calendar'
import CalendarToggleButton from '../../common/ToggleButton/CalendarToggleButton'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
function CalendarPage() {
  const [value, setValue] = useState(0)
  const [gatheringType, setGatheringType] = useState('mogako'); 

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleGatheringType = data => {
    setGatheringType(data)
  }


  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="전체" {...a11yProps(0)} />
              <Tab label="모집중" {...a11yProps(1)} />
              <Tab label="모집 완료" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <Box sx={{ mt: 2 }}>
            <CalendarToggleButton sendDataToTab={handleGatheringType} />
          </Box>

          {/* 전체 */}
          <CustomTabPanel value={value} index={0}>
            <Calendar
              gatheringType={gatheringType}
              pastDeadline="all"
            />
          </CustomTabPanel>

          {/* 모집중 */}
          <CustomTabPanel value={value} index={1}>
            <Calendar
              gatheringType={gatheringType}
              pastDeadline={false}
            />
          </CustomTabPanel>

          {/* 모집 완료 */}
          <CustomTabPanel value={value} index={2}>
            <Calendar
              gatheringType={gatheringType}
              pastDeadline={true}
            />
          </CustomTabPanel>          
        </Box>
      </Container>
    </div>
  )
}

export default Auth(CalendarPage, true)
