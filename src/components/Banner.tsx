import Image from "next/image";
import RightArrow from "../images/right-arrow.svg";
import Link from "next/link";

interface BannerProps {
  title: string;
  desc: string;
  btnText: string;
  image?: string;
  grey?: boolean;
}
const Banner: React.FC<BannerProps> = ({ title, desc, btnText, image, grey }) => {
  return (
    <>
      <section
        className={grey ? "banner-section grey" : "banner-section"}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="container">
          <div className="banner-common">
            <h1 dangerouslySetInnerHTML={{ __html: title ? title : "Title" }} />
            <div className="banner-desc" dangerouslySetInnerHTML={{ __html: desc ? desc : "desc" }} />
            <Link href="/contact-us#contactForm" className="btn-secondary">
              {btnText} <Image src={RightArrow} alt="righ-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
