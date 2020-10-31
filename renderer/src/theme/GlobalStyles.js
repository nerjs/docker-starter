import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        background-color: white;
        color: black;
        font-family: monospace;
    }
`

export default GlobalStyles
