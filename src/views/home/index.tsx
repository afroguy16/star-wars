import styled from "styled-components";

const View = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.background}
`;

const Home = () => {
  return (
    <View>
      Hello home
    </View>
  );
};

export default Home;
