import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const FacultySection = ({content, white} : any) => {
    const [faculties, setFaculties] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try { const { data } = await client.query({query: gql`
            query GetPlacements {
                faculties {
                    edges {
                      node {
                        featuredImage {
                          node {
                            altText
                            mediaItemUrl
                            title
                          }
                        }
                        content
                        title
                      }
                    }
                }
              }
          `,});
            if (
                    data &&
                    data.faculties &&
                    data.faculties.edges &&
                    data.faculties.edges.length > 0
                ) {
                    const placementData = data.faculties.edges.map((edge: any) => edge.node);
                    setFaculties(placementData);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <section className={`${white ? '' : 'grey'} faculty-section`}>
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: content?.heading }} />
                        <p>{content?.subHeading}</p>
                    </div>
                    {
                        faculties && faculties.length > 0 && 
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
                                    slidesPerView: 2,
                                },
                                1200: {
                                    slidesPerView: 3,
                                },
                                
                            }}
                            pagination={{
                                clickable: true,
                            }}
                        >
                            {faculties.map((faculty: any, index: number) => (
                                faculty.featuredImage.node.mediaItemUrl &&
                                <SwiperSlide key={index}>
                                    <div className="faculty--card" style={{backgroundImage: `url(${faculty.featuredImage.node.mediaItemUrl})`}}>
                                        <div className="faculty--card--content">
                                            <h4>{faculty?.title}</h4>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: faculty?.content,
                                                }}
                                            />
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

export default FacultySection;