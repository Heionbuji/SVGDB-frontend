import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html, body, #root {
  min-height: 100vh;
}
body {
  background-color: #e6e6e6;
  background-image: url(${process.env.REACT_APP_ASSETS_URL}/bg/ceres.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center 20%;
}
.nav {
  background-color: black;
  color: white;
}
.title {
  margin: 0;
  padding: 20px;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export const StyledDiv = styled.div`
text-align: center;
& > .spaced {
  margin-left: 10px;
  margin-right: 10px;
}
& > .disabled {
  text-decoration: line-through;
}
`;

export const StyledContentDiv = styled.div`
  margin: auto;
  max-width: 1400px;
  background-color: rgb(11,11,11,0.95);
  text-align: center;
  min-height: 85vh;
  color: white;
`;

export const StyledAutosuggest = styled.div`
  display: inline;

  .react-autosuggest__container {
    position: relative;
    display: inline-block;
    height: 100%;
    color: black;
  }
  
  .react-autosuggest__input {
    width: 240px;
    height: 30px;
    padding: 10px 20px;
    margin-bottom: 5px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }
  
  .react-autosuggest__input--focused {
    outline: none;
  }
  
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .react-autosuggest__suggestions-container {
    display: none;
  }
  
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 51px;
    width: 280px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 400px;
    overflow-y: auto;
  }
  
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }
  
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`;
