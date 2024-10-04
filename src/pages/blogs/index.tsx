import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/Banner";
import client from "../../../client";
import { gql } from "@apollo/client";
import { Search } from "@/utils/image-constants";
import dayjs from "dayjs";
import React, { useState } from "react";
import Head from "next/head";

interface Post {
    slug: string;
    title: string;
    id: string;
    date: string;
    seo: {
        readingTime: number;
    };
    featuredImage: {
        node: {
            mediaItemUrl: string;
        };
    };
    categories: {
        nodes: {
            slug: string;
            name: string;
        }[];
    };
}
interface BannerSection {
    backgroundImage: {
        node: {
            altText: string;
            link: string;
            mediaItemUrl: string;
            mediaType: string;
            slug: string;
            title: string;
            uri: string;
        };
    };
    buttonLink: {
        target: string;
        title: string;
        url: string;
    };
    buttonText: string;
    description: string;
    bannerTitle: string;
}

interface SecondSection {
    description: string;
    sectionTitle: string;
}
interface Props {
    posts: Post[];
    bannerSection: BannerSection;
    secondSection: SecondSection;
}
const Blogs = ({ posts, bannerSection, secondSection }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [visiblePostsCount, setVisiblePostsCount] = useState(12);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === "") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);
            setVisiblePostsCount(12);
        }
    };
    const handleViewMore = () => {
        setVisiblePostsCount((prevCount) => prevCount + 12);
    };
    return (
        bannerSection &&
        <>
            <Head>
                <title>Blogs</title>
                {/* <title>{aboutPageData.seo.title}</title>
                <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
            </Head>
            <main>
                <Banner
                    title={bannerSection.bannerTitle}
                    desc={bannerSection.description}
                    btnText={bannerSection.buttonText}
                    image={bannerSection.backgroundImage.node.mediaItemUrl}
                />
                <section className="light-section">
                    <div className="container">
                        <div className="section-head">
                            <h2 dangerouslySetInnerHTML={{ __html: secondSection.sectionTitle }} />
                            <p className="banner-desc">{secondSection.description}</p>
                        </div>
                        <div className="blog-head">
                            <h3>All Blog</h3>
                            <div className="searcbar">
                                <Image src={Search} alt="search" />
                                <input
                                    placeholder="search"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="blog-list">
                            {filteredPosts.slice(0, visiblePostsCount).map((post, index) => (
                                <Link
                                    className="blog-list-item"
                                    key={index}
                                    href={`/blogs/${post.categories.nodes[0].slug}/${post.slug}`}
                                >
                                    <div className="item-image">
                                        <Image
                                            width={560}
                                            height={560}
                                            src={post.featuredImage.node.mediaItemUrl}
                                            alt={post.title}
                                        />
                                    </div>
                                    <div className="item-content">
                                        <p className="date">
                                            {dayjs(post.date).format("DD MMM YYYY")}
                                        </p>
                                        <h3 className="item-title">{post.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {visiblePostsCount < filteredPosts.length && (
                            <button className="btn-white" onClick={handleViewMore}>
                                View More
                            </button>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Blogs;
export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
        query GetPostsAndPage {
          posts {
            edges {
              node {
                id
                slug
                title
                date
                categories {
                  nodes {
                    slug
                    name
                  }
                }
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }
          page(id: "blog", idType: URI) {
            blogPage {
              bannerSection {
                backgroundImage {
                  node {
                    altText
                    link
                    mediaItemUrl
                    mediaType
                    slug
                    title
                    uri
                  }
                }
                buttonLink {
                  target
                  title
                  url
                }
                buttonText
                description
                bannerTitle
              }
              secondSection {
                description
                sectionTitle
              }
            }
          }
        }
      `,
        });

        let posts = [];
        let bannerSection = null;
        let secondSection = null;

        if (data && data.posts && data.posts.edges && data.posts.edges.length > 0) {
            posts = data.posts.edges.map((edge: any) => edge.node);
        }

        if (data && data.page && data.page.blogPage) {
            // destructure
            const { bannerSection: bs, secondSection: ss } = data.page.blogPage;
            bannerSection = bs;
            secondSection = ss;
        }

        return {
            props: {
                posts,
                bannerSection,
                secondSection,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                posts: [],
                bannerSection: null,
                secondSection: null,
            },
        };
    }
}
