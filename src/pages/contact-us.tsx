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
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Head from "next/head";
import { AboutPage, ContactPage, Faq } from "@/utils/types";
import styles from "../styles/about-us.module.scss";
import FaqSection from "@/components/FaqSection";

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query AboutMainPageData {
          pages(where: { name: "Contact Us" }) {
            edges {
              node {
                contactUs {
                  bannerSection {
                    title
                    description
                    buttonUrl
                    buttonText
                    backgroundImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  contactDetails {
                    title
                    description
                    detail
                  }
                  contactForm {
                    title
                    description
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
      data.pages.edges[0].node.contactUs
    ) {
      const contactPageData = data.pages.edges[0].node.contactUs;

      return {
        props: {
          contactPageData,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      props: {
        contactPageData: null,
      },
    };
  }
}

const ContactUs = ({ contactPageData }: { contactPageData: ContactPage }) => {
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
        <title>Contact Us</title>
        <meta name="description" content={`Contact Us`} />
      </Head>

      {contactPageData && (
        <>
          <section
            className={`banner-section-normal ${styles.aboutBannerSec}`}
            style={{
              backgroundImage: `url(${contactPageData.bannerSection.backgroundImage.node.mediaItemUrl})`,
            }}
          >
            <div className={styles.contentWrap}>
              <h1 className="head-underline">
                {contactPageData.bannerSection.title}
              </h1>
              <h3>{contactPageData.bannerSection.description}</h3>
              <a
                href={'/contact-us#contactForm'}
                target="_blank"
                className="btn btn-primary"
              >
                {contactPageData.bannerSection.buttonText}
                <Image src={RightArrow} alt="" />
              </a>
            </div>
          </section>
          <section className={styles.aboutSec}>
            <div className={styles.contentWrap}>
              <div className="section-head">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: contactPageData.contactDetails.title,
                  }}
                />

                <p className="banner-desc">
                  {contactPageData.contactDetails.description}
                </p>
              </div>
            </div>
            <div className="container">
              <div
                dangerouslySetInnerHTML={{
                  __html: contactPageData.contactDetails.detail,
                }}
                className={styles.detailGrid}
              ></div>
            </div>
          </section>
          <section className={styles.formSec} id='contactForm'>
            <div className={styles.contentWrap}>
              <div className="section-head">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: contactPageData.contactForm.title,
                  }}
                />

                <p className="banner-desc">
                  {contactPageData.contactForm.description}
                </p>
              </div>
            </div>
            <div className={styles.formcard}>
              <h3>Contact Us</h3>
              <ContactForm />
            </div>
          </section>
          <FaqSection faqs={allFaqs} />
        </>
      )}
    </>
  );
};

export default ContactUs;
