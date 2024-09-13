import * as React from 'react'
import { styled } from '@mui/material/styles'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    marginRight: 10,
    border: 0,
    borderRadius: 20,
  },
}))

function GatherToggleButton() {
  const [gatheringType, setGatheringType] = React.useState(() => ['mogako'])

  const handleGatheringType = (event, newGatheringSelection) => {
    if (newGatheringSelection.length) {
      setGatheringType(newGatheringSelection)
    }
  }

  return (
    <StyledToggleButtonGroup
      size="small"
      value={gatheringType}
      onChange={handleGatheringType}
      aria-label="gathering type"
      color="secondary"
    >
      <ToggleButton value="mogako" aria-label="mogako">
        모각코
      </ToggleButton>
      <ToggleButton value="study" aria-label="study">
        스터디
      </ToggleButton>
      <ToggleButton value="contest" aria-label="contest">
        공모 및 대회
      </ToggleButton>
    </StyledToggleButtonGroup>
  )
}

export default GatherToggleButton
