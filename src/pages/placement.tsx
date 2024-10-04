import React, { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@/components/Banner";
import client from "../../client";
import { gql } from "@apollo/client";
import {Flex} from "antd";
import RightArrow from "../images/right-arrow.svg";
import FacultySection from "@/components/FacultySection";
import Contact from "@/components/Contact";
import { Faq } from "@/utils/types";
import FaqSection from "@/components/FaqSection";
import Mentors from "@/components/Mentors";
import VideosTestimonial from "@/components/VideosTestimonial";
import Head from "next/head";


export async function getServerSideProps() {
    try {
      const { data } = await client.query({
        query: gql`
        query PlacementPage {
          page(id: "placement", idType: URI) {
            slug
            title
            commonPageDetails {
              contactSection {
                contactForm
                heading
                subHeading
              }
              faqSection {
                heading
                subHeading
              }
              overviewSection {
                buttonLink {
                  target
                  title
                  url
                }
                contentSectionHeading
                imageUploadSection {
                  node {
                    altText
                    mediaItemUrl
                    title
                  }
                }
                overviewContentSection
              }
              placementSection {
                buttonLink {
                  target
                  title
                  url
                }
                heading
                subHeading
              }
              recruitersSection {
                heading
                imagesGallery
                subHeading
              }
              sixBoxesGrid {
                careerSupport1 {
                  title
                  briefContent
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
          }
        }
        `,
      });
  
      if (
        data &&
        data.page &&
        data.page.commonPageDetails
      ) {
        const placementPageData = data.page.commonPageDetails;
        return {
          props: {
            placementPageData,
          },
        };
      }
    } catch (error) {
      console.error("Error fetching about page data:", error);
      return {
        props: {
          placementPageData: null,
        },
      };
    }
}

const Admission = ({ placementPageData }: any) => {
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
            try { const { data } = await client.query({query: gql`
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
          `,});
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
          <title>Placements</title>
          {/* <title>{aboutPageData.seo.title}</title>
          <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
        </Head>
       {placementPageData &&
        <main>
            <Banner
              title={placementPageData?.topBannerSection?.title}
              desc={placementPageData?.topBannerSection?.subText}
              btnText={placementPageData?.topBannerSection?.buttonLink?.title}
              image={placementPageData?.topBannerSection?.uploadBackgroundImage?.node?.mediaItemUrl}
            />
            <section className="program-overview">
                <div className="container">
                    <Flex className="program-overview--image-row">
                        <div>
                            <h2 dangerouslySetInnerHTML={{ __html: placementPageData?.overviewSection?.contentSectionHeading }} />
                            <div className="program-overview--content" dangerouslySetInnerHTML={{ __html: placementPageData?.overviewSection?.overviewContentSection }} />
                            <a className="btn btn-primary" href={'/contact-us#contactForm'} target={placementPageData?.overviewSection?.buttonLink?.target}>{placementPageData?.overviewSection?.buttonLink?.title} <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></a>
                        </div>
                        <div className="program-overview--image">
                            <Image width={513} height={393} src={placementPageData?.overviewSection?.imageUploadSection?.node?.mediaItemUrl} alt={placementPageData?.overviewSection?.imageUploadSection?.node?.altText} />
                        </div>
                    </Flex>
                </div>
            </section>
            <section className="our-students placements grey">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: placementPageData?.sixBoxesGrid?.heading }} />
                        <p>{placementPageData?.sixBoxesGrid?.subHeading}</p>
                    </div>
                    <Flex wrap="wrap" className="our-students">
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport1?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport1?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport1?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport1?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport1?.briefContent}</p>
                        </div>
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport2?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport2?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport2?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport2?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport2?.briefContent}</p>
                        </div>
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport3?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport3?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport3?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport3?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport3?.briefContent}</p>
                        </div>
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport4?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport4?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport4?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport4?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport4?.briefContent}</p>
                        </div>
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport5?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport5?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport5?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport5?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport5?.briefContent}</p>
                        </div>
                        <div className="our-students--item">
                            <Image
                                height={206}
                                width={368}
                                src={placementPageData?.sixBoxesGrid?.careerSupport6?.uploadImage.node.mediaItemUrl}
                                alt={placementPageData?.sixBoxesGrid?.careerSupport6?.uploadImage.node.altText}
                                title={placementPageData?.sixBoxesGrid?.careerSupport6?.uploadImage.node.title}
                            />
                            <h3>{placementPageData?.sixBoxesGrid?.careerSupport6?.title}</h3>
                            <p>{placementPageData?.sixBoxesGrid?.careerSupport6?.briefContent}</p>
                        </div>
                    </Flex>
                </div>
            </section>
            <FacultySection white={true} content={placementPageData?.placementSection} />
            <Contact content={placementPageData?.contactSection} />
            {/* <Mentors successStrory={true} mentors={mentors} grey={true} content={placementPageData?.successStoriesSection} /> */}
            <VideosTestimonial stats={placementPageData?.successStoriesSection} />
            <section className="top-recruiters">
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: placementPageData?.recruitersSection?.heading }} />
                        <p>{placementPageData?.recruitersSection?.subHeading}</p>
                    </div>
                    <div className="program-overview--content" dangerouslySetInnerHTML={{ __html: placementPageData?.recruitersSection?.imagesGallery }} />
                </div>
            </section>
            <FaqSection desc={placementPageData?.faqSection?.subHeading} faqs={allFaqs} />
        </main>}
      </>
    );
};

export default Admission;

