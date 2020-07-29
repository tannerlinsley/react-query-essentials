import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  height: 96vh;
`

export const SidebarStyles = styled.div`
  width: 175px;
  border-right: 1px solid black;
  padding: 1rem;
`

export const Main = styled.div`
  flex: 1;
  padding: 1rem;
`

export const PostStyles = styled.div`
  display: inline-block;
  border: solid 1px gray;
  padding: 1rem;
  color: inherit;

  :hover {
    text-decoration: none;
    h3 {
      text-decoration: underline;
    }
  }
`
