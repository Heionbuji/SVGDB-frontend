import styled from 'styled-components';

export const StyledCardContainer = styled.div`
  margin: auto;
  max-width: 1400px;
  background-color: rgb(11,11,11,0.95);
  min-height: 70vh;
  color: white;
  overflow: auto;
  padding: 20px;
  white-space: pre-wrap;
  @media(orientation: portrait) {
    padding: 5px;
  }
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
  @media(max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const StyledCardImageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media(orientation: portrait) {
    flex-direction: column;
  }
`;

export const StyledArtImg = styled.img`
  max-width: 345px;
  max-height: 417px;
  width: auto;
`;

export const StyledButton = styled.button`
  margin: 5px;
  color: white;
  padding: 20px;
  border: 0;
  background-color: rgb(31, 52, 71);
  outline: none;
  cursor: pointer;
`;

export const TokenText = styled.span`
  max-width: 200px;
  max-height: 230px;
  min-height: 230px;
  min-width: 200px;
  overflow: hidden;
  @media(orientation: portrait) {
    min-height: 0px;
  }
`;

export const StyledLeaderImg = styled.img`
  max-width: 512px;
  @media(orientation: portrait) {
    max-width: 40vw;
  }
`;

export const Reactivetd = styled.td`
  @media(orientation: portrait) {
    display: block;
  }
`;

export const EmptyHeader = styled.th`
  @media(orientation: portrait) {
    display: none;
  }
`;

export const ReactiveRow = styled.tr`
  @media(orientation: portrait) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledTokenInfo = styled.div`
  display: flex;
  @media(orientation: portrait) {
    flex-direction: column;
  }
`;
