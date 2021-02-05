/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.div`
  width: 95vw;
  margin: auto;
  background-color: #222;

  color: #f1f1f1;

  .cardhover:hover img {
    filter: drop-shadow(0 0 7px cyan);
  }
  .cardhover img {
    transition: filter .1s;
  }
  .cardhover:hover img {
    cursor: pointer;
  }

  .loghover:hover {
    filter: drop-shadow(0 0 7px cyan);
  }
  .loghover {
    transition: filter .1s;
  }
  .loghover:hover {
    cursor: pointer;
  }
  .neutralFilter {
    margin: 5px;
    align-self: center;

    @media screen and (max-width: 640px) {
      align-self: start;
    }
  }

  @media screen and (max-width: 640px) {
    width: 100vw;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  background-color: rgba(15, 20, 25, 0.98);
  padding: 5px;
  color: #ddd;
  max-width: 300px;
  pointer-events: none;
`;

export const Divider = styled.div`
  height: 2px;
  margin: 5px 0;
  background: white;
`;

export const FilterContainer = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-content: center;
  max-width: ${(props) => (props.long ? '17%' : '14%')};
  border-left: 2px solid black;
  border-right: 2px solid black;
  background-color: ${(props) => (
    props.active && !props.reverse
      ? 'rgb(31, 90, 52)'
      : props.active && props.reverse ? 'rgb(90, 30, 30)' : 'inherit'
  )};

  @media screen and (max-width: 640px) {
    flex-direction: row;
    max-width: 100%;
    border: 0;
    height: auto;
    padding: 5px 0;
  }
`;

export const TopBar = styled.div`
  background-color: rgb(31, 52, 75);
  color: #f2f2f2;
  height: 10vh;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

export const StyledButton = styled.button`
  margin: 5px;
  color: white;
  padding: 5px;
  border: 2px solid rgb(5, 10, 15);
  background-color: rgb(16, 37, 56);
  outline: none;
  cursor: pointer;
  @media screen and (max-height: 800px) {
    margin: 1px;
    padding: 1px;
    max-height: 50px;
  }
`;

export const ResetButton = styled.button`
  margin: 5px;
  color: white;
  padding: 5px;
  border: 2px solid rgb(5, 10, 15);
  background-color: #603030;
  outline: none;
  cursor: pointer;
`;

export const StyledPortrait = styled.img`
  margin: 5px;
  max-width: 100px;
  max-height: 100px;
  cursor: ${(props) => (props.noPointer ? 'inherit' : 'pointer')};

  @media screen and (max-width: 640px) {
    margin: 3px;
    max-width: 75px;
    max-height: 75px;
  }
`;

export const InfoBubble = styled.span`
  margin: 3px;
  padding: 5px 14px;
  background-color: rgb(16, 37, 56);
  border-radius: 50%;
  user-select: none;
  font-weight: bold;
`;

export const StyledFilterSelectors = styled.span`
  min-height: 20%;
  margin-top: 5px;
  display: flex;
  @media screen and (max-aspect-ratio: 4/3) {
    flex-direction: column;
  }
`;
export const ForegroundDiv = styled.div`
  position: relative;
  background-color: #222;
  z-index: 100;
  width: 30vw;
  margin: auto;
  top: 15vh;
  padding: 30px;
  @media screen and (max-aspect-ratio: 4/3) {
    top: 5vh;
    width: 60vw;
  }
`;

export const StyledTextInput = styled.input`
  height: 1.5rem;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.3rem')};
  ${(props) => (props.width && `width: ${props.width};`)}
`;

export const ActionButtonContainer = styled.div`
  margin-top: 10px;
  left: 90%;
`;

export const ActionButton = styled.button`
  margin: 5px 5px 0 0;
  color: white;
  padding: 10px;
  border: 2px solid rgb(5, 10, 15);
  background-color: rgb(16, 37, 56);
  outline: none;
  cursor: pointer;
  font-size: 1rem;
`;

export const StyledList = styled.ul`
  background-color: #111;
  max-height: 300px;
  overflow: auto;
  padding-left: 0;
`;

export const StyledListItem = styled.li`
  list-style: none;
  padding: 15px 10px;
  display: flex;
  :hover {
    background-color: #333;
  }
  background-color: ${(props) => (props.selected ? 'rgb(31, 52, 71)' : 'inherit')};
`;

export const SmallPortrait = styled.img`
  margin: 10px;
  max-width: 50px;
  max-height: 50px;
  vertical-align: middle;
`;

export const DeleteButton = styled.button`
  align-self: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  margin: 0;
  border: 0;
  width: 40px;
  text-align: center;
  background-color: rgb(90, 30, 30);
  cursor: pointer;
`;

export const MobilePopup = styled.div`
  position: relative;
  background-color: #222;
  z-index: 100;
  width: 100%;
  margin: auto;
  top: 0;
  height: 100vh;
  padding: 10px;

  .bigcheckbox {
    height: 25px;
    width: 25px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 1px solid #34495E;
    border-radius: 4px;
    outline: none;
    transition-duration: 0.2s;
    background-color: #fff;
    cursor: pointer;
  }

  .bigcheckbox:checked {
    background-color: #41B883;
  }

  .bigcheckbox::after {
    content: '✓';
    display: inline-block;
    opacity: 0%;
    font-size: 1.1em;
    margin: auto;
  }

  .bigcheckbox:checked::after {
    opacity: 100%;
    position: relative;
    left: 25%;
  }

  .bigcheckbox + label {
    vertical-align: middle;
  }

`;
