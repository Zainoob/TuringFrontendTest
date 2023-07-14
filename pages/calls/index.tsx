import {
 notification
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
} from "./elements";
import image from "../../design-files/TTLogo.png";
import { NextRouter, useRouter } from "next/router";
import CallsList from "@/components/call-list/callList";
const Calls: React.FC = () => {
  const imageSrc:string = image.src;
  const router: NextRouter =useRouter();

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
         Log out
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
