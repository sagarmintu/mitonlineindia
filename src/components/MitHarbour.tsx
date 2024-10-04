import React from "react";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Image from "next/image";


const MitHarbour = ({content} : any) => {
    // const [activeTab, setActivetab] = useState(1)
    return (
        <>
            <section className="harbour">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: content?.heading }} />
                        <p>{content?.subHeading}</p>
                    </div>
                    <Flex className="harbour-row">
                        <div className="harbour-row--card" dangerouslySetInnerHTML={{ __html: content?.box1 }} />
                        <div className="harbour-row--card" dangerouslySetInnerHTML={{ __html: content?.box2 }} />
                    </Flex>
                    <Flex justify="center">
                        <a href={content?.button?.url} target={content?.button?.target} className="btn btn-primary">{content?.button?.title}<Image src={RightArrow} alt="righ-arrow" /></a>
                    </Flex>
                </div>
            </section>
        </>
    );
};

export default MitHarbour;