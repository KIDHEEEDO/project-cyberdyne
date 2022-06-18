import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { styled as materialStyled } from '@mui/material/styles';
import styled from "styled-components";

type IntroDataProps = {
    title?: string;
    subtitle?: string;
    text: string;
    hasButton?: string;
    href?: string;
}

const IntroData = ({ title, subtitle, text, hasButton, href } : IntroDataProps) => {
    const router = useRouter()
    const handleClick = () => {
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
                    >
                        {hasButton}
                    </NavButton>
            }
        </Wrapper>
    )
}

export default IntroData;


const Wrapper = styled.div`
    width: 370px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    white-space: pre-wrap;
    margin: 0 50px;
`;

const Title = styled.div`
    font-size: var(--font-title);
    font-weight: bold;
`;

const SubTitle = styled.div`
    font-size: var(--font-subtitle);
`;

const Contents = styled.p`
    font-size: var(--font-text);
`;

const NavButton = materialStyled(Button)(
    () => (
        {
            width: '200px',
            height: '100px',
            marginTop: '50px',
            borderRadius: '10px',
            backgroundColor: 'var(--gray)',
            color: 'black',
            '&:hover': {
                backgroundColor: 'var(--deepgray)',
                color: 'white',
                border: 'none',
            }
        }
    ));
    
