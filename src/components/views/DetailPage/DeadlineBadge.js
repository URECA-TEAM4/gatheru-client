import React from 'react'
import { Box } from '@mui/material'
import { secondary_color } from '../../constants/colors'

function DeadlineBadge(props) {
  return (
    <>
      {props.pastDeadline ? (
        <Box
          sx={{
            borderRadius: 5,
            bgcolor: '#EADDFF',
            color: 'gray',
            fontWeight: 'bold',
            height: '30px',
            width: 'fit-content',
            py: 0.5,
            px: 1.3,
          }}
        >
          모집 마감
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: 5,
            bgcolor: secondary_color,
            color: 'white',
            fontWeight: 'bold',
            height: '30px',
            width: 'fit-content',
            py: 0.5,
            px: 1.3,
          }}
        >
          모집중
        </Box>
      )}
    </>
  )
}

export default DeadlineBadge
