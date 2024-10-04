// import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  MISSION,
  VISION,
  RightArrow,
  LinkedInIcon,
} from "@/utils/image-constants";
import React, { useEffect, useState } from "react";
import client from "../../client";
import { gql } from "@apollo/client";
import { Col, Flex, Row } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Head from "next/head";
import { AboutPage, Faq } from "@/utils/types";
import styles from "../styles/about-us.module.scss";
import Link from "next/link";
import FaqSection from "@/components/FaqSection";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query AboutMainPageData {
          pages(where: { name: "About Us" }) {
            edges {
              node {
                aboutUs {
                  bannerSection {
                    bannerTitle
                    description
                    buttonText
                    buttonLink {
                      url
                    }
                    backgroundImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  secondSection {
                    sectionTitle
                    description
                    buttonText
                    buttonLink {
                      url
                    }
                  }
                  twoColumnsGrid {
                    column1 {
                      subText
                      icon {
                        node {
                          mediaItemUrl
                        }
                      }
                      columnTitle
                    }
                    column2 {
                      columnTitle
                      subText
                      icon {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                  meetOurLeadership {
                    heading
                    subHeading
                    leadership1 {
                      name
                      designation
                      socialLink
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                    leadership2 {
                      name
                      designation
                      socialLink
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                    leadership3 {
                      name
                      designation
                      socialLink
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                    leadership4 {
                      name
                      designation
                      socialLink
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                    leadership5 {
                      name
                      designation
                      socialLink
                      image {
                        node {
                          mediaItemUrl
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
      data.pages.edges[0].node.aboutUs
    ) {
      const aboutPageData = data.pages.edges[0].node.aboutUs;

      return {
        props: {
          aboutPageData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      props: {
        aboutPageData: null,
      },
    };
  }
}

const AboutUs = ({ aboutPageData }: { aboutPageData: AboutPage }) => {
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

        if (data && data.faqs && data.faqs.edges) {
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
        <title>About Us</title>
        {/* <title>{aboutPageData.seo.title}</title>
        <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
      </Head>

      {aboutPageData && (
        <>
          <section
            className={`banner-section ${styles.aboutBannerSec}`}
            style={{
              backgroundImage: `url(${aboutPageData.bannerSection.backgroundImage.node.mediaItemUrl})`,
            }}
          >
            <div className={styles.contentWrap}>
              <h1 className="head-underline">
                {aboutPageData.bannerSection.bannerTitle}
              </h1>
              <div className="banner-desc" dangerouslySetInnerHTML={{ __html: aboutPageData.bannerSection.description ? aboutPageData.bannerSection.description : "desc" }} />
              <a
                href={'/contact-us#contactForm'}
                target="_blank"
                className="btn btn-primary"
              >
                {aboutPageData.bannerSection.buttonText}
                <Image src={RightArrow} alt="" />
              </a>
            </div>
          </section>
          <section className={styles.aboutSec}>
            <div className={styles.contentWrap}>
              <div className="section-head">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: aboutPageData.secondSection.sectionTitle,
                  }}
                />
                <p className="banner-desc">
                  {aboutPageData.secondSection.description}
                </p>
              </div>
            </div>
          </section>
          <section className={`bg-grey ${styles.visionMission}`}>
            <div className={styles.visionMissionGrid}>
              <div className={styles.vmBox}>
                <Image
                  src={
                    aboutPageData.twoColumnsGrid.column1.icon.node.mediaItemUrl
                  }
                  alt=""
                  width={62}
                  height={62}
                />
                <h3>{aboutPageData.twoColumnsGrid.column1.columnTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: aboutPageData.twoColumnsGrid.column1.subText ? aboutPageData.twoColumnsGrid.column1.subText : "desc" }} />
              </div>
              <div className={styles.vmBox}>
                <Image
                  src={
                    aboutPageData.twoColumnsGrid.column2.icon.node.mediaItemUrl
                  }
                  alt=""
                  width={62}
                  height={62}
                />
                <h3>{aboutPageData.twoColumnsGrid.column2.columnTitle}</h3>
                <p>{aboutPageData.twoColumnsGrid.column2.subText}</p>
              </div>
            </div>
          </section>
          <section>
            <div className="section-head">
              <h2
                dangerouslySetInnerHTML={{
                  __html: aboutPageData.meetOurLeadership.heading,
                }}
              />

              <p className="banner-desc">
                {aboutPageData.meetOurLeadership.subHeading}
              </p>
            </div>
            <div className="container">
              <div className={styles.leadershipGrid}>
                <div className={styles.leadershipBox}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={
                        aboutPageData.meetOurLeadership.leadership1.image.node
                          .mediaItemUrl
                      }
                      alt=""
                      width={370}
                      height={243}
                      layout="responsive"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.contentWrap}>
                    <Link
                      href={
                        aboutPageData.meetOurLeadership.leadership1.socialLink
                      }
                    >
                      <Image src={LinkedInIcon} alt="" width={30} height={30} />
                    </Link>

                    <h3>{aboutPageData.meetOurLeadership.leadership1.name}</h3>
                    <p>
                      {aboutPageData.meetOurLeadership.leadership1.designation}
                    </p>
                  </div>
                </div>
                <div className={styles.leadershipBox}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={
                        aboutPageData.meetOurLeadership.leadership2.image.node
                          .mediaItemUrl
                      }
                      alt=""
                      width={370}
                      height={243}
                      layout="responsive"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.contentWrap}>
                    <Link
                      href={
                        aboutPageData.meetOurLeadership.leadership2.socialLink
                      }
                    >
                      <Image src={LinkedInIcon} alt="" width={30} height={30} />
                    </Link>

                    <h3>{aboutPageData.meetOurLeadership.leadership2.name}</h3>
                    <p>
                      {aboutPageData.meetOurLeadership.leadership2.designation}
                    </p>
                  </div>
                </div>
                <div className={styles.leadershipBox}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={
                        aboutPageData.meetOurLeadership.leadership3.image.node
                          .mediaItemUrl
                      }
                      alt=""
                      width={370}
                      height={243}
                      layout="responsive"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.contentWrap}>
                    <Link
                      href={
                        aboutPageData.meetOurLeadership.leadership3.socialLink
                      }
                    >
                      <Image src={LinkedInIcon} alt="" width={30} height={30} />
                    </Link>

                    <h3>{aboutPageData.meetOurLeadership.leadership3.name}</h3>
                    <p>
                      {aboutPageData.meetOurLeadership.leadership3.designation}
                    </p>
                  </div>
                </div>
                <div className={styles.leadershipBox}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={
                        aboutPageData.meetOurLeadership.leadership4.image.node
                          .mediaItemUrl
                      }
                      alt=""
                      width={370}
                      height={243}
                      layout="responsive"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.contentWrap}>
                    <Link
                      href={
                        aboutPageData.meetOurLeadership.leadership4.socialLink
                      }
                    >
                      <Image src={LinkedInIcon} alt="" width={30} height={30} />
                    </Link>

                    <h3>{aboutPageData.meetOurLeadership.leadership4.name}</h3>
                    <p>
                      {aboutPageData.meetOurLeadership.leadership4.designation}
                    </p>
                  </div>
                </div>
                <div className={styles.leadershipBox}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={
                        aboutPageData.meetOurLeadership.leadership5.image.node
                          .mediaItemUrl
                      }
                      alt=""
                      width={370}
                      height={243}
                      layout="responsive"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.contentWrap}>
                    <Link
                      href={
                        aboutPageData.meetOurLeadership.leadership5.socialLink
                      }
                    >
                      <Image src={LinkedInIcon} alt="" width={30} height={30} />
                    </Link>

                    <h3>{aboutPageData.meetOurLeadership.leadership5.name}</h3>
                    <p>
                      {aboutPageData.meetOurLeadership.leadership5.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FaqSection faqs={allFaqs} />
        </>
      )}
    </>
  );
};

export default AboutUs;
