import { styled } from 'goober'
export const LinkButton = styled('a')`
  position: relative;
  width: 100%;
  display: inline-block;
  text-align: center;
  padding: 0.85rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #334155;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  outline: none;
  text-decoration: none;

  &:hover {
    background: #fff8e1;
    border-color: #facc15;
    color: #0f172a;
  }

  &:focus-visible {
    outline: 2px solid #facc15;
    outline-offset: 2px;
  }
`
