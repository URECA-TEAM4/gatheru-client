import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import 'react-tabs/style/react-tabs.css';
import RegisterPage from '../../views/NewPostPage/NewPost'; // 기존 RegisterPage.js
import RegisterPagemok from '../../views/NewPostPage/NewPost_mok'; // 기존 RegisterPage_mok.js

export default function RegisterTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '800px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        등록 페이지
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          borderBottom: '1px solid #ddd',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
          '& .MuiTab-root': {
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#f1f1f1',
            border: '1px solid #ddd',
            borderRadius: '4px 4px 0 0',
            marginRight: '5px',
            '&.Mui-selected': {
              backgroundColor: '#e0e0e0',
              fontWeight: 'bold',
            },
          },
        }}
      >
        <Tab label="스터디/공모 및 대회" />
        <Tab label="모각코" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <RegisterPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterPagemok />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '0 0 4px 4px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
