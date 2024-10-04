import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

const VideosTestimonial = ({stats} :  any) => {
    const [videos, setVideos] = useState<any>([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try { const { data } = await client.query({query: gql`
            query GetVideos {
                videoCategories(where: {slug: "testimonial"}) {
                  edges {
                    node {
                      videos {
                        edges {
                          node {
                            videos {
                              description
                              name
                              youtubeEmbedLink
                            }
                            slug
                            videoId
                          }
                        }
                      }
                      name
                      slug
                      uri
                    }
                  }
                }
              }
          `,});
            if (
                    data &&
                    data.videoCategories &&
                    data.videoCategories.edges &&
                    data.videoCategories.edges.length > 0 &&
                    data.videoCategories.edges[0].node &&
                    data.videoCategories.edges[0].node.videos &&
                    data.videoCategories.edges[0].node.videos.edges &&
                    data.videoCategories.edges[0].node.videos.edges.length > 0
                ) {
                    const videosData = data.videoCategories.edges[0].node.videos.edges.map((edge: any) => edge.node);
                    setVideos(videosData);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchVideos();
    }, []);
    return (
        <>
            <section className="grey our-students">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: stats?.heading }} />
                        <p>{stats?.subHeading}</p>
                    </div>
                    {
                        videos && videos.length > 0 && 
                        <Swiper
                            modules={[Pagination]}
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
                            {videos.map((video: any, index: number) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="blog-list-item video-card">
                                            <div className="video-card--container">
                                                <LiteYouTubeEmbed
                                                    id={video.videos.youtubeEmbedLink}
                                                    title="item.title"
                                                    noCookie={true}
                                                />
                                            </div>
                                            <h4>{video.videos.name}</h4>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: video.videos.description,
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    }
                    {
                        stats?.button?.url &&
                        <Flex justify="center">
                            <a href={'/contact-us#contactForm'} target={stats?.button?.target} className="btn btn-primary">{stats?.button?.title}<Image src={RightArrow} alt="righ-arrow" /></a>
                        </Flex>
                    }
                </div>
            </section>
        </>
    );
};

export default VideosTestimonial;