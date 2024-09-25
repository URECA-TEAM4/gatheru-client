import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Done } from '@mui/icons-material'
import { secondary_color } from '../../constants/colors'

function JoinMogakoButton(props) {
  const [applied, setApplied] = useState(false)

  const handleJoinMogako = () => {
    setApplied(true)
  }

  return (
    <>
      {!props.userIsWriter && !applied && (
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: secondary_color,
            fontWeight: 700,
          }}
          onClick={() => {
            handleJoinMogako()
          }}
        >
          신청하기
        </Button>
      )}
      {!props.userIsWriter && applied && (
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            borderColor: secondary_color,
            color: secondary_color,
          }}
          endIcon={<Done />}
          onClick={() => {
            setApplied(false)
          }}
        >
          신청완료
        </Button>
      )}
    </>
  )
}

export default JoinMogakoButton
