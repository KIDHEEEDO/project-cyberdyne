import IntroStyles from "../../styles/Intro.module.css";
import Button from '@mui/material/Button';

type IntroDataProps = {
    title?: string;
    subtitle?: string;
    text?: string;
    button?: string;
}

const IntroData = ({ title, subtitle, text, button } : IntroDataProps) => {
    return (
        <div className={IntroStyles.intro_data}>
            <div className={IntroStyles.intro_title}>{title}</div>
            <div className={IntroStyles.intro_subtitle}>{subtitle}</div>
            <div className={IntroStyles.intro_text}>{text}</div>
            {
                button ? <Button sx={{ borderColor: "#818479", color: "#818479"}} className={IntroStyles.intro_button} variant="outlined">{button}</Button> : null
            }
        </div>
    )
}

export default IntroData;