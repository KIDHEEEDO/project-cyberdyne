import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { styled as materialStyled } from '@mui/material/styles';
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { LoginState } from "../../states/atoms";
import { toast } from "react-toastify";

type IntroDataProps = {
    title?: string;
    subtitle?: string;
    text: string;
    hasButton?: string;
    href?: string;
}

const IntroData = ({ title, subtitle, text, hasButton, href } : IntroDataProps) => {
    const [login, setLogin] = useRecoilState(LoginState);
    const abled = ((href === "/quiz" || href === "/myPage") && !login) ? true : false;

    const router = useRouter()
    const handleClick = () => {
        if (abled) {
            return toast.info("로그인이 필요한 서비스입니다.");
        }
        router.push(href)
    }

    return (
        <Wrapper>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
            <Contents>{text}</Contents>
            {
                hasButton && 
                    <NavButton
                        sx={{ borderColor: "#818479", color: "#818479"}}
                        variant="outlined"
                        onClick={handleClick}
                        // disabled={abled}
                    >
                        {hasButton}
                    </NavButton>
            }
        </Wrapper>
    )
}

export default IntroData;


const Wrapper = styled.div`
    max-width: 350px;
    width: 80%;
    max-height: 270px;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    white-space: pre-wrap;
    margin: 0 50px;
    overflow: hidden;
    animation: fadein 0.6s ease-in-out;
    @keyframes fadein{
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: none;
        }
    }
    @media screen and (max-width: 1224px) {
        max-width: 300px;
        width: auto;
        margin: 20px;
        text-align: center;
        align-items: center;
    };
`;

const Title = styled.div`
    font-size: var(--font-title);
    font-weight: bold;
`;

const SubTitle = styled.div`
    font-size: var(--font-subtitle);
    font-weight: bold;
`;

const Contents = styled.p`
    font-size: var(--font-text);
`;

const NavButton = materialStyled(Button)(
    () => (
        {
            width: '145px',
            height: '50px',
            borderRadius: '10px',
            backgroundColor: 'var(--gray)',
            color: 'black',
            fontSize: '0.8rem',
            '&:hover': {
                backgroundColor: 'var(--deepgray)',
                border: 'none',

            }
        }
    ));