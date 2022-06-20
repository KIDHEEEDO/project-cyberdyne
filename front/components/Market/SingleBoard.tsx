import React from "react";
import styled from "styled-components";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SingleBoard = () => {
    return (
        <Container>
            <BoardImage image="/images/piano.png"></BoardImage>
            <TextWrapper>
                <Title>중고피아노 팝니다!</Title>
                <TextArea>
                    거의 새거에요~ 이사하면서 둘 곳이 없어서요! 필요하신 분은
                    댓글 남겨주세요~^^!
                </TextArea>
                <WriteInfo>
                    <p>2022-06-16</p> <p>jaPark</p>
                </WriteInfo>
                <AccordionWrapper>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <AttachTitle>댓글</AttachTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </AccordionWrapper>
            </TextWrapper>
        </Container>
    );
};

export default SingleBoard;

const Container = styled.div`
    width: 40%;
    height: 550px;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const ImgWrapper = styled.div`
    width: 100%;
    height: 45%;
`;

const BoardImage = styled.div<{ image: string }>`
    width: 100%;
    height: 45%;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center center;
`;

const TextWrapper = styled.div`
    height: 55%;
    padding: 5px 15px;
`;

const Title = styled.h4`
    height: 20%;
`;

const TextArea = styled.div`
    height: 30%;
    word-break: keep-all;
`;

const WriteInfo = styled.div`
    height: 10%;
    margin-bottom: 10px;
    font-size: 12px;
    color: var(--deepgray);
    display: flex;
    justify-content: space-between;
`;

const Date = styled.div``;

const AccordionWrapper = styled(Accordion)`
    height: auto;
    padding: 0;
`;

const AttachTitle = styled(Typography)`
    font-family: Elice Digital Baeum;
    font-size: 12px;
    margin: 0;
`;
