import React from "react";
import Button from "./Button";

export default {
  title: "Button",  // story 이름
  component: Button,
};

// export const Primary = () => <Button variant='primary'>Primary</Button>
// export const Secondary = () => <Button variant='secondary'>Secondary</Button>
// export const Success = () => <Button variant='success'>Success</Button>
// export const Danger = () => <Button variant='danger'>Danger</Button>

const Template = (
  args
) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  size: "small",
  label: "primary",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: "small",
  label: "secondary",
  variant: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  size: "small",
  label: "success",
  variant: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
  size: "small",
  label: "danger",
  variant: "danger"
};

