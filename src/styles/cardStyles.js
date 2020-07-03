import styled from 'styled-components';

export const StyledCardContainer = styled.div`
  margin: auto;
  max-width: 1400px;
  background-color: #111;
  min-height: 70vh;
  opacity: 90%;
  color: white;
  overflow: auto;
  padding: 20px;
  white-space: pre-wrap;
`;

export const StyledCardName = styled.div`
  font-size: 30px;
  padding-bottom: 20px;
`;

export const StyledCardInformation = styled.div`
  display: flex;
  justify-content: space-around;
  padding-left: 10%;
  padding-right: 10%;
`;

export const StyledCardImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StyledArtImg = styled.img`
  max-width: 345px;
  max-height: 417px;
  width: auto;
`;

export const StyledSpacer = styled.div`
  width: 50%;
`;
