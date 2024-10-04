import React, { useState, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import Image from "next/image";
import RightArrow from "../images/right-arrow.svg";
import Pause from "../images/pause.svg";
import LeftArrowBlack from "../images/left-arrow-black.svg";
import RightArrowBlack from "../images/right-arrow-black.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HomeBanner = () => {
    const [bannerSection, setBannerSection] = useState<any>([]);
    const [bannerSection2, setBannerSection2] = useState<any>([]);
    useEffect(() => {
        const fetchHomeBannerSection = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
            query GetPosts {
                pages(where: {name: "home"}) {
                    edges {
                      node {
                        home {
                            topSection {
                                button {
                                  target
                                  title
                                  url
                                }
                                heading
                                threeIconBoxes {
                                  firstBox {
                                    text
                                    uploadIcon {
                                      node {
                                        altText
                                        title
                                        mediaItemUrl
                                        mediaType
                                      }
                                    }
                                  }
                                  secondBox {
                                    text
                                    uploadIcon {
                                      node {
                                        altText
                                        mediaType
                                        mediaItemUrl
                                        title
                                      }
                                    }
                                  }
                                  thirdBox {
                                    text
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
                                subText
                              }
                        }
                        slug
                        title
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
                    data.pages.edges[0].node.home.topSection
                ) {
                    setBannerSection(data.pages.edges[0].node.home.topSection);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        const fetchHomeBannerSection2 = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
            query GetPosts {
                pages(where: {name: "home"}) {
                    edges {
                      node {
                        home {
                            topSectionWithBg {
                                button {
                                  target
                                  title
                                  url
                                }
                                backgroundImageOverlay {
                                  node {
                                    mediaItemUrl
                                    mediaType
                                    title
                                  }
                                }
                                backgroundImage {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                }
                                heading
                                threeIconBoxes {
                                  firstBox {
                                    text
                                    uploadIcon {
                                      node {
                                        altText
                                        title
                                        mediaItemUrl
                                        mediaType
                                      }
                                    }
                                  }
                                  secondBox {
                                    text
                                    uploadIcon {
                                      node {
                                        altText
                                        mediaType
                                        mediaItemUrl
                                        title
                                      }
                                    }
                                  }
                                  thirdBox {
                                    text
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
                                subText
                                textBeforeHeading
                              }
                        }
                        slug
                        title
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
                    data.pages.edges[0].node.home.topSectionWithBg
                ) {
                    setBannerSection2(data.pages.edges[0].node.home.topSectionWithBg);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchHomeBannerSection();
        fetchHomeBannerSection2();
    }, []);
    const [startAutoPlay, setStartAutoPlay] = useState(false);
    const swiperRefLocal = useRef<any>();
    useEffect(() => {
        if (startAutoPlay) {
            swiperRefLocal?.current?.swiper?.autoplay?.start()
        } else {
            swiperRefLocal?.current?.swiper?.autoplay?.stop()
        }
    }, [startAutoPlay]);
    useEffect(() => {
      const startAutoplay = () => {
        if (swiperRefLocal.current && swiperRefLocal.current.swiper) {
          const swiperInstance = swiperRefLocal.current.swiper;
          swiperInstance.params.autoplay.delay = 3000;
          swiperInstance.autoplay.start();
        }
      };
      const timeout = setTimeout(startAutoplay, 7000);
      return () => {
        clearTimeout(timeout);
      };
    }, []);
    return (
        <div className="banner-slider">
            <Swiper
                ref={swiperRefLocal}
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="videosSwiper"
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                spaceBetween={30}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    1200: {
                        slidesPerView: 1,
                    },
                }}
            >
                <SwiperSlide>
                    <section className="home-banner">
                        <div className="container">
                            <div className="banner-common">
                                <h1>{bannerSection?.heading}</h1>
                                <p className="banner-desc">{bannerSection?.subText}</p>
                                {
                                  bannerSection?.heading &&
                                  <a href={'/contact-us#contactForm'} className="btn-secondary" target={bannerSection?.button?.target}>
                                    {bannerSection?.button?.title} <Image src={RightArrow} alt="righ-arrow" />
                                  </a>
                                }
                                {
                                    bannerSection?.threeIconBoxes &&
                                    <div className="home-banner-boxes">
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection?.threeIconBoxes?.firstBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection?.threeIconBoxes?.firstBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection?.threeIconBoxes?.firstBox?.text}</p>
                                        </div>
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection?.threeIconBoxes?.secondBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection?.threeIconBoxes?.secondBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection?.threeIconBoxes?.secondBox?.text}</p>
                                        </div>
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection?.threeIconBoxes?.thirdBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection?.threeIconBoxes?.thirdBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection?.threeIconBoxes?.thirdBox?.text}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
                {/* <SwiperSlide>
                    <section className="home-banner second" style={{ backgroundImage: `url(${bannerSection2?.backgroundImage?.node?.mediaItemUrl})` }}>
                        {
                            bannerSection2?.backgroundImageOverlay &&
                            <Image height={1920} width={1920} className="banner-overlay" src={bannerSection2?.backgroundImageOverlay?.node?.mediaItemUrl} alt={bannerSection2?.backgroundImageOverlay?.node?.title} />
                        }
                        <div className="container">
                            <div className="banner-common">
                                <p className="above-heading">{bannerSection2?.textBeforeHeading}</p>
                                <h1
                                    dangerouslySetInnerHTML={{
                                        __html: bannerSection2?.heading,
                                    }}
                                />
                                <p className="banner-desc">{bannerSection2?.subText}</p>
                                <a href={bannerSection2?.button?.url} className="btn-secondary" target={bannerSection2?.button?.target}>
                                    {bannerSection2?.button?.title} <Image src={RightArrow} alt="righ-arrow" />
                                </a>
                                {
                                    bannerSection2?.threeIconBoxes &&
                                    <div className="home-banner-boxes">
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection2?.threeIconBoxes?.firstBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection2?.threeIconBoxes?.firstBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection2?.threeIconBoxes?.firstBox?.text}</p>
                                        </div>
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection2?.threeIconBoxes?.secondBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection2?.threeIconBoxes?.secondBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection2?.threeIconBoxes?.secondBox?.text}</p>
                                        </div>
                                        <div className="home-banner-box">
                                            <Image height={43} width={44} src={bannerSection2?.threeIconBoxes?.thirdBox?.uploadIcon?.node?.mediaItemUrl} alt={bannerSection2?.threeIconBoxes?.thirdBox?.uploadIcon?.node?.altText} />
                                            <p>{bannerSection2?.threeIconBoxes?.thirdBox?.text}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </SwiperSlide> */}
            </Swiper>
            {/* <div className="swiper-option-outer">
                <div className="custom-prev pointer">
                    <Image src={LeftArrowBlack} alt="Previous" width={20} height={20} />
                </div>
                <div className="custom-next pointer">
                    <Image src={RightArrowBlack} alt="Next" width={20} height={20} />
                </div>
                <div className="pointer" onClick={()=>{setStartAutoPlay(!startAutoPlay)}}>
                    <Image src={Pause} alt="Previous" width={20} height={20} />
                </div>
            </div> */}
        </div>
    );
};

export default HomeBanner;