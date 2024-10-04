import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import Image from "next/image";
import { Flex } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const Placement = ({content} : any) => {
    const [placements, setPlacements] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try { const { data } = await client.query({query: gql`
            query GetPlacements {
                placements {
                    edges {
                      node {
                        content
                        featuredImage {
                          node {
                            altText
                            mediaItemUrl
                            slug
                            uri
                          }
                        }
                        title
                        placementFields {
                          courseOrDegree
                          salaryInLpa
                          placedInCompanyLogo {
                            node {
                              altText
                              mediaItemUrl
                              title
                              uri
                            }
                          }
                        }
                      }
                    }
                }
              }
          `,});
            if (
                    data &&
                    data.placements &&
                    data.placements.edges &&
                    data.placements.edges.length > 0
                ) {
                    const placementData = data.placements.edges.map((edge: any) => edge.node);
                    setPlacements(placementData);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <section className="top-placement">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: content?.heading }} />
                        <p>{content?.subHeading}</p>
                    </div>
                    {
                        placements && placements.length > 0 && 
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: true,
                            }}
                            className="videosSwiper"
                            spaceBetween={20}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1200: {
                                    slidesPerView: 3,
                                },
                                
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            centeredSlides={true}
                        >
                            {placements.map((placement: any, index: number) => (
                                <SwiperSlide key={index} className="placement-slide">
                                    <div className="placement-card">
                                        <div className="placement-card--content--image">
                                            {
                                                placement?.featuredImage?.node?.mediaItemUrl &&
                                                <Image width={260} height={400} src={placement.featuredImage.node.mediaItemUrl} alt={placement.featuredImage.node.altText} title={placement?.title} />
                                            }
                                        </div>
                                        <div className="placement-card--content">
                                            <Flex className="thumb-content">
                                                <h4>{placement?.placementFields?.courseOrDegree}</h4>
                                                <Flex gap={4} align="center" style={{height: 'fit-content'}}>
                                                    <p>Placed in</p>
                                                    {
                                                        placement?.placementFields?.placedInCompanyLogo?.node?.mediaItemUrl &&
                                                        <Image className="placement-company" width={100} height={100} src={placement.placementFields.placedInCompanyLogo.node.mediaItemUrl} alt={placement.placementFields.placedInCompanyLogo.node.altText} title={placement?.title} />
                                                    }
                                                </Flex>
                                            </Flex>
                                            <div className="hide">
                                                <Flex className="desc">
                                                    <p>{placement?.title}</p>
                                                    <p>{placement?.placementFields?.courseOrDegree}</p>
                                                </Flex>
                                                <div className="desc--content" dangerouslySetInnerHTML={{ __html: placement?.content }} />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </div>
            </section>
        </>
    );
};

export default Placement;