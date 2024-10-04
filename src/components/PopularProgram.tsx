import React, { useState, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import Approved from "../images/approved.svg";
import Bag from "../images/bag.svg";
import Clock from "../images/clock.svg";
import Image from "next/image";
import { Select } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Link from "next/link";

const PopularProgram = ({ content, white, noFilter, selectedCat }: any) => {
    const [cats, setCats] = useState<any>([]);
    const [courses, setCourses] = useState<any>([]);

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
                                    courseCategoryFields {
                                        shortNameOfCourse
                                    }
                                  }
                                }
                            }
                        }
                    `,
                });
                if (data?.coursesCategories?.edges?.length > 0) {
                    const queryData = data.coursesCategories.edges.map((edge: any) => edge.node);
                    setCats(queryData);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
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
                if (data?.courses?.edges?.length > 0) {
                    const queryData = data.courses.edges.map((edge: any) => edge.node);
                    setCourses(queryData);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchData();
    }, []);

    const [tabs, setTabs] = useState(selectedCat ? selectedCat : '');

    // Filter courses based on selected category, or show all courses if no category is selected
    const filteredCourses = tabs
        ? courses?.filter((course: any) => course?.coursesCategories?.edges.some((cat: any) => cat.node.name === tabs))
        : courses;

    const handleCategoryClick = (category: any) => {
        setTabs((prevCategory : any) => prevCategory === category ? null : category);
    };

    const handleChange = (value: string) => {
        handleCategoryClick(value);
    };

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <>
            <section className={white ? '' : "grey"}>
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: content?.title ? content?.title : content?.heading }} />
                        <p>{content?.subHeading}</p>
                    </div>
                    <Flex vertical gap={40} className="courses-layout">
                        <Flex gap={20} className="courses-row">
                            <div className="courses-filter">
                                <div className="courses-filter--head">
                                    <p>Filter</p>
                                </div>
                                <div className="courses-filter--items">
                                    <div>
                                        <h6>By Course</h6>
                                        {
                                            isMobile ?
                                                <Select onChange={handleChange} style={{ width: 260, margin: '6px 0 10px', height: '40px' }} placeholder="Select Course">
                                                    <Select.Option value={''} key={'all'}>MIT IDE</Select.Option>
                                                    {cats?.map((category: any, index: number) => (
                                                        <Select.Option value={category.name} key={index}>{category.name}</Select.Option>
                                                    ))}
                                                </Select> :
                                                <div className="filter-item-list">
                                                    <Flex gap={10} className={`filter-item ${!tabs ? 'active' : ''}`} onClick={() => setTabs('')}>
                                                        <p>MIT SDE</p>
                                                    </Flex>
                                                    {cats?.map((category: any, index: number) => (
                                                        <Flex gap={10} key={index} className={`filter-item ${category?.name === tabs ? 'active' : ''}`} onClick={() => setTabs(category?.name)}>
                                                            <p>{category?.courseCategoryFields?.shortNameOfCourse}</p>
                                                        </Flex>
                                                    ))}
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="courses-course--head">
                                    <p>All Courses</p>
                                </div>
                                <Flex wrap="wrap" gap={16}>
                                    {filteredCourses?.map((course: any, index: number) => {
                                        const categorySlug = course?.coursesCategories?.edges[0]?.node?.slug;
                                        const courseSlug = course?.slug;

                                        return (
                                            <Link href={`/courses/${categorySlug}/${courseSlug}`} key={index} className="courses-card">
                                                <div>
                                                    <Image
                                                        className="program-image"
                                                        width={274}
                                                        height={190}
                                                        src={course?.featuredImage?.node?.mediaItemUrl}
                                                        alt={course?.title}
                                                        title={course?.title}
                                                    />
                                                    <Flex vertical gap={12} className="content">
                                                        <h4>{course?.title}</h4>
                                                        <Flex gap={5}>
                                                            <Image height={18} width={18} src={Approved} alt="Approved Icon" />
                                                            <p>{course?.courseDetails?.approvedBy}</p>
                                                        </Flex>
                                                        <Flex gap={5}>
                                                            <Image height={18} width={18} src={Bag} alt="Work Experience Icon" />
                                                            <p>{course?.courseDetails?.graduateWithWorkExperience}</p>
                                                        </Flex>
                                                        <Flex gap={5}>
                                                            <Image height={18} width={18} src={Clock} alt="Duration Icon" />
                                                            <p>{course?.courseDetails?.courseDuration}</p>
                                                        </Flex>
                                                    </Flex>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </Flex>
                            </div>
                        </Flex>
                    </Flex>
                    <Flex justify="center">
                        <a href={'/contact-us#contactForm'} target={content?.buttonLink?.target ? content?.buttonLink?.target : '_blank'} className="btn btn-primary">
                            {content?.buttonLink?.title ? content?.buttonLink?.title : 'Enroll Now'}
                            <Image width={20} height={20} src={RightArrow} alt="right-arrow" />
                        </a>
                    </Flex>
                </div>
            </section>
        </>
    );
};

export default PopularProgram;
