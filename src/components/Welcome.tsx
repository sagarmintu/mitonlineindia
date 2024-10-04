import React from "react";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Image from "next/image";
import Stats from "@/components/Stats";

const Welcome = ({content}: any) => {
    return (
        <>
            <section className="welcome">
                <Stats />
                <div className="container">
                    <Flex className="welcome-row">
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: content?.leftContent }} />
                            {
                                content?.leftContent &&
                                <a className="btn btn-primary" href={'/contact-us#contactForm'} target={content?.buttonLink?.target}>{content?.buttonLink?.title} <Image src={RightArrow} alt="righ-arrow" /> </a>
                            }
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: content?.rightContent }} />
                        <a className="btn btn-primary hide" href={content?.buttonLink?.url} target={content?.buttonLink?.target}>{content?.buttonLink?.title} <Image src={RightArrow} alt="righ-arrow" /> </a>
                    </Flex>
                </div>
            </section>
        </>
    );
};

export default Welcome;