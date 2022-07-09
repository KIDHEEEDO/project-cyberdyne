import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
    padding: 0;  
        margin: 0;
        box-sizing: border-box;
    font-family: Elice Digital Baeum, -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;      
    }
    ul {
        list-style: none;
}
a {
    color: inherit;
    text-decoration: none;
}
`;

export default GlobalStyle;
