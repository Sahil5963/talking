import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{

    font-family: Arial, Helvetica, sans-serif;
}
.svgIcon{
    height: 24px;
    aspect-ratio: 1;
}

.talking {
  --primary: #1e90ff;
  --white: #ffffff;
  --contentMargin:16px;
}

`;
