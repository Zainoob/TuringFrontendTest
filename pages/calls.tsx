import {
  Typography,notification
} from "antd";
import {
  NavBar,
  StyledButton,
  ContentContainer,
  Container,
  ImageContainer,
  Image,
  HeadingWrapper,
  Heading,
} from "@/styles/calls.styled";
import image from "../design-files/TTLogo.png";
import { useRouter } from "next/router";
import CallsList from "@/components/callList";
const Calls: React.FC = () => {
  const imageSrc = image.src;
  const router =useRouter();

  //when user clicks log out
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    notification.success({
      message: "Logged out",
      duration: 2, // Duration in seconds for pop up
    });
    router.push("/");
  };

  return (
    <Container>
      <NavBar>
        <ImageContainer>
          <Image src={imageSrc} alt="Turing Tech Logo" />
        </ImageContainer>
        <StyledButton type="primary" onClick={handleLogout}>
          <Typography.Text type="secondary">Log out</Typography.Text>
        </StyledButton>
      </NavBar>
      <ContentContainer>
        <HeadingWrapper>
          <Heading level={5}>Turing Technologies Frontend Test</Heading>
        </HeadingWrapper>
        <CallsList/>
      </ContentContainer>
    </Container>
  );
};

export default Calls;
