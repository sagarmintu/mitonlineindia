import Image from "next/image";
import Link from "next/link";
import Banner from "../components/Banner";
import client from "../../client";
import { gql } from "@apollo/client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import React from "react";
import MITNavbar from "@/components/Navbar";
import Head from "next/head";


interface Video {
    videos: {
        name: string;
        youtubeEmbedLink: string;
        description: string;
    };
    title: string;
    link: string;
}
interface BannerSection {
    videosPage: {
        bannerSection: {
            backgroundImage: {
                node: {
                    altText: string;
                    mediaItemUrl: string;
                    mediaType: string;
                    slug: string;
                    title: string;
                };
            };
            buttonLink: {
                target: string;
                title: string;
                url: string;
            };
            buttonText: string;
            description: string;
            title: string;
        };
        secondSection: {
            description: string;
            title: string;
        };
    };
}
interface Props {
    videos: Video[];
    pageData: BannerSection[];
}
const OurVideo = ({ videos, pageData }: Props) => {
    console.log(pageData[0].videosPage, "bannerSection");
    const bannerSection = pageData[0].videosPage.bannerSection;
    const secondSection = pageData[0].videosPage.secondSection;
    return (
        <>
         <Head>
          <title>Our Videos</title>
          {/* <title>{aboutPageData.seo.title}</title>
          <meta name="description" content={aboutPageData.seo.metaDesc} /> */}
        </Head>
       { bannerSection &&
        <>
            <main>
                <Banner
                    title={bannerSection?.title}
                    desc={bannerSection?.description}
                    btnText={bannerSection?.buttonText}
                    image={bannerSection?.backgroundImage?.node?.mediaItemUrl}
                />
                <section className="">
                    <div className="container">
                        <div className="section-head">
                            <h2
                                dangerouslySetInnerHTML={{
                                    __html: secondSection.title,
                                }}
                            />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: secondSection.description,
                                }}
                            />
                        </div>
                        <div className="blog-list">
                            {videos.map((video, index) => (
                                <div className="blog-list-item video-card" key={index}>
                                    <div className="video-card--container">
                                        {/* <iframe
                                            src={video.videos.youtubeEmbedLink}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        /> */}
                                        <LiteYouTubeEmbed
                                            id={video.videos.youtubeEmbedLink}
                                            title="item.title"
                                            noCookie={true}
                                        />
                                    </div>
                                    <h4>{video.videos.name}</h4>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: video.videos.description,
                                        }}
                                    />
                                    {/* <p>{video.link}</p> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>}
        </>
    );
};

export default OurVideo;
export async function getServerSideProps() {
    try {
        const { data } = await client.query({
            query: gql`
        query GetPostsAndPage {
          videos {
            edges {
              node {
                videos {
                  name
                  youtubeEmbedLink
                  description
                }
                title
                link
              }
            }
          }
          pages(where: {name: "videos"}) {
            edges {
              node {
                videosPage {
                  bannerSection {
                    backgroundImage {
                      node {
                        altText
                        mediaItemUrl
                        mediaType
                        slug
                        title
                      }
                    }
                    buttonLink {
                      target
                      title
                      url
                    }
                    buttonText
                    description
                    title
                  }
                  secondSection {
                    description
                    title
                  }
                }
              }
            }
          }
        }
      `,
        });

        let videos = [];
        let pageData = null;
        if (
            data &&
            data.videos &&
            data.videos.edges &&
            data.videos.edges.length > 0
        ) {
            videos = data.videos.edges.map((edge: any) => edge.node);
        }
        if (data && data.pages && data.pages.edges && data.pages.edges.length > 0) {
            pageData = data.pages.edges.map((edge: any) => edge.node);
        }

        return {
            props: {
                videos,
                pageData,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                videos: [],
                pageData: [],
            },
        };
    }
}
