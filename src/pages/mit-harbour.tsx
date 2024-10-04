import React, { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/components/Banner";
import client from "../../client";
import { gql } from "@apollo/client";
import { Flex, Modal } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Contact from "@/components/Contact";
import FaqSection from "@/components/FaqSection";
import { Faq } from "@/utils/types";
import dayjs from "dayjs";
import Mentors from "@/components/Mentors";
import CalendarIcon from '../images/calendar-orange.svg';
import ClockIcon from '../images/clock-orange.svg';
import Head from "next/head";


export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
        query MitPage {
            page(id: "mit-harbour", idType: URI) {
                trainingPriceSection {
                    priceBox1 {
                        details
                        price
                        bookNowLink {
                            target
                            title
                            url
                        }
                    }
                    priceBox2 {
                        details
                        price
                        bookNowLink {
                            target
                            title
                            url
                        }
                    }
                    priceBox3 {
                        details
                        price
                        bookNowLink {
                        target
                        title
                        url
                        }
                    }
                    subtitle
                    title
                }
                title
                slug
                pageExtraFields {
                    mentorSection {
                        heading
                        subHeading
                    }
                    workshopSection {
                        heading
                        subHeading
                        buttonLink {
                        target
                        title
                        url
                        }
                    }
                }
                offeringGridLayout {
                    box1
                    box2
                    box3
                    box4
                    box5
                    box6
                    subtitle
                    title
                }
                link
                advantagesSection {
                    advantage1
                    advantage2
                    advantage3
                    advantage4
                    advantage5
                    subTitle
                    sectionTitle
                }
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
                    overviewContentSection
                    imageUploadSection {
                    node {
                        altText
                        mediaItemUrl
                        title
                    }
                    }
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
                        title
                        mediaItemUrl
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
            data.page
        ) {
            const mitPage = data.page;
            return {
                props: {
                    mitPage,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching about page data:", error);
        return {
            props: {
                mitPage: null,
            },
        };
    }
}
const MitHarbour = ({ mitPage }: any) => {
    const commonSection = mitPage?.commonPageDetails;
    const extraDetails = mitPage?.pageExtraFields;
    const [allFaqs, setAllFaqs] = useState<Faq[]>([]);
    const [workshops, setWorkshops] = useState<any>([]);
    const [mentors, setMentors] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
                        query GetWorkshops {
                            workshops {
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
                                title
                                workshopDetails {
                                    endTime
                                    paymentForSubscriptionForm
                                    startTime
                                    workshopDate
                                }
                                }
                            }
                        }
                    }
              `,
                });

                if (data && data.workshops && data.workshops.edges && data.workshops.edges.length > 0) {
                    setWorkshops(data.workshops.edges.map((edge: any) => edge.node));
                }
            } catch (error) {
                console.error("Error fetching FAQ data:", error);
            }
        };
        fetchData();
    }, []);
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
                query IndustryQuery {
                    industryMentors {
                        edges {
                        node {
                            content
                            extraDetailFields {
                            companyName
                            readMoreLink {
                                target
                                title
                                url
                            }
                            }
                            featuredImage {
                            node {
                                altText
                                mediaItemUrl
                                title
                            }
                            }
                            title
                        }
                        }
                    }
                }
          `,
                });
                if (
                    data &&
                    data.industryMentors &&
                    data.industryMentors.edges &&
                    data.industryMentors.edges.length > 0
                ) {
                    const videosData = data.industryMentors.edges.map((edge: any) => edge.node);
                    setMentors(videosData);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchVideos();
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Head>
                <title>Mit Harbour</title>
                {/* <title>{aboutPageData.seo.title}</title>
                <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
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
                    <section className="ovreview-section">
                        <div className="container">
                            <Flex className="ovreview-section--row">
                                <div className="left-content">
                                    <h2 dangerouslySetInnerHTML={{ __html: commonSection?.overviewSection?.contentSectionHeading }} />
                                    <a className="btn btn-primary"
                                        href={'/contact-us#contactForm'}
                                        target={commonSection?.overviewSection?.buttonLink?.target}
                                    >
                                        {commonSection?.overviewSection?.buttonLink?.title}
                                        <Image width={20} height={20} src={RightArrow} alt="righ-arrow" />
                                    </a>
                                </div>
                                <div className="right-content">
                                    <div dangerouslySetInnerHTML={{ __html: commonSection?.overviewSection?.overviewContentSection }} />
                                </div>
                            </Flex>
                        </div>
                    </section>
                    <section className="grey advantage-harbour">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.sectionTitle }} />
                                <p>{mitPage?.advantagesSection?.subTitle}</p>
                            </div>
                            <Flex wrap="wrap" className="advantage-harbour--row">
                                <div className="advantage-harbour--item" dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.advantage1 }} />
                                <div className="advantage-harbour--item" dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.advantage2 }} />
                                <div className="advantage-harbour--item" dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.advantage3 }} />
                                <div className="advantage-harbour--item" dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.advantage4 }} />
                                <div className="advantage-harbour--item" dangerouslySetInnerHTML={{ __html: mitPage?.advantagesSection?.advantage5 }} />
                            </Flex>
                        </div>
                    </section>
                    <section className="offering">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.title }} />
                                <p>{mitPage?.offeringGridLayout?.subtitle}</p>
                            </div>
                            <Flex wrap="wrap" className="offering--row">
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box1 }} />
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box2 }} />
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box3 }} />
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box4 }} />
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box5 }} />
                                <div className="offering--row--item" dangerouslySetInnerHTML={{ __html: mitPage?.offeringGridLayout?.box6 }} />
                            </Flex>
                        </div>
                    </section>
                    <section className="grey pricing">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: mitPage?.trainingPriceSection?.title }} />
                                <p>{mitPage?.trainingPriceSection?.subtitle}</p>
                            </div>
                            <Flex wrap="wrap" className="pricing--row">
                                <div className="pricing--item">
                                    <div className="pricing--item--content" dangerouslySetInnerHTML={{ __html: mitPage?.trainingPriceSection?.priceBox1.details }} />
                                    <p className="price">{mitPage?.trainingPriceSection?.priceBox1.price}</p>
                                    <button className="btn btn-primary" onClick={showModal}>
                                        {mitPage?.trainingPriceSection?.priceBox1?.bookNowLink?.title}
                                    </button>
                                </div>
                                <div className="pricing--item active">
                                    <div className="pricing--item--content" dangerouslySetInnerHTML={{ __html: mitPage?.trainingPriceSection?.priceBox2.details }} />
                                    <p className="price">{mitPage?.trainingPriceSection?.priceBox2.price}</p>
                                    <button className="btn btn-primary" onClick={showModal}>
                                        {mitPage?.trainingPriceSection?.priceBox2?.bookNowLink?.title}
                                    </button>
                                </div>
                                <div className="pricing--item">
                                    <div className="pricing--item--content" dangerouslySetInnerHTML={{ __html: mitPage?.trainingPriceSection?.priceBox3.details }} />
                                    <p className="price">{mitPage?.trainingPriceSection?.priceBox3.price}</p>
                                    <button className="btn btn-primary" onClick={showModal}>
                                        {mitPage?.trainingPriceSection?.priceBox3?.bookNowLink?.title}
                                    </button>
                                </div>
                            </Flex>
                        </div>
                    </section>
                    <section className="workshops">
                        <div className="container">
                            <div className="section-head">
                                <h2 dangerouslySetInnerHTML={{ __html: extraDetails?.workshopSection?.heading }} />
                                <p>{extraDetails?.workshopSection?.subHeading}</p>
                            </div>
                            <Flex className="workshop--list" wrap="wrap">
                                {workshops?.map((workshop: any, index: number) => (
                                    <div className="workshop--item" key={index}>
                                        <div className="workshop--item--image">
                                            <Image width={370} height={208} src={workshop.featuredImage.node.mediaItemUrl} alt={workshop.featuredImage.node.altText} />
                                        </div>
                                        <div className="workshop--item--content">
                                            <Flex className="workshop--item--date">
                                                <Flex align="center" gap={6}>
                                                    <Image width={18} height={18} src={CalendarIcon} alt="calendar-icon" />
                                                    <p>{dayjs(workshop.workshopDetails.workshopDate).format("DD MMM YYYY")}</p>
                                                </Flex>
                                                <Flex align="center" gap={6}>
                                                    <Image width={16} height={16} src={ClockIcon} alt="clock-icon" />
                                                    <p>{workshop.workshopDetails.startTime} - {workshop.workshopDetails.endTime}</p>
                                                </Flex>
                                            </Flex>
                                            <h4>{workshop.title}</h4>
                                            <div className="workshop--item--info" dangerouslySetInnerHTML={{ __html: workshop.content }} />
                                        </div>
                                    </div>
                                ))}
                            </Flex>
                            <a className="btn btn-primary"
                                href={extraDetails?.workshopSection?.buttonLink?.url}
                                target={extraDetails?.workshopSection?.buttonLink?.target}
                            >
                                {extraDetails?.workshopSection?.buttonLink?.title}
                                <Image width={20} height={20} src={RightArrow} alt="righ-arrow" />
                            </a>
                        </div>
                    </section>
                    <Contact content={commonSection?.contactSection} />
                    <Mentors content={extraDetails?.mentorSection} mentors={mentors} />
                    <FaqSection desc={commonSection?.faqSection?.subHeading} faqs={allFaqs} />
                    {/* Modals */}
                    <Modal title="" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                        <Flex gap={34} vertical>
                            <div>
                                <h3>Payment for Subscription</h3>
                                <p className="modal-des">Enter Only Admission ID. We Will get your information from database.</p>
                            </div>
                            <form action="">
                                <p>Form fields wil come here!!</p>
                            </form>
                            <div>
                                <button className="btn btn-primary" onClick={handleOk}>Pay Now <Image width={20} height={20} src={RightArrow} alt="righ-arrow" /></button>
                            </div>
                            <Flex gap={17} className="inner--links">
                                <a href="#">Terms and condition</a>
                                <a href="#">Terms and condition</a>
                                <a href="#">Terms and condition</a>
                            </Flex>
                        </Flex>
                    </Modal>
                </main>
            }
        </>
    );
};

export default MitHarbour;