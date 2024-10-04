import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/components/Banner";
import client from "../../client";
import { gql } from "@apollo/client";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Contact from "@/components/Contact";
import FacultySection from "@/components/FacultySection";
import FaqSection from "@/components/FaqSection";
import { Faq } from "@/utils/types";
import Mentors from "@/components/Mentors";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import VideosTestimonial from "@/components/VideosTestimonial";

export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
         query AdmissionPage {
          page(id: "admission", idType: URI) {
            slug
            title
            commonPageDetails {
              recruitersSection {
                  heading
                  imagesGallery
                  subHeading
              }
              contactSection {
                contactForm
                heading
                subHeading
              }
              faqSection {
                heading
                subHeading
              }
              sixBoxesGrid {
                careerSupport1 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                careerSupport2 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                careerSupport3 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                careerSupport4 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                careerSupport5 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                careerSupport6 {
                  briefContent
                  title
                  uploadImage {
                    node {
                      altText
                      mediaItemUrl
                      title
                    }
                  }
                }
                heading
                subHeading
              }
              successStoriesSection {
                heading
                subHeading
              }
              topBannerSection {
                subText
                title
                buttonLink {
                  target
                  title
                  url
                }
                uploadBackgroundImage {
                  node {
                    altText
                    mediaItemUrl
                    title
                  }
                }
              }
            }
            facultySectionOnPage {
              heading
              subHeading
              buttonLink {
                target
                title
                url
              }
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
        }}
            leftImageSection {
              content
              heading
              subHeading
              buttonLink {
                target
                title
                url
              }
              imageUpload {
                node {
                  altText
                  mediaItemUrl
                  title
                }
              }
            }
            processSteps {
              heading
              step1
              step2
              step3
              step5
              subHeading
              step4
              buttonLink {
                target
                title
                url
              }
              step6
            }
          }
        }
      `,
        });

        if (
            data &&
            data.page
        ) {
            const admissionPage = data.page;
            return {
                props: {
                    admissionPage,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching about page data:", error);
        return {
            props: {
                admissionPage: null,
            },
        };
    }
}
const Admission = ({ admissionPage }: any) => {
    const commonSection = admissionPage?.commonPageDetails;
    const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
    const [mentors, setMentors] = useState<any>([]);
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
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
              query SuccessQuery {
                    successStories(first: 4) {
                      edges {
                      node {
                          content
                          featuredImage {
                          node {
                              altText
                              mediaItemUrl
                              title
                          }
                          }
                          link
                          title
                          extraDetailFields {
                              companyName
                              readMoreLink {
                                  target
                                  title
                                  url
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
                    data.successStories &&
                    data.successStories.edges &&
                    data.successStories.edges.length > 0
                ) {
                    const videosData = data.successStories.edges.map((edge: any) => edge.node);
                    setMentors(videosData);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchVideos();
    }, []);
    return (
        <>
            <Head>
                <title>Admission</title>
                <meta name="description" content="Admission" />
            </Head>
            {
                commonSection &&
                <main>
                    <Banner
                        title={commonSection?.topBannerSection?.title}
                        desc={commonSection?.topBannerSection?.subText}
                        btnText={commonSection?.topBannerSection?.buttonLink?.title}
                        image={commonSection?.topBannerSection?.uploadBackgroundImage?.node?.mediaItemUrl}
                    />
                    <section className="admission-process">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.heading }} />
                                <p>{admissionPage?.processSteps?.subHeading}</p>
                            </div>
                            <div className="main-seprator sm-hide">
                                <Flex className="admission-process--items">
                                    <div className="admission-process--item">
                                        <p className="tag">1</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step1 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">3</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step3 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">5</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step5 }} />
                                    </div>
                                </Flex>
                            </div>
                            <div className="sm-hide">
                                <Flex className="admission-process--items last">
                                    <div className="admission-process--item">
                                        <p className="tag">2</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step2 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">4</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step4 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">6</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step6 }} />
                                    </div>
                                </Flex>
                            </div>
                            <div className="lg-hide">
                                <Flex className="admission-process--items">
                                    <div className="admission-process--item">
                                        <p className="tag">1</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step1 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">2</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step2 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">3</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step3 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">4</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step4 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">5</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step5 }} />
                                    </div>
                                    <div className="admission-process--item">
                                        <p className="tag">6</p>
                                        <div dangerouslySetInnerHTML={{ __html: admissionPage?.processSteps?.step6 }} />
                                    </div>
                                </Flex>
                            </div>
                            <a className="btn btn-primary" href={'/contact-us#contactForm'} target={admissionPage?.processSteps?.buttonLink?.target}>{admissionPage?.processSteps?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                        </div>
                    </section>
                    <section className="scholarship-program yellow-bg">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: admissionPage?.leftImageSection?.heading }} />
                                <p>{admissionPage?.leftImageSection?.subHeading}</p>
                            </div>
                            <Flex className="scholarship--row">
                                <div className="scholarship--image">
                                    <Image width={535} height={393} src={admissionPage?.leftImageSection?.imageUpload?.node?.mediaItemUrl} alt={admissionPage?.leftImageSection?.imageUpload?.node?.altText} />
                                </div>
                                <div className="scholarship--content" dangerouslySetInnerHTML={{ __html: admissionPage?.leftImageSection?.content }} />
                            </Flex>
                        </div>
                    </section>
                    <section className="our-students placements grey">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: commonSection?.sixBoxesGrid?.heading }} />
                                <p>{commonSection?.sixBoxesGrid?.subHeading}</p>
                            </div>
                            <Flex wrap="wrap" className="our-students">
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport1?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport1?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport1?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport1?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport1?.briefContent}</p>
                                </div>
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport2?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport2?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport2?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport2?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport2?.briefContent}</p>
                                </div>
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport3?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport3?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport3?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport3?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport3?.briefContent}</p>
                                </div>
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport4?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport4?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport4?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport4?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport4?.briefContent}</p>
                                </div>
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport5?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport5?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport5?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport5?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport5?.briefContent}</p>
                                </div>
                                <div className="our-students--item big">
                                    <Image
                                        height={206}
                                        width={368}
                                        src={commonSection?.sixBoxesGrid?.careerSupport6?.uploadImage.node.mediaItemUrl}
                                        alt={commonSection?.sixBoxesGrid?.careerSupport6?.uploadImage.node.altText}
                                        title={commonSection?.sixBoxesGrid?.careerSupport6?.uploadImage.node.title}
                                    />
                                    <h3>{commonSection?.sixBoxesGrid?.careerSupport6?.title}</h3>
                                    <p>{commonSection?.sixBoxesGrid?.careerSupport6?.briefContent}</p>
                                </div>
                            </Flex>
                            {/* <a className="btn btn-primary" href={commonSection?.sixBoxesGrid?.buttonLink?.url} target={commonSection?.sixBoxesGrid?.buttonLink?.target}>{commonSection?.sixBoxesGrid?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a> */}
                        </div>
                    </section>
                    <Contact white={true} content={commonSection?.contactSection} />
                    <section className="ranking-section grey">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: admissionPage?.logosSliderSection?.heading }} />
                                <p>{admissionPage?.logosSliderSection?.subHeading}</p>
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
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage1.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage2.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage3.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage4.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage5.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage6.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage7.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage8.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image width={225} height={120} src={admissionPage?.logosSliderSection?.uploadSliderImages?.sliderImage9.node.mediaItemUrl} alt="righ-arrow" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </section>
                    <FacultySection white={true} content={admissionPage?.facultySectionOnPage} />
                    <VideosTestimonial stats={commonSection?.successStoriesSection} />
                    {/* <Mentors successStrory={true} mentors={mentors} grey={true} content={commonSection?.successStoriesSection} /> */}
                    <section className="top-recruiters">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: commonSection?.recruitersSection?.heading }} />
                                <p>{commonSection?.recruitersSection?.subHeading}</p>
                            </div>
                            <div className="program-overview--content" dangerouslySetInnerHTML={{ __html: commonSection?.recruitersSection?.imagesGallery }} />
                        </div>
                    </section>
                    <FaqSection desc={commonSection?.faqSection?.subHeading} faqs={allFaqs} />
                </main>
            }
        </>
    );
};

export default Admission;