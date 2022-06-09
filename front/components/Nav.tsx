import Link from "next/link";
import Image from "next/image";
import titleEarth from "../public/title.earth.png";
import navStyles from "../styles/Nav.module.css";

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">
                        <a>
                            <Image src={titleEarth} alt="title image" />
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className={navStyles.navList}>
                <li>
                    <Link href="/recycling/aiSearcher">분리배출 하러가기</Link>
                </li>
                <li>
                    <Link href="/">우리동네 대형폐기물 신고하기</Link>
                </li>
                <li>
                    <Link href="/">중고마켓</Link>
                </li>
                <li>
                    <Link href="/myPage">마이페이지</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
