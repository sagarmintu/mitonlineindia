import React, { useEffect, useState } from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../../client";
import HomeBanner from "@/components/HomeBanner";
import Welcome from "@/components/Welcome";
import Advantages from "@/components/Advantage";
import Contact from "@/components/Contact";
import RecentPost from "@/components/RecentPost";
import VideosTestimonial from "@/components/VideosTestimonial";
import PopularProgram from "@/components/PopularProgram";
import MitHarbour from "@/components/MitHarbour";
import FaqSection from "@/components/FaqSection";
import CompanyLogo from "@/components/CompanyLogo";
import Placement from "@/components/Placement";
import FacultySection from "@/components/FacultySection";
import { Faq } from "@/utils/types";

export async function getServerSideProps() {
    try {
      const { data } = await client.query({
        query: gql`
        query HomePage {
            pages(where: {name: "home"}) {
              edges {
                node {
                  home {
                    intoduction {
                        buttonLink {
                            target
                            title
                            url
                        }
                        leftContent
                        rightContent
                    }
                    videoSection {
                      heading
                      subHeading
                      button {
                        target
                        title
                        url
                      }
                    }
                    placementSection {
                      heading
                      subHeading
                    }
                    getFinancialAidSection {
                      box1
                      box2
                      heading
                      subHeading
                      button {
                        target
                        title
                        url
                      }
                    }
                    coursesSection {
                      buttonLink {
                        target
                        title
                        url
                      }
                      subHeading
                      title
                    }
                    facultySection {
                      heading
                      subHeading
                    }
                    companyLogos
                    contectSection {
                      contactForm
                      heading
                      subHeading
                    }
                    blogSection {
                      heading
                      subHeading
                    }
                    faqSection {
                      heading
                      subHeading
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
        data.pages.edges[0].node.home
      ) {
        const homePageData = data.pages.edges[0].node.home;
  
        return {
          props: {
            homePageData,
          },
        };
      }
    } catch (error) {
      console.error("Error fetching about page data:", error);
      return {
        props: {
          homePageData: null,
        },
      };
    }
}

const Home = ({homePageData}: any) => {
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
                <title>Home</title>
                <meta name="description" content="Home" />
            </Head>
            {homePageData && homePageData?.intoduction &&
              <>
                <HomeBanner />
                <Welcome content={homePageData?.intoduction} />
                <PopularProgram content={homePageData?.coursesSection} />
                <Advantages />
                <MitHarbour content={homePageData?.getFinancialAidSection} />
                <Contact content={homePageData?.contectSection} />
                <FacultySection content={homePageData?.facultySection} />
                <Placement content={homePageData?.placementSection} />
                <CompanyLogo content={homePageData?.companyLogos} />
                <VideosTestimonial stats={homePageData?.videoSection} />
                <section className="recentPots">
                    <div className="container">
                        <div className="section-head">
                            <h2 dangerouslySetInnerHTML={{ __html: homePageData?.blogSection?.heading }} />
                            <p className="banner-desc">{homePageData?.blogSection?.subHeading}</p>
                        </div>
                        <RecentPost />
                    </div>
                </section>
                <FaqSection desc={homePageData?.faqSection?.subHeading} faqs={allFaqs} />
              </>
            }
        </>
    );
};
export default Home;