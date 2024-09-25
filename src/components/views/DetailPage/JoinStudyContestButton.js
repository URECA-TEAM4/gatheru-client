import React from 'react'
import {
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { secondary_color } from '../../constants/colors'

function JoinStudyContestButton(props) {
  const handleJoinStudyContest = () => {}

  return (
    <>
      <Accordion
        sx={{
          backgroundColor: '#FFF1F9',
          color: secondary_color,
          boxShadow: 'none',
          '&::before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: secondary_color }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>신청하기</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            autoFocus
            multiline
            id="outlined-textarea"
            label="신청서 작성"
            minRows={4}
            color="secondary"
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              backgroundColor: secondary_color,
              fontWeight: 700,
              float: 'right',
              my: 3,
            }}
            onClick={() => {
              handleJoinStudyContest()
            }}
          >
            완료
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default JoinStudyContestButton
