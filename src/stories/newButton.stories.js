// src/components/newButton.stories.js
import NewButton from "../components/newButton";

export default {
    title: "Components/NewButton", // story 이름
    component: NewButton,
} // as ComponentMeta<typeof NewButton>; // TypeScript 타입 제거

const Template = (args) => ( // ComponentStory<typeof NewButton> 제거
    <NewButton {...args} />
);

export const Small = Template.bind({});
Small.args = {
    size: "small",
    label: "small",
}; // Small의 props 지정

export const Large = Template.bind({});
Large.args = {
    size: "large",
    label: "large",
}; // Large의 props 지정