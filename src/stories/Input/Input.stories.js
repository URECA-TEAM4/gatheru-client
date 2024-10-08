import React from "react";
import Input from  "./Input"

export default {
  title: "form/Input",  // story 이름
  component: Input,
};

export const Small = () => <Input size='small' placeholder='Small' />
export const Medium = () => <Input size='medium' placeholder='Medium' />
export const Large = () => <Input size='large' placeholder='Large' />

// const Template = (
//   args
// ) => <Input {...args} />;
// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   placeholder: "Small"
// };

// export const Medium = Template.bind({});
// Medium.args = {
//   size: "medium",
//   placeholder: "Medium"
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   placeholder: "Large"
// };
