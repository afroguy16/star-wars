import { StyledLoadingParagraph } from "./styles";

type Props = {
  text: string
}

const Loading = ({text}: Props) => {
  return (
      <StyledLoadingParagraph>
        {text}
      </StyledLoadingParagraph>
  );
};

export default Loading;
