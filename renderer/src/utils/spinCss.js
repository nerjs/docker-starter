const { keyframes, css } = require('styled-components')

export const spin = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

export default (duration = '1s', timingFunction = 'linear', delay = '0s', iterationCount = 'infinite') => css`
  animation: ${spin} ${duration} ${timingFunction} ${delay} ${iterationCount};
`
