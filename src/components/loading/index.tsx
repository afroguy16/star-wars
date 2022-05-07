import { StyledLoadingWrapper } from "./styles";

type Props = {
  text: string
}

const Loading = ({text}: Props) => {
  return (
      <StyledLoadingWrapper>
        <div className="circle">
          <div className="inner"></div>
        </div>
        <div className="text">
          <p>{text}</p>
        </div>
      </StyledLoadingWrapper>
  );
};

export default Loading;
