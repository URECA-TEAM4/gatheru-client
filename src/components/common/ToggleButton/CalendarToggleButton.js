import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    marginRight: 10,
    border: 0,
    borderRadius: 20,
  },
}));

function CalendarToggleButton({ sendDataToTab }) {
  const [gatheringType, setGatheringType] = useState('mogako'); // 초기값을 문자열로 설정

  const handleGatheringType = (event, newGatheringSelection) => {
    if (newGatheringSelection) { // 중복 선택 방지
      sendDataToTab(newGatheringSelection);
      setGatheringType(newGatheringSelection);
    }
  };

  return (
    <StyledToggleButtonGroup
      size="small"
      value={gatheringType}
      onChange={handleGatheringType}
      aria-label="gathering type"
      color="secondary"
      exclusive // 중복 선택 방지
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
  );
}

export default CalendarToggleButton;