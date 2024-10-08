import React from "react";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";
import { secondary_color } from "../../components/constants/colors";

export default {
  title: "Material/Button",
  component: Button,
  argTypes: {
    variant: {control: 'text'},
    children: {control: 'text'},
    backgroundColor: { control: 'color' }, 
    borderRadius: { control: 'number' },  
    fontWeight: { control: 'number' },       
    borderColor: { control: 'color' },    
    color: { control: 'color' },             
    endIcon: { control: 'boolean' },  
    
    onClick: { action: "clicked"}
  }
};

const Template = args => <Button {...args} />;

export const Enroll = Template.bind({})
Enroll.args = {
    variant: "contained",
    children: "신청하기",
    sx: {
        borderRadius: 2,
        backgroundColor: secondary_color, 
        fontWeight: 700,
      },
}
// export const Enroll = () => (
//   <Button
//     variant="contained"
//     sx={{
//       borderRadius: 2,
//       backgroundColor: secondary_color,
//       fontWeight: 700,
//     }}
//   >
//     신청하기
//   </Button>
// );
export const UnEnroll = Template.bind({})
UnEnroll.args = {
    variant: "outlined",
    children: "신청완료",
    sx: {
        borderRadius: 2,
        borderColor: secondary_color,
        color: secondary_color,
        fontWeight: 700,
      },
    endIcon: <Done />,
}
