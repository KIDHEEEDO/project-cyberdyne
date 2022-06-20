import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/logo.png";

const Footer = () => {
    return (
        <FooterWrapper>
            <LogoWrapper>
                <Image src={Logo} alt="logo" width={30} height={30} />
                <Title>구해줘! 지구</Title>
                <span>Copyright @ Cyberdyne 2022</span>
            </LogoWrapper>
            <LogoWrapper>
                <Title>내 손안의 분리배출 작은 실천이 지구를 살립니다.</Title>
                <span>구해줘! 지구의 서비스를 알고 싶어요</span>
                <Link href="/" passHref>
                    <LinkText>About Us</LinkText>
                </Link>
            </LogoWrapper>
            <TextWrapper>
                <LinkWrapper>
                    <LinkText>Recyle</LinkText>

                    <span>· Ai-Searcher</span>
                    <span>· Recycle-Info</span>
                </LinkWrapper>
                <LinkWrapper>
                    <LinkText>Big-Trash</LinkText>
                    <span>· Map-Searcher</span>
                </LinkWrapper>
                <LinkWrapper>
                    <LinkText>Market</LinkText>

                    <span>· Recycle-Market</span>
                </LinkWrapper>
                <LinkWrapper>
                    <LinkText>Quiz/Game</LinkText>
                    <span>· Recycle-Quiz</span>
                    <span>· Recycle-Game</span>
                </LinkWrapper>
            </TextWrapper>
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 2fr 2fr;
    height: 200px;
    padding: 10px 0;
    color: #c4c4c4;
    font-size: 11px;
    width: 100%;
`;

const LogoWrapper = styled.div`
    border-right: 1px dashed #c4c4c4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.span`
    font-size: 15px;
    margin-bottom: 5px;
    color: #a7c4bc;
`;

const LinkText = styled.a`
    text-decoration: underline;
    margin: 20px 0;
    font-size: 15px;
    font-weight: bold;
`;
const TextWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
