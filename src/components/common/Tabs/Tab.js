import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Tabs,
  Tab,
  Box,
  MenuItem,
  FormControl,
  Select,
  Stack,
} from '@mui/material'
import GatherToggleButton from '../ToggleButton/GatherToggleButton'

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const [sorting, setSorting] = React.useState('최신순')

  const handleSortingChange = e => {
    setSorting(e.target.value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <GatherToggleButton />
        <Button
          sx={{
            color: 'white',
            backgroundColor: '#38406B',
            borderRadius: 3,
          }}
        >
          글 쓰기
        </Button>
      </Box>
      <Stack direction="row" justifyContent="end" sx={{ mt: 1 }}>
        {' '}
        <FormControl size="small">
          <Select
            id="sorting"
            value={sorting}
            onChange={handleChange}
            sx={{ borderRadius: 3, fontSize: 15 }}
          >
            <MenuItem value="최신순">최신순</MenuItem>
            <MenuItem value="등록순">등록순</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
      <CustomTabPanel value={value} index={1}></CustomTabPanel>
      <CustomTabPanel value={value} index={2}></CustomTabPanel>
    </Box>
  )
}
