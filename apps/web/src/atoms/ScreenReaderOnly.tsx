import { styled } from 'goober'

export const ScreenReaderOnly = styled('span')<{ focusable?: boolean }>`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  ${({ focusable }) =>
    focusable &&
    `
    &:focus-within {
      top: 0.75rem;
      left: 0.75rem;
      z-index: 300;
      width: auto;
      height: auto;
      padding: 0.6rem 1rem;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
      border-radius: var(--radius);
      background: var(--color-bg-surface);
      box-shadow: var(--shadow-elevated);
    }
  `}
`
