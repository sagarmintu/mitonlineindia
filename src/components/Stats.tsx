import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import { Flex } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";

const Stats = () => {
  const [stats, setStats] = useState<any>(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetPosts {
              pages(where: { name: "home" }) {
                edges {
                  node {
                    home {
                      numberBoxesSection {
                        numberBox1 {
                          numberText
                          subText
                          uploadIcon {
                            node {
                              altText
                              mediaType
                              mediaItemUrl
                              title
                            }
                          }
                        }
                        numberBox2 {
                          numberText
                          subText
                          uploadIcon {
                            node {
                              altText
                              mediaItemUrl
                              mediaType
                              title
                            }
                          }
                        }
                        numberBox3 {
                          numberText
                          subText
                          uploadIcon {
                            node {
                              altText
                              mediaItemUrl
                              mediaType
                              title
                            }
                          }
                        }
                        numberBox4 {
                          numberText
                          subText
                          uploadIcon {
                            node {
                              altText
                              mediaItemId
                              mediaItemUrl
                              title
                            }
                          }
                        }
                        numberBox5 {
                          numberText
                          subText
                          uploadIcon {
                            node {
                              altText
                              mediaItemUrl
                              mediaType
                              title
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        });

        if (
          data &&
          data.pages &&
          data.pages.edges &&
          data.pages.edges.length > 0 &&
          data.pages.edges[0].node.home &&
          data.pages.edges[0].node.home.numberBoxesSection
        ) {
          setStats(data.pages.edges[0].node.home.numberBoxesSection);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="stats">
        <div className="container">
          {/* Mobile View */}
          {isMobile ? (
            <Swiper
              className="videosSwiper stats-box"
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              modules={[Autoplay]}
              loop={true}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
            >
              {stats &&
                Object.keys(stats).map((boxKey, index) => {
                  const box = stats[boxKey];
                  return (
                    index > 0 && (
                      <SwiperSlide key={index}>
                        <div>
                          <Flex className="stats-item" gap={14}>
                            {box?.uploadIcon && (
                              <div>
                                <img
                                  src={box?.uploadIcon.node.mediaItemUrl}
                                  alt={box?.uploadIcon?.node?.altText}
                                  title={box?.uploadIcon?.node?.title}
                                />
                              </div>
                            )}
                            <div>
                              <p>{box?.numberText}</p>
                              <p>{box?.subText}</p>
                            </div>
                          </Flex>
                        </div>
                      </SwiperSlide>
                    )
                  );
                })}
            </Swiper>
          ) : (
            <Flex className="stats-box">
              {stats &&
                Object.keys(stats).map((boxKey, index) => {
                  const box = stats[boxKey];
                  return (
                    index > 0 && (
                      <Flex className="stats-item" key={index} gap={14}>
                        {box?.uploadIcon && (
                          <div>
                            <img
                              src={box?.uploadIcon.node.mediaItemUrl}
                              alt={box?.uploadIcon?.node?.altText}
                              title={box?.uploadIcon?.node?.title}
                            />
                          </div>
                        )}
                        <div>
                          <p>{box?.numberText}</p>
                          <p>{box?.subText}</p>
                        </div>
                      </Flex>
                    )
                  );
                })}
            </Flex>
          )}
        </div>
      </div>
    </>
  );
};

export default Stats;
