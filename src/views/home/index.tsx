import styled from "styled-components";

const View = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const Home = () => {
  return (
    <View>
      Hello home
    </View>
  );
};

export default Home;
