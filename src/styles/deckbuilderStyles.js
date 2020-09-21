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
  line-height: 5vh;
  border-left: 2px solid black;
  border-right: 2px solid black;
  background-color: ${(props) => (
    props.active && !props.reverse
      ? 'rgb(31, 90, 52)'
      : props.active && props.reverse ? 'rgb(90, 30, 30)' : 'inherit'
  )};
  @media screen and (max-aspect-ratio: 4/3) {
    line-height: normal;
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
`;

export const StyledPortrait = styled.img`
  margin: 5px;
  max-width: 100px;
  max-height: 100px;
  cursor: ${(props) => (props.noPointer ? 'inherit' : 'pointer')};
`;

export const InfoBubble = styled.span`
  margin: 3px;
  padding: 5px 14px;
  background-color: rgb(16, 37, 56);
  border-radius: 50%;
  user-select: none;
  font-weight: bold;
`;
