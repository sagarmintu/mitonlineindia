import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { Faq } from "@/utils/types";
import client from "../../../../client";
import Image from "next/image";
import { Flex } from "antd";
import RightArrow from "../../../images/right-arrow.svg";
import BreadCaret from "../../../images/bread-caret.svg";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import FacultySection from "@/components/FacultySection";
import Placement from "@/components/Placement";
import Advantages from "@/components/Advantage";
import Download from "../../../images/download.svg";
import ModeOfLearning from "../../../images/mode-of-learning.svg";
import CourseDuration from "../../../images/course-duration.svg";
import { useRouter } from 'next/router';
import Link from "next/link";
import Head from "next/head";


const InnerPage = ({ courseContent, courseLearning }: any) => {
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
    console.log(courseLearning, 'courseLearning')
    return (
        courseContent &&
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
                        <Link href={`/courses/${category}`}>{formattedCategory}</Link>
                        <Image src={BreadCaret} width={5.5} height={11} alt="bread-caret" />
                        <p dangerouslySetInnerHTML={{ __html: courseContent?.topBannerSection?.bannerTitle }} />
                    </Flex>
                    <div className="section-head big">
                        <h1 dangerouslySetInnerHTML={{ __html: courseContent?.topBannerSection?.bannerTitle }} />
                        <div className="banner-desc" dangerouslySetInnerHTML={{ __html: courseContent?.topBannerSection?.subText }} />
                    </div>
                    <Flex justify="center" gap={52}>
                        <Flex gap={8} className="extra-info" align="start">
                            <Image src={ModeOfLearning} width={20} height={20} alt="icon" />
                            <Flex vertical gap={8}>
                                <p className="attribute">Mode of Learning</p>
                                <p className="value">
                                    {courseContent?.topBannerSection?.modeOfLearning}
                                </p>
                            </Flex>
                        </Flex>
                        <Flex gap={8} className="extra-info" align="start">
                            <Image src={CourseDuration} width={20} height={20} alt="icon" />
                            <Flex vertical gap={8}>
                                <p className="attribute">Course Duration</p>
                                <p className="value">{courseContent?.courseDuration}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex className="banner-btns" align="center" gap={12} justify="center">
                        <a href={'/contact-us#contactForm'} target={courseContent?.topBannerSection?.buttonLink?.target} className="btn btn-primary">{courseContent?.topBannerSection?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                        <a href={courseContent?.topBannerSection?.downloadBrochure?.url} target={courseContent?.topBannerSection?.downloadBrochure?.target} className="btn btn-outline">{courseContent?.topBannerSection?.downloadBrochure?.title} <Image width={20} height={20} src={Download} alt="righ-arrow" /></a>
                    </Flex>
                </div>
            </section>
            <section className="program-overview">
                <div className="container">
                    <Flex className="program-overview--row">
                        <div>
                            <h2 dangerouslySetInnerHTML={{ __html: courseContent?.overviewSection?.leftTitle }} />
                            <div className="program-overview--content" dangerouslySetInnerHTML={{ __html: courseContent?.overviewSection?.leftContent }} />
                        </div>
                        <Flex vertical className="program-overview--boxes">
                            <div className="program-overview-box">
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.overviewSection?.box1.durationContent }} />
                                {/* buttonLink */}
                            </div>
                            <div className="program-overview-box">
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.overviewSection?.box2.feeDetails }} />
                                <a href={'contact-us#contactForm'} target={courseContent?.overviewSection?.box1?.buttonLink?.target} className="btn btn-primary" style={{margin: '10px 0 15px', zIndex: '1', position: 'relative'}}>{courseContent?.overviewSection?.box1?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                                <a href={courseContent?.downloadBrochureLink?.box2?.downloadBrochureLink?.url} target={courseContent?.overviewSection?.box2?.downloadBrochureLink?.target} className="btn btn-outline">{courseContent?.overviewSection?.box2?.downloadBrochureLink?.title} <Image width={20} height={20} src={Download} alt="righ-arrow" /></a>
                                {/* downloadBrochureLink */}
                            </div>
                        </Flex>
                    </Flex>
                </div>
            </section>
            <section className="program-higlight grey">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.heading }} />
                        <p>{courseContent?.highlightSection?.subHeading}</p>
                    </div>
                    <Flex gap={20} wrap="wrap">
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box1 }} />
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box2 }} />
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box3 }} />
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box4 }} />
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box5 }} />
                        <div className="program-higlight--box" dangerouslySetInnerHTML={{ __html: courseContent?.highlightSection?.highlightBoxes?.box6 }} />
                    </Flex>
                </div>
            </section>
            <section className="learning-outcome">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseLearning?.leftImageSection?.heading }} />
                        <p>{courseLearning?.leftImageSection?.subHeading}</p>
                    </div>
                    <Flex>
                        <div className="learning-outcome--col">
                          {
                            courseLearning?.leftImageSection?.imageUpload?.node.mediaItemUrl &&
                            <Image width={368} height={468} src={courseLearning?.leftImageSection?.imageUpload?.node.mediaItemUrl} alt={courseLearning?.leftImageSection?.imageUpload?.node.altText} title={courseLearning?.leftImageSection?.imageUpload?.node.title} />
                          }
                        </div>
                        <div className="learning-outcome--col" dangerouslySetInnerHTML={{ __html: courseLearning?.leftImageSection?.content }} />
                    </Flex>
                </div>
            </section>
            <Advantages grey={true} />
            <section className="approval">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.degreeProgramSection?.heading }} />
                        <p>{courseContent?.degreeProgramSection?.subHeading}</p>
                    </div>
                    <Flex className="approval--row" align="center">
                        <div>
                            <Image width={400} height={267} src={courseContent?.degreeProgramSection?.leftImage?.node.mediaItemUrl} alt={courseContent?.degreeProgramSection?.leftImage?.node.altText} title={courseContent?.degreeProgramSection?.leftImage?.node.title} />
                        </div>
                        <div className="diverse-special--list" dangerouslySetInnerHTML={{ __html: courseContent?.degreeProgramSection?.rightContent }} />
                    </Flex>
                </div>
            </section>
            <Contact content={courseContent?.contectSection} />
            <section className="program-fee">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.programFeeSection?.heading }} />
                        <p>{courseContent?.programFeeSection?.subHeading}</p>
                    </div>
                    <Flex className="program-fee--details">
                        <div dangerouslySetInnerHTML={{ __html: courseContent?.programFeeSection?.box1 }} />
                        <div dangerouslySetInnerHTML={{ __html: courseContent?.programFeeSection?.box2 }} />
                    </Flex>
                    <Flex className="program-fee--row">
                        <div dangerouslySetInnerHTML={{ __html: courseContent?.programFeeSection?.box3 }} />
                        <Image className="program-fee--row--image" width={403} height={380} src={courseContent?.programFeeSection?.relatedImage?.node.mediaItemUrl} alt={courseContent?.programFeeSection?.relatedImage?.node.altText} title={courseContent?.programFeeSection?.relatedImage?.node.title} />
                    </Flex>
                    <a className="btn btn-primary" href={'/contact-us#contactForm'} target={courseContent?.programFeeSection?.buttonLink?.target}>{courseContent?.programFeeSection?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                </div>
            </section>
            <section className="grey">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.getFinancialSection?.heading }} />
                    </div>
                    <Flex className="financial--boxes">
                        <div className="financial--box" dangerouslySetInnerHTML={{ __html: courseContent?.getFinancialSection?.leftBox }} />
                        <div className="financial--box" dangerouslySetInnerHTML={{ __html: courseContent?.getFinancialSection?.rightBox }} />
                    </Flex>
                </div>
            </section>
            {/* <section className="career-prospects">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.careerProspectsSection?.heading }} />
                        <p>{courseContent?.careerProspectsSection?.subHeading}</p>
                    </div>
                    <div className="inner-row" dangerouslySetInnerHTML={{ __html: courseContent?.careerProspectsSection?.content }} />
                    <a className="btn btn-primary" href={courseContent?.careerProspectsSection?.buttonLink?.url} target={courseContent?.careerProspectsSection?.buttonLink?.target}>{courseContent?.careerProspectsSection?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                </div>
            </section> */}
            <section className="admission-process">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.heading }} />
                        <p>{courseContent?.admissionProcessSection?.subHeading}</p>
                    </div>
                    <div className="main-seprator sm-hide">
                        <Flex className="admission-process--items">
                            <div className="admission-process--item">
                                <p className="tag">1</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step1 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">3</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step3 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">5</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step5 }} />
                            </div>
                        </Flex>
                    </div>
                    <div className="sm-hide">
                        <Flex className="admission-process--items last">
                            <div className="admission-process--item">
                                <p className="tag">2</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step2 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">4</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step4 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">6</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step6 }} />
                            </div>
                        </Flex>
                    </div>
                    <div className="lg-hide">
                        <Flex className="admission-process--items">
                            <div className="admission-process--item">
                                <p className="tag">1</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step1 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">2</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step2 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">3</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step3 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">4</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step4 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">5</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step5 }} />
                            </div>
                            <div className="admission-process--item">
                                <p className="tag">6</p>
                                <div dangerouslySetInnerHTML={{ __html: courseContent?.admissionProcessSection?.step6 }} />
                            </div>
                        </Flex>
                    </div>
                    <a className="btn btn-primary" href={'/contact-us#contactForm'} target={courseContent?.admissionProcessSection?.buttonLink?.target}>{courseContent?.admissionProcessSection?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                </div>
            </section>
            <FacultySection content={courseContent?.facultySection} />
            <Placement content={courseContent?.placementSection} />
            <FaqSection desc={courseContent?.faqSection?.subHeading} faqs={allFaqs} />
        </>
    )
}
export default InnerPage;


export async function getServerSideProps({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    console.log(slug, 'slug')
    try {
        const { data } = await client.query({
            query: gql`
            query GetCourseData($slug: ID!) {
              course(id: $slug, idType: SLUG) {
                tags {
                  edges {
                    node {
                      link
                      name
                      slug
                    }
                  }
                }
                leftImageSection {
                  content
                  heading
                  subHeading
                  imageUpload {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                  buttonLink {
                    target
                    title
                    url
                  }
                }
                courseDetails {
                  overviewSection {
                    box1 {
                      durationContent
                      buttonLink {
                        target
                        title
                        url
                      }
                    }
                    box2 {
                      downloadBrochureLink {
                        target
                        title
                        url
                      }
                      feeDetails
                    }
                    leftContent
                    leftTitle
                  }
                   highlightSection {
                      heading
                      subHeading
                      highlightBoxes {
                        box1
                        box2
                        box3
                        box4
                        box5
                        box6
                      }
                    }
                  admissionProcessSection {
                    buttonLink {
                      target
                      title
                      url
                    }
                    step1
                    step2
                    step3
                    heading
                    step4
                    step5
                    step6
                    subHeading
                  }
                  approvedBy
                  careerProspectsSection {
                    content
                    heading
                    subHeading
                    buttonLink {
                      target
                      title
                      url
                    }
                  }
                  contectSection {
                    contactForm
                    heading
                    subHeading
                  }
                  admissionProcessSection {
                    heading
                    step1
                    step2
                    step3
                    step4
                    step5
                    step6
                    subHeading
                  }
                  courseDuration
                  degreeProgramSection {
                    heading
                    rightContent
                    subHeading
                    leftImage {
                      node {
                        altText
                        mediaItemUrl
                        title
                      }
                    }
                  }
                  facultySection {
                    heading
                    subHeading
                  }
                  placementSection {
                    heading
                    subHeading
                  }
                  faqSection {
                    heading
                    subHeading
                  }
                  getFinancialSection {
                    heading
                    leftBox
                    rightBox
                  }
                  graduateWithWorkExperience
                  highlightSection {
                    heading
                    subHeading
                  }
                  topBannerSection {
                    buttonLink {
                      target
                      title
                      url
                    }
                    modeOfLearning
                    subText
                    bannerTitle
                    downloadBrochure {
                      target
                      title
                      url
                    }
                  }
                  whyChooseMitSection {
                    heading
                    subHeading
                    feature1 {
                      backgroundImage {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      content
                      iconBlack {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      iconWhite {
                        node {
                          altText
                          title
                          mediaItemUrl
                        }
                      }
                      title
                    }
                    feature2 {
                      content
                      title
                      backgroundImage {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      iconBlack {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      iconWhite {
                        node {
                          altText
                          title
                          mediaItemUrl
                        }
                      }
                    }
                    feature3 {
                      backgroundImage {
                        node {
                          altText
                          title
                          mediaItemUrl
                        }
                      }
                      content
                      iconBlack {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      iconWhite {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      title
                    }
                    feature4 {
                      backgroundImage {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      iconBlack {
                        node {
                          altText
                          title
                          mediaItemUrl
                        }
                      }
                      content
                      iconWhite {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      title
                    }
                  }
                  specializationsSection {
                    content2
                    subHeading
                    buttonLink {
                      title
                      url
                      target
                    }
                    content1
                    heading
                  }
                  programFeeSection {
                    box1
                    heading
                    subHeading
                    buttonLink {
                      target
                      title
                      url
                    }
                    relatedImage {
                      node {
                        altText
                        mediaItemUrl
                        title
                      }
                    }
                    box2
                    box3
                  }
                }
                coursesCategories {
                  edges {
                    node {
                      link
                      name
                      slug
                    }
                  }
                }
                title
              }
            }
      `,
            variables: { slug },
        });

        let courseContent = null;
        let courseLearning = null;
        if (data && data.course && data.course.courseDetails) {
            courseContent = data && data.course && data.course.courseDetails;
            courseLearning = data && data.course && data.course;
        }
        return {
            props: {
                courseContent,
                courseLearning
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                commonSections: null
            },
        };
    }
}