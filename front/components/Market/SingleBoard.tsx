import React, { useContext, useState } from "react";
import { UserStateContext } from "../../pages/_app";
import Comment from "./Comment";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import {
    Typography,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    MobileStepper,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = muiStyled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

// data map 할 예정, 게시글과 댓글 연동은 postId (게시글 번호) 로 연동 !
const SingleBoard = () => {
    const [expanded, setExpanded] = useState(false);
    const userInfo = useContext(UserStateContext);
    const profileImg = userInfo?.user?.picture ?? "";
    const nickname = userInfo?.user?.nickname ?? "";
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = 5; // 자료의 길이로 설정 에정

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Card sx={{ maxWidth: "auto" }}>
            {/* {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null} */}
            <CardMedia
                component="img"
                height="250"
                image="/images/piano.png"
                alt="market-img"
            />
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    중고피아노 팝니다!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    거의 새거에요~ 이사하면서 둘 곳이 없어서요! 필요하신 분은
                    댓글 남겨주세요~^^!
                </Typography>
            </CardContent>
            <CardHeader
                avatar={<Avatar alt="userProfile" src={profileImg} />}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={nickname}
                subheader="September 14, 2016"
            />
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    댓글
                </Typography>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Comment expand={expanded} />
                </CardContent>
            </Collapse>
        </Card>
    );
};
export default SingleBoard;
// const SingleBoard = () => {
//     return (
//         <Container>
//             <BoardImage image="/images/piano.png"></BoardImage>
//             <TextWrapper>
//                 <Title>중고피아노 팝니다!</Title>
//                 <TextArea>
//                     거의 새거에요~ 이사하면서 둘 곳이 없어서요! 필요하신 분은
//                     댓글 남겨주세요~^^!
//                 </TextArea>
//                 <WriteInfo>
//                     <p>2022-06-16</p> <p>jaPark</p>
//                 </WriteInfo>
//                 <AccordionWrapper>
//                     <AccordionSummary
//                         // expandIcon={<ExpandMoreIcon />}
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                     >
//                         <AttachTitle>댓글</AttachTitle>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <Typography>
//                             Lorem ipsum dolor sit amet, consectetur adipiscing
//                             elit. Suspendisse malesuada lacus ex, sit amet
//                             blandit leo lobortis eget.
//                         </Typography>
//                     </AccordionDetails>
//                 </AccordionWrapper>
//             </TextWrapper>
//         </Container>
//     );
// };

// export default SingleBoard;

// const Container = styled.div`
//     width: 40%;
//     height: 550px;
//     background-color: white;
//     display: flex;
//     flex-direction: column;
// `;

// const ImgWrapper = styled.div`
//     width: 100%;
//     height: 45%;
// `;

// const BoardImage = styled.div<{ image: string }>`
//     width: 100%;
//     height: 45%;
//     background-image: url(${(props) => props.image});
//     background-size: cover;
//     background-position: center center;
// `;

// const TextWrapper = styled.div`
//     height: 55%;
//     padding: 5px 15px;
// `;

// const Title = styled.h4`
//     height: 20%;
// `;

// const TextArea = styled.div`
//     height: 30%;
//     word-break: keep-all;
// `;

// const WriteInfo = styled.div`
//     height: 10%;
//     margin-bottom: 10px;
//     font-size: 12px;
//     color: var(--deepgray);
//     display: flex;
//     justify-content: space-between;
// `;

// const Date = styled.div``;

// const AccordionWrapper = styled(Accordion)`
//     height: auto;
//     padding: 0;
// `;

// const AttachTitle = styled(Typography)`
//     font-family: Elice Digital Baeum;
//     font-size: 12px;
//     margin: 0;
// `;
