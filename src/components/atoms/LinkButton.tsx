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
  transition:
    background 180ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
    color 180ms cubic-bezier(0.22, 1, 0.36, 1);
  outline: none;
  text-decoration: none;

  &:hover {
    background: #fefce8;
    border-color: #facc15;
    color: #0f172a;
  }

  &:focus-visible {
    outline: 3px solid #fde68a;
    outline-offset: 2px;
    border-color: #facc15;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
