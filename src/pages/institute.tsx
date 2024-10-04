import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/components/Banner";
import client from "../../client";
import { gql } from "@apollo/client";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import { Faq } from "@/utils/types";
import dayjs from "dayjs";
import Mentors from "@/components/Mentors";
import CalendarIcon from '../images/calendar-orange.svg';
import ClockIcon from '../images/clock-orange.svg';
import Placement from "@/components/Placement";
import FacultySection from "@/components/FacultySection";
import PopularProgram from "@/components/PopularProgram";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";


export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
                query InstitueQuery {
                institute(id: "mit-school-of-distance-education", idType: SLUG) {
                    instituteHighlightSection {
                                highlight
                                highlight2
                                highlight3
                                highlight4
                                highlight5
                                highlight6
                                highlight7
                                highlight8
                                sectionTitle
                                subTitle
                                }                    
                    logosSliderSection {
                        heading
                        subHeading
                        uploadSliderImages {
                            sliderImage1 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage10 {
                            node {
                                altText
                                title
                                mediaItemUrl
                            }
                            }
                            sliderImage2 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage3 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage4 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage5 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage6 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage7 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage8 {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            sliderImage9 {
                            node {
                                altText
                                title
                                mediaItemUrl
                            }
                            }
                        }
                    }                    
                    instituteFields {
                    contactSection {
                        contactForm
                        heading
                        subHeading
                    }
                    coursesSection {
                        subHeading
                        title
                        buttonLink {
                        target
                        title
                        url
                        }
                    }
                    facultySection {
                        heading
                        subHeading
                        buttonLink {
                        target
                        title
                        url
                        }
                    }
                    faqSection {
                        heading
                        subHeading
                    }
                    getFinancialAidSection {
                        box1
                        box2
                        heading
                        subHeading
                    }
                    introduction {
                        leftContent
                        rightContent
                        buttonLink {
                        target
                        title
                        url
                        }
                    }
                    placementSection {
                        heading
                        subHeading
                    }
                    topBannerSection {
                        heading
                        subText
                        button {
                        target
                        title
                        url
                        }
                    }
                }
            }
        }
      `,
        });
        if (
            data &&
            data.institute &&
            data.institute.instituteFields
        ) {
            const institutePage = data.institute.instituteFields;
            const sliderData = data.institute.logosSliderSection;            
            const instituteHighlight = data.institute.instituteHighlightSection; console.log('highlight:', instituteHighlight);
            return {
                props: {
                    institutePage,
                    sliderData,                    
                    instituteHighlight
                },
            };
        }
    } catch (error) {
        console.error("Error fetching about page data:", error);
        return {
            props: {
                institutePage: null,
                sliderData: null,
                instituteHighlight: null,
            },
        };
    }
}

const Institute = ({ institutePage, sliderData, instituteHighlight }: any) => {
    const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
                query AllFAQs {
                  faqs(where: { orderby: { field: MENU_ORDER, order: ASC } } first: 100) {
                    edges {
                      node {
                        title
                        content
                        faqCategories {
                          edges {
                            node {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              `,
                });

                if (data && data.faqs && data.faqs.edges && data.faqs.edges.length > 0) {
                    setAllFaqs(data.faqs.edges.map((edge: any) => edge.node));
                }
            } catch (error) {
                console.error("Error fetching FAQ data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Head>
                <title>Institute</title>
                {/* <title>{aboutPageData.seo.title}</title>
            <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
            </Head>
            {institutePage &&
                <main>
                    <Banner
                        title={institutePage?.topBannerSection?.heading}
                        desc={institutePage?.topBannerSection?.subText}
                        btnText={institutePage?.topBannerSection?.button.title}
                        image={institutePage?.topBannerSection?.uploadBackgroundImage?.node?.mediaItemUrl}
                        grey={true}
                    />
                    <section className="ovreview-section">
                        <div className="container">
                            <Flex className="ovreview-section--row">
                                <div className="left-content">
                                    <h2 dangerouslySetInnerHTML={{ __html: institutePage?.introduction?.leftContent }} />
                                    <a className="btn btn-primary"
                                        href={'/contact-us#contactForm'}
                                        target={institutePage?.introduction?.buttonLink?.target}
                                    >
                                        {institutePage?.introduction?.buttonLink?.title}
                                        <Image width={20} height={20} src={RightArrow} alt="righ-arrow" />
                                    </a>
                                </div>
                                <div className="right-content">
                                    <div dangerouslySetInnerHTML={{ __html: institutePage?.introduction?.rightContent }} />
                                </div>
                            </Flex>
                        </div>
                    </section>
                    <section className="hightlih+ghts-section">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: instituteHighlight?.sectionTitle }} />
                                <p>{instituteHighlight?.subTitle}</p>
                            </div>
                            <Flex vertical gap={24}>
                                <Flex className="highlight--items" gap={24}>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight2 }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight3 }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight4 }}></div>                                    
                                </Flex>
                                <Flex className="highlight--items" gap={24}>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight5 }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight6 }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight7 }}></div>
                                    <div className="item" dangerouslySetInnerHTML={{ __html: instituteHighlight?.highlight8 }}></div>
                                </Flex>
                            </Flex>
                        </div>
                    </section>
                    <section className="">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: institutePage?.getFinancialAidSection?.heading }} />
                                <p>{institutePage?.getFinancialAidSection?.subHeading}</p>
                            </div>
                            <Flex className="financial--boxes">
                                <div className="financial--box" dangerouslySetInnerHTML={{ __html: institutePage?.getFinancialAidSection?.box1 }} />
                                <div className="financial--box" dangerouslySetInnerHTML={{ __html: institutePage?.getFinancialAidSection?.box2 }} />
                            </Flex>
                        </div>
                    </section>
                    <section className="ranking-section grey">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: sliderData?.heading }} />
                                <p>{sliderData?.subHeading}</p>
                            </div>
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
                                    120: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1200: {
                                        slidesPerView: 5,
                                    },
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                            >
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage1.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage2.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage3.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage4.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage5.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage6.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage7.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage8.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={sliderData?.uploadSliderImages?.sliderImage9.node.mediaItemUrl} alt="slider--image" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </section>
                    <FacultySection white={true} content={institutePage?.facultySection} />
                    <Contact content={institutePage?.contactSection} />
                    <Placement content={institutePage?.placementSection} />
                    <FaqSection desc={institutePage?.faqSection?.subHeading} faqs={allFaqs} />
                </main>}
        </>
    );
};

export default Institute;