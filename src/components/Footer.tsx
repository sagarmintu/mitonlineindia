import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import Image from "next/image";
import Link from "next/link";
import { Flex } from "antd";
import {
    Linkedin,
    Facebook,
    Instagram,
} from "@/utils/image-constants";

const Footer = () => {
    const [courses, setCourses] = useState<any>();
    const [content, setContent] = useState<any>([]);
    const [cats, setCats] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
          query FetchData {
            themeGlobalSetting(id: "footer-settings", idType: SLUG) {
              globalFooterSettings {
                footerBottomContent {
                  copyrightText
                  privacyPageUrl
                  termsAndConditionsUrl
                }
                footerMiddleContent {
                  content1
                  content2
                  content3
                  content4
                }
                footerTopContent {
                  facebookUrl
                  instagramUrl
                  linkedinUrl
                  shortDescription
                  uploadSiteLogo {
                    node {
                      altText
                      mediaItemUrl
                      slug
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
                    data.themeGlobalSetting &&
                    data.themeGlobalSetting.globalFooterSettings
                ) {
                    setContent(data.themeGlobalSetting.globalFooterSettings)
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
          query GetCourses {
              courses(first: 100) {
                  edges {
                    node {
                      content
                      courseDetails {
                        approvedBy
                        courseDuration
                        graduateWithWorkExperience
                      }
                      date
                      dateGmt
                      featuredImage {
                        node {
                          altText
                          mediaItemUrl
                          title
                        }
                      }
                      link
                      slug
                      title
                      tags {
                        edges {
                          node {
                            slug
                            name
                            link
                          }
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
                    }
                  }
                }
            }
        `,
                });
                if (
                    data &&
                    data.courses &&
                    data.courses.edges &&
                    data.courses.edges.length > 0
                ) {
                    const queryData = data.courses.edges.map((edge: any) => edge.node);
                    setCourses(queryData)
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await client.query({
                    query: gql`
                        query GetCategories {
                            coursesCategories(first: 100) {
                                edges {
                                  node {
                                    name
                                    link
                                    slug
                                  }
                                }
                            }
                        }
                    `,
                });
                if (
                    data &&
                    data.coursesCategories &&
                    data.coursesCategories.edges &&
                    data.coursesCategories.edges.length > 0
                ) {
                    const queryData = data.coursesCategories.edges.map((edge: any) => edge.node);
                    // Group categories by parent
                    setCats(queryData)
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    const groupCoursesByCategory = (courses: any, categories: any) => {
        const groupedCourses: { [key: string]: any } = {};

        categories?.forEach((category: any) => {
            groupedCourses[category.name] = [];
        });

        courses?.forEach((course: any) => {
            course.coursesCategories.edges.forEach((edge : any) => {
                const categoryName = edge.node.name;
                if (groupedCourses[categoryName]) {
                    groupedCourses[categoryName].push(course);
                }
            });
        });
        return groupedCourses;
    };
    const firstHalf = cats?.slice(0, 5);
    const secondHalf = cats?.slice(5, 7);
    const groupedCourses = groupCoursesByCategory(courses, cats);
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-top">
                        <div>
                            {
                                content?.footerTopContent?.uploadSiteLogo?.node?.mediaItemUrl &&
                                <Link href="/"><Image width={114} height={34} src={content.footerTopContent.uploadSiteLogo.node.mediaItemUrl} alt="MIT Logo" /></Link>
                            }
                            <p>
                                {content?.footerTopContent?.shortDescription}
                            </p>
                        </div>
                        <div className="social-media-links">
                            <a target="_blank" href={content?.footerTopContent?.instagramUrl}><Image src={Instagram} alt="Instagram" /></a>
                            <a target="_blank" href={content?.footerTopContent?.facebookUrl}><Image src={Facebook} alt="Facebook" /></a>
                            <a target="_blank" href={content?.footerTopContent?.linkedinUrl}><Image src={Linkedin} alt="Linkedin" /></a>
                        </div>
                    </div>
                    <div>
                        <Flex wrap="wrap" gap={30} className="footer-main--links">                            
                            <Flex wrap="wrap" gap={30} vertical>                                
                                    <div className="footer-links">
                                        <h3>Quick Links</h3>
                                        <ul>
                                            <li>
                                                    <a href={`/institute`} target="_blank">
                                                    Institute
                                                    </a>
                                            </li>
                                            <li>
                                                    <a href={`/placement`} target="_blank">
                                                    Placement
                                                    </a>
                                            </li>
                                            <li>
                                                    <a href={`/admission`} target="_blank">
                                                    Admission
                                                    </a>
                                            </li>
                                            <li>
                                                    <a href={`/mit-harbour`} target="_blank">
                                                    MIT Harbour
                                                    </a>
                                            </li>                                               
                                        </ul>
                                    </div>                             
                            </Flex> 
                            <Flex wrap="wrap" gap={10} vertical className="footer-links">
                                <h3>Programs</h3>
                                <ul>
                                {cats?.map((category: any) => (
                                    <li key={category.slug}>
                                        <a href={`/courses/${category.slug}`} target="_blank"> {category.name}</a>
                                        {/* <ul>
                                            
                                                <li key={category.slug}>
                                                    <a href={`/courses/${category.slug}`} target="_blank">
                                                       {category.name}
                                                    </a>
                                                </li>                                            
                                        </ul> */}
                                    </li>
                                ))}
                                </ul>
                            </Flex>                           
                        </Flex>
                    </div>
                    <div className="footer-bottom">
                        <p>{content?.footerBottomContent?.copyrightText}</p>
                        <div className="footer-bottom--links">
                            <a href={content?.footerBottomContent?.termsAndConditionsUrl}>Terms & Conditions</a>
                            <a href={content?.footerBottomContent?.privacyPageUrl}>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
