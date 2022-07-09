import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import footerLogo from "../public/images/footer.logo.png";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    return (
        <FooterWrapper>
            <LogoWrapper>
                <Image src={footerLogo} alt="logo" width={50} height={50} />
                <span>Copyright @ Cyberdyne 2022</span>
            </LogoWrapper>
            <LinkWrapper>
                <Link href="/" passHref>
                    <LinkText>About Cyberdyne</LinkText>
                </Link>
                <PositionWrapper>
                    <PositionSubWrapper>
                        <span>FrontEnd</span>
                        <span>· 안민영</span>
                        <span>· 박진아</span>
                    </PositionSubWrapper>
                    <PositionSubWrapper>
                        <span>BackEnd</span>
                        <span>· 신도희</span>
                        <span>· 이하은</span>
                    </PositionSubWrapper>
                    <PositionSubWrapper>
                        <span>AI</span>
                        <span>· 김성훈</span>
                        <span>· 윤성준</span>
                    </PositionSubWrapper>
                </PositionWrapper>
            </LinkWrapper>
            {!isMobile && (
                <TextWrapper>
                    <LinkWrapper>
                        <Link href="/recycling" passHref>
                            <LinkText>Recyle</LinkText>
                        </Link>
                        <span>· Ai-Searcher</span>
                        <span>· Recycle-Info</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Link href="/waste" passHref>
                            <LinkText>Big-Trash</LinkText>
                        </Link>
                        <span>· Map-Searcher</span>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Link href="/market" passHref>
                            <LinkText>Market</LinkText>
                        </Link>
                        <span>· Recycle-Market</span>
                    </LinkWrapper>
                </TextWrapper>
            )}
        </FooterWrapper>
    );
};

export default Footer;

const FooterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 2fr 2fr;
    height: 100px;
    padding: 10px 0;
    color: #c4c4c4;
    font-size: 11px;
    width: 100%;
    @media screen and (max-width: 1224px) {
        grid-template-columns: 0.4fr 0.6fr;
    } ;
`;

const LogoWrapper = styled.div`
    border-right: 1px dashed #c4c4c4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    text-align: center;
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
    border-left: 1px dashed #c4c4c4;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PositionWrapper = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
    padding: 10px 0;
`;

const PositionSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
