import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import { Flex } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Linkedin from '../images/linkedin-square-icon.svg';

const Mentors = ({content, mentors, grey, successStrory} :  any) => {
    return (
        <>
            <section className={`industry-mentor ${grey ? 'grey' : ''}`}>
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: content?.heading }} />
                        <p>{content?.subHeading}</p>
                    </div>
                    {
                        mentors && mentors.length > 0 && 
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: true,
                            }}
                            className="videosSwiper mentor-slider"
                            spaceBetween={20}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1200: {
                                    slidesPerView: 2.2,
                                },
                            }}
                            pagination={{
                                clickable: true,
                            }}
                        >
                            {mentors?.map((mentor: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <Flex className={successStrory ? "mentor--card success" : 'mentor--card'}>
                                        {/* {mentor} */}
                                        {mentor.featuredImage.node.mediaItemUrl &&
                                            <Image className="mentor--card--image" width={235} height={297} src={mentor.featuredImage.node.mediaItemUrl} alt={mentor.featuredImage.node.altText} title={mentor.featuredImage.node.title} />
                                        }
                                        <div className="mentor--card--content">
                                            <div className="mentor--card--info" dangerouslySetInnerHTML={{ __html: mentor.content }} />
                                            <Flex className="mentor--card--details">
                                                <div>
                                                    <p>{mentor.title}</p>
                                                    <p>{mentor.extraDetailFields.companyName}</p>
                                                </div>
                                                {
                                                    !successStrory &&
                                                    <Image width={27} height={27} src={Linkedin} alt="linkedin" />
                                                }
                                            </Flex>
                                        </div>
                                    </Flex>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
            </section>
        </>
    );
};

export default Mentors;