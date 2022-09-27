import Posts from './components/Posts/Posts';
import styled from 'styled-components'

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`

function App() {
  return (
    <AppWrapper>
      <Posts />
    </AppWrapper>
  );
}

export default App;
