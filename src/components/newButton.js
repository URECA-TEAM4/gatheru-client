// src/components/newButton.js
import styled from "styled-components";

function NewButton({ label, size, onClick }) {
    return (
        <NewButtonStyle size={size} onClick={onClick}>
            <p>{label}</p>
        </NewButtonStyle>
    );
}

const NewButtonStyle = styled.div`
    background-color: red;
    color: whitesmoke;
    width: ${(props) => (props.size === "small" ? "75px" : "200px")};
    height: ${(props) => (props.size === "small" ? "75px" : "200px")};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default NewButton;