import styled from 'styled-components';

export const Container = styled.div`
  width: 95vw;
  margin: auto;
  background-color: black;

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
