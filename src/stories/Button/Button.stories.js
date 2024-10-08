import React from "react";
import Button from "./Button";

export default {
  title: "form/Button",  // story 이름
  component: Button,
};

export const Primary = () => <Button variant='primary'>Primary</Button>
export const Secondary = () => <Button variant='secondary'>Secondary</Button>
export const Success = () => <Button variant='success'>Success</Button>
export const Danger = () => <Button variant='danger'>Danger</Button>


// V6 이상부터 적용된 args 방식
const Template = (
  args
) => <Button {...args} />;

export const PrimaryA = Template.bind({});
PrimaryA.args = {
  size: "small",
  children: "primary args",
  variant: "primary",
};

// 간단하게 개체를 재사용할 수 있다.
export const LongPrimaryA = Template.bind({});
LongPrimaryA.args = {
  ...PrimaryA.args,
  children: "Long primary args",
};

export const SecondaryA = Template.bind({});
SecondaryA.args = {
  size: "small",
  children: "secondary",
  variant: 'secondary'
};
