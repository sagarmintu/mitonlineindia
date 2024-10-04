import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { Faq } from "@/utils/types";
import client from "../../../../client";
import Image from "next/image";
import { Flex } from "antd";
import dayjs from "dayjs";
import RightArrow from "../../../images/right-arrow.svg";
import DateIcon from "../../../images/date.svg";
import BreadCaret from "../../../images/bread-caret.svg";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import PopularProgram from "@/components/PopularProgram";
import ClockIcon from "../../../images/clock-light.svg";
import Download from "../../../images/download.svg";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from "next/head";
import { Col, Collapse, Row } from "antd";


const Category = ({ commonSections, dynamicData, slugCategory }: any) => {
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
  const router = useRouter();
  const { category } = router.query;
  const formatString = (str: string): string => {
    return str
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const formattedCategory = category ? formatString(category as string) : '';
  console.log(commonSections, 'commonSections')
  return (
    commonSections &&
    <>
      <Head>
        <title>Courses</title>
        {/* <title>{aboutPageData.seo.title}</title>
                <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
      </Head>
      <section className="light-section banner-section-normal">
        <div className="container relative">
          <Flex className="bead-crumb" gap={12} align="center">
            <Link href="/courses">Courses</Link>
            <Image src={BreadCaret} width={5.5} height={11} alt="bread-caret" />
            <p dangerouslySetInnerHTML={{ __html: formattedCategory }} />
          </Flex>
          <div className="section-head big">
            <h1 dangerouslySetInnerHTML={{ __html: dynamicData?.topBannerSection?.title }} />
            <div className="banner-desc" dangerouslySetInnerHTML={{ __html: dynamicData?.topBannerSection?.subText }} />
          </div>
          <Flex justify="center" gap={52}>
            <Flex gap={8} className="extra-info" align="start">
              <Image src={DateIcon} width={18} height={18} alt="icon" />
              <Flex vertical gap={8}>
                <p className="attribute">Start Date</p>
                <p className="value">{dayjs(dynamicData?.topBannerSection?.startDate).format("MMM DD, YYYY")}{ }</p>
              </Flex>
            </Flex>
            <Flex gap={8} className="extra-info" align="start">
              <Image src={ClockIcon} width={18} height={18} alt="icon" />
              <Flex vertical gap={8}>
                <p className="attribute">Duration</p>
                <p className="value">{dynamicData?.topBannerSection?.courseDuration}</p>
              </Flex>
            </Flex>
          </Flex>
          <Flex className="banner-btns" align="center" gap={12} justify="center">
            <a href={'/contact-us#contactForm'} className="btn btn-primary">Enroll Now <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
            <a href={'#'} className="btn btn-outline">Download Brochure <Image width={20} height={20} src={Download} alt="righ-arrow" /></a>
          </Flex>
        </div>
      </section>
      <PopularProgram selectedCat={slugCategory} noFilter={true} white={true} content={dynamicData?.coursesSection} />
      <section className="grey">
        <div className="container">
          <div className="section-head">
            <h2 dangerouslySetInnerHTML={{ __html: dynamicData?.getFinancialAidSection?.heading }} />
            <p>{dynamicData?.getFinancialAidSection?.subHeading}</p>
          </div>
          <Flex className="financial--boxes">
            <div className="financial--box" dangerouslySetInnerHTML={{ __html: dynamicData?.getFinancialAidSection?.box1 }} />
            <div className="financial--box" dangerouslySetInnerHTML={{ __html: dynamicData?.getFinancialAidSection?.box2 }} />
          </Flex>
        </div>
      </section>
      <Contact white={true} content={commonSections?.contactSection} />
      <section>
        <div className="container">
          <div className="section-head big">
            <h2 dangerouslySetInnerHTML={{ __html: commonSections?.institutionSection?.heading }} />
            <p>{commonSections?.institutionSection?.subHeading}</p>
          </div>
          <Flex className="institution-row">
            <div className="institution-row--legacy">
              {
                commonSections?.institutionSection?.uploadImage?.node?.mediaItemUrl &&
                <Image width={493} height={246} src={commonSections?.institutionSection?.uploadImage?.node?.mediaItemUrl}
                  alt={commonSections?.institutionSection?.uploadImage?.node?.altText ? commonSections?.institutionSection?.uploadImage?.node?.altText : 'Institution'}
                  title={commonSections?.institutionSection?.uploadImage?.node?.title}
                />
              }
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: commonSections?.institutionSection?.rightContent }} />
              <a href={'/contact-us#contactForm'} target={commonSections?.institutionSection?.buttonLink?.target} className="btn btn-primary">
                {commonSections?.institutionSection?.buttonLink?.title}
                <Image width={20} height={20} src={RightArrow} alt="righ-arrow" />
              </a>
            </div>
          </Flex>
        </div>
      </section>
      {(dynamicData?.extraContent?.section1?.heading &&
  dynamicData?.extraContent?.section2?.heading &&
  dynamicData?.extraContent?.section3?.heading) && (
      <section className="extra-content">
        <div className="container">
          <div className="content-row">
          <Row
            gutter={[
              { xs: 0, md: 30, lg: 40 },
              { xs: 20, md: 0, lg: 0 },
            ]}
          >
            <Col lg={6} md={6} xs={24}>
              <div className="extra-row--content">
                <h3>{dynamicData?.extraContent?.section1?.heading}</h3>
              </div>
            </Col>
            <Col lg={18} md={18}>
              <div><p>{dynamicData?.extraContent?.section1?.description}</p></div>
            </Col>
          </Row>
          <hr></hr>
          <Row
            gutter={[
              { xs: 0, md: 30, lg: 40 },
              { xs: 20, md: 0, lg: 0 },
            ]}
          >
            <Col lg={6} md={6} xs={24}>
              <div className="extra-row--content">
                <h3>{dynamicData?.extraContent?.section2?.heading}</h3>

              </div>
            </Col>
            <Col lg={18} md={18} xs={24}>
              <div><p>{dynamicData?.extraContent?.section2?.description}</p></div>
            </Col>
          </Row>
          <hr></hr>
          <Row
            gutter={[
              { xs: 0, md: 30, lg: 40 },
              { xs: 20, md: 0, lg: 0 },              
            ]}
          >
            <Col lg={6} md={6} xs={24}>
              <div className="extra-row--content">
                <h3>{dynamicData?.extraContent?.section3?.heading}</h3>

              </div>
            </Col>
            <Col lg={18} md={18} xs={24}>
              <div><p>{dynamicData?.extraContent?.section3?.description}</p></div>
            </Col>
          </Row>
          </div>
        </div>
      </section>
      )
}
      <FaqSection desc={commonSections?.faqSection?.subHeading} faqs={allFaqs} />
    </>
  )
}
export default Category;


export async function getServerSideProps({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  console.log(category, 'slug')
  try {
    const { data } = await client.query({
      query: gql`
        query CategoryyData($category: ID!) {
            themeGlobalSettings(where: {name: "category-common-sections"}) {
                edges {
                  node {
                    categoryCommonSections {
                      contactSection {
                          contactForm
                          heading
                          subHeading
                        }
                      faqSection {
                        heading
                        subHeading
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
                    }
                  }
                }
            }
            coursesCategory(
                id: $category
                idType: SLUG
            ) {
                courseCategoryFields {
                  coursesSection {
                    heading
                    subHeading
                    buttonLink {
                      target
                      title
                      url
                    }
                  }
                  extraContent {
                    section1 {
                      description
                      heading
                    }
                    section2 {
                      description
                      heading
                    }
                    section3 {
                      description
                      heading
                    }
                  }
                  getFinancialAidSection {
                    box1
                    box2
                    heading
                    subHeading
                  }
                  topBannerSection {
                    buttonLink {
                      target
                      title
                      url
                    }
                    courseDuration
                    modeOfLearning
                    subText
                    title
                    downloadBrochureLink {
                      target
                      title
                      url
                    }
                  }
                }
                slug
                name
                link
            }
        }
      `,
      variables: { category },
    });


    let commonSections = null;
    let dynamicData = null;
    let slugCategory = null;

    if (data && data.themeGlobalSettings && data.themeGlobalSettings.edges && data.themeGlobalSettings.edges[0].node) {
      commonSections = data.themeGlobalSettings.edges[0].node.categoryCommonSections;
    }
    if (data && data.coursesCategory && data.coursesCategory.courseCategoryFields) {
      dynamicData = data && data.coursesCategory && data.coursesCategory.courseCategoryFields;
    }
    if (data && data.coursesCategory && data.coursesCategory.name) {
      slugCategory = data && data.coursesCategory && data.coursesCategory.name;
    }

    return {
      props: {
        commonSections,
        dynamicData,
        slugCategory
        // bannerSection,
        // secondSection,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        commonSections: null,
        dynamicData: null,
        slugCategory: null
      },
    };
  }
}