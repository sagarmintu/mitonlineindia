import React, { useEffect, useState, useRef } from "react";
import client from "../../../../client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import dayjs from "dayjs";
import Banner from "@/components/Banner";
import RecentPost from "@/components/RecentPost";
import Head from "next/head";

interface Post {
    slug: string;
    title: string;
    content: any;
    link: string;
    date: string;
    excerpt: string;
    seo: {
        metaDesc: string;
        title: string;
        readingTime: number;
    };
    blogPost: {
        uploadBannerForTopSection: {
            node: {
                mediaItemUrl: string;
            };
        };
        bannerDescription: string;
        authorName: string;
        authorProfileImage: {
            node: {
                altText: string;
                mediaItemUrl: string;
                title: string;
            };
        };
    };
    blog: {
        authorName: string;
    };
    featuredImage: {
        node: {
            mediaItemUrl: string;
        };
    };
}
interface Props {
    post: Post | null;
}

const PostPage = ({ post }: Props) => {
    const router = useRouter();

    const [activeHeading, setActiveHeading] = useState(1);
    const [headings, setHeadings] = useState<string[]>([]);

    const headingElementsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const headingElements = document.querySelectorAll(".heading-special");
        const headingContents = Array.from(headingElements).map((heading) => {
            return (heading as HTMLElement).innerText;
        });
        setHeadings(headingContents);

        headingElementsRef.current = Array.from(headingElements) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = headingElementsRef.current.indexOf(
                            entry.target as HTMLElement
                        );
                        setActiveHeading(index + 1);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -90% 0px",
                threshold: 0,
            }
        );
        headingElementsRef.current.forEach((element) => observer.observe(element));
    }, []);

    const scrollToHeading = (index: number) => {
        const element = document.getElementById(`heading-${index + 1}`);
        if (element) {
            const yOffset = -20;
            const y =
                element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveHeading(index + 1);
        }
    };

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        post &&
        <>
            <Head>
                <title>Blogs</title>
                {/* <title>{aboutPageData.seo.title}</title>
                <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
            </Head>
            <Banner
                title={post.title}
                desc={post.blogPost.bannerDescription}
                btnText={`Enroll Now`}
                image={post.blogPost.uploadBannerForTopSection?.node.mediaItemUrl}
            />
            <section>
                <div className="container">
                    <div className="blog-details">
                        <div className="aside">
                            <h3>Table of Content</h3>
                            <div className="table-content">
                                {headings.map((heading, index) => (
                                    <p
                                        className={activeHeading === index + 1 ? "active" : ""}
                                        key={index}
                                        onClick={() => {
                                            scrollToHeading(index);
                                        }}
                                    >
                                        {index + 1}. {heading}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="blog-details--content">
                            <div className="blog-details-head">
                                <div className="blog-author">
                                    <div className="avatar">
                                        <Image
                                            width={100}
                                            height={100}
                                            src={
                                                post.blogPost?.authorProfileImage?.node?.mediaItemUrl
                                            }
                                            alt="author-image"
                                            title={post.blogPost?.authorProfileImage?.node?.title}
                                        />
                                    </div>
                                    <p className="author-name">{post.blogPost.authorName}</p>
                                </div>
                                <div className="blog-details-info">
                                    <p>{post?.seo?.readingTime ? post?.seo?.readingTime : '5'} Min to read</p>
                                    <p>{dayjs(post.date).format("DD MMM YYYY")}</p>
                                </div>
                            </div>
                            <div className="data">
                                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="container">
                    <div className="section-head">
                        <h2>
                            More <span>Blog</span>
                        </h2>
                        <p className="banner-desc">
                            Dive into our freshest blogs and explore the latest trends, tips, and tales crafted just for you!
                        </p>
                    </div>
                    <RecentPost />
                </div>
            </section>
        </>
    );
};

export default PostPage;

export async function getServerSideProps({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    try {
        const { data } = await client.query({
            query: gql`
        query GetPost($slug: ID!) {
          post(idType: SLUG, id: $slug) {
            blogPost {
              uploadBannerForTopSection {
                node {
                  mediaItemUrl
                }
              }
              authorName
              authorProfileImage {
                node {
                  altText
                  mediaItemUrl
                  title
                }
              }
              bannerDescription
            }
            title
            link
            date
            content(format: RENDERED)
            featuredImage {
              node {
                altText
                id
                link
                mediaItemUrl
                mediaType
                slug
                title
              }
            }
            excerpt(format: RAW)
          }
        }
      `,
            variables: { slug },
        });

        if (data && data.post) {
            return {
                props: {
                    post: data.post,
                },
            };
        }
    } catch (error) {
        console.error("Error fetching post:", error);
    }

    return {
        props: {
            post: null,
        },
    };
}
