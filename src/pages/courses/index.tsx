import React, { useState, useEffect } from "react";
import Image from "next/image";
import client from "../../../client";
import { Faq } from "@/utils/types";
import { gql } from "@apollo/client";
import { Flex } from "antd";
import dayjs from "dayjs";
import PopularProgram from "@/components/PopularProgram";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import DateIcon from "../../images/date.svg";
import RightArrow from "../../images/right-arrow.svg";
import ClockIcon from "../../images/clock-light.svg";
import Download from "../../images/download.svg";
import Head from "next/head";


const Courses = ({ coursePageData }: any) => {
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
                <title>Courses</title>
                {/* <title>{aboutPageData.seo.title}</title>
                <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
            </Head>
            <main>
                <section className="light-section banner-section-normal courses-banner">
                    <div className="container">
                        <div className="section-head">
                            <h1 dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.topBannerSection?.title }} />
                            <div className="banner-desc" dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.topBannerSection?.subText }} />
                        </div>
                        <Flex justify="center" gap={52}>
                            <Flex gap={8} className="extra-info" align="start">
                                <Image src={DateIcon} width={18} height={18} alt="icon" />
                                <Flex vertical gap={8}>
                                    <p className="attribute">Start Date</p>
                                    <p className="value">{coursePageData?.coursesFields?.topBannerSection?.startDate}</p>
                                </Flex>
                            </Flex>
                            <Flex gap={8} className="extra-info" align="start">
                                <Image src={ClockIcon} width={18} height={18} alt="icon" />
                                <Flex vertical gap={8}>
                                    <p className="attribute">Duration</p>
                                    <p className="value">{coursePageData?.coursesFields?.topBannerSection?.courseDuration}</p>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex className="banner-btns" align="center" gap={12} justify="center">
                            <a href={'/contact-us#contactForm'} className="btn btn-primary">Enroll Now <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                            <a href={'#'} className="btn btn-outline">Download Brochure <Image width={20} height={20} src={Download} alt="righ-arrow" /></a>
                        </Flex>
                    </div>
                </section>
                <PopularProgram white={true} content={coursePageData?.coursesFields?.coursesSection} />
                <section className="grey">
                    <div className="container">
                        <div className="section-head">
                            <h2 dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.getFinancialAidSection?.heading }} />
                            <p>{coursePageData?.coursesFields?.getFinancialAidSection?.subHeading}</p>
                        </div>
                        <Flex className="financial--boxes">
                            <div className="financial--box" dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.getFinancialAidSection?.box1 }} />
                            <div className="financial--box" dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.getFinancialAidSection?.box2 }} />
                        </Flex>
                    </div>
                </section>
                <Contact white={true} content={coursePageData?.coursesFields?.contactSection} />
                <section>
                    <div className="container">
                        <div className="section-head big">
                            <h2 dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.institutionSection?.heading }} />
                            <p>{coursePageData?.coursesFields?.institutionSection?.subHeading}</p>
                        </div>
                        <Flex className="institution-row">
                            <div>
                                {
                                    coursePageData?.coursesFields?.institutionSection?.uploadImage?.node?.mediaItemUrl &&
                                    <Image width={493} height={321} src={coursePageData?.coursesFields?.institutionSection?.uploadImage?.node?.mediaItemUrl}
                                        alt={coursePageData?.coursesFields?.institutionSection?.uploadImage?.node?.altText ? coursePageData?.coursesFields?.institutionSection?.uploadImage?.node?.altText : 'institution'}
                                        title={coursePageData?.coursesFields?.institutionSection?.uploadImage?.node?.title}
                                    />
                                }
                            </div>
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: coursePageData?.coursesFields?.institutionSection?.rightContent }} />
                                <a href={'/contact-us#contactForm'} target={coursePageData?.coursesFields?.institutionSection?.buttonLink?.target} className="btn btn-primary">
                                    {coursePageData?.coursesFields?.institutionSection?.buttonLink?.title}
                                    <Image width={20} height={20} src={RightArrow} alt="righ-arrow" />
                                </a>
                            </div>            
                        </Flex>
                    </div>
                </section>
                <FaqSection desc={coursePageData?.coursesFields?.faqSection?.subHeading} faqs={allFaqs} />
            </main>
        </>
    );
};

export default Courses;
export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
                query GetData {
                    pages(where: {name: "courses"}) {
                        edges {
                            node {
                                content
                                coursesFields {
                                    contactSection {
                                        contactFrom
                                        heading
                                        subHeading
                                    }
                                    coursesSection {
                                        heading
                                        subHeading
                                        buttonLink {
                                            title
                                            target
                                            url
                                        }
                                    }
                                    faqSection {
                                        heading
                                        subHeading
                                    }
                                    getFinancialAidSection {
                                        box1
                                        heading
                                        subHeading
                                        box2
                                    }
                                    institutionSection {
                                        buttonLink {
                                            target
                                            title
                                            url
                                        }
                                        heading
                                        rightContent
                                        subHeading
                                        uploadImage {
                                            node {
                                                altText
                                                mediaItemUrl
                                                title
                                            }
                                        }
                                    }
                                    topBannerSection {
                                        courseDuration
                                        startDate
                                        subText
                                        title
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
        data.pages.edges[0].node
        ) {
        const coursePageData = data.pages.edges[0].node;
    
        return {
            props: {
                coursePageData,
            },
        };
        }
    } catch (error) {
        console.error("Error fetching about page data:", error);
        return {
            props: {
                coursePageData: null,
            },
        };
    }
}
