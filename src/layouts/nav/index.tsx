import styled from "styled-components";
import ButtonToggleSwitch from "../../components/button-toggle-switch";

const Layout = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 20px;
  min-height: 70px;
  background-color: ${(props) => props.theme.background};
`;

type Props = {
  onToggleSwitch: () => void;
};

const Nav = ({ onToggleSwitch }: Props) => {
  return (
    <Layout>
      <ButtonToggleSwitch onToggleSwitch={onToggleSwitch} />
    </Layout>
  );
};

export default Nav;
