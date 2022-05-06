import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
`;

type Props = {
  onToggleSwitch: () => void;
};

const Nav = ({ onToggleSwitch }: Props) => {
  return (
    <Layout>
      <button onClick={onToggleSwitch}>Click</button>
    </Layout>
  );
};

export default Nav;
