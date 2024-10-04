import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import { Flex } from "antd";
import RightArrow from "../images/right-arrow.svg";
import CollaborationsIcon from "../images/collaborations.svg";
import Image from "next/image";


const Advantages = ({grey}: any) => {
    const [advantages, setAdvantages] = useState<any>();
    useEffect(() => {
        const fetchPosts = async () => {
            try { const { data } = await client.query({query: gql`
            query GetPosts {
                pages(where: {name: "home"}) {
                    edges {
                      node {
                        home {
                            advantagesSection {
                                advantage1 {
                                  subtext
                                  title
                                  backgroundImage {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  icon {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  icon2 {
                                    node {
                                      altText
                                      mediaItemUrl
                                      title
                                    }
                                  }
                                }
                                advantage2 {
                                  backgroundImage {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  subtext
                                  title
                                  icon {
                                    node {
                                      altText
                                      title
                                      mediaItemUrl
                                      mediaType
                                    }
                                  }
                                  icon2 {
                                    node {
                                      altText
                                      mediaItemUrl
                                      title
                                    }
                                  }
                                }
                                advantage3 {
                                  backgroundImage {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  subtext
                                  title
                                  icon {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  icon2 {
                                    node {
                                      altText
                                      mediaItemUrl
                                      title
                                    }
                                  }
                                }
                                advantage4 {
                                  backgroundImage {
                                    node {
                                      altText
                                      title
                                      mediaItemUrl
                                      mediaType
                                    }
                                  }
                                  subtext
                                  title
                                  icon {
                                    node {
                                      altText
                                      mediaItemUrl
                                      mediaType
                                      title
                                    }
                                  }
                                  icon2 {
                                    node {
                                      altText
                                      mediaItemUrl
                                      title
                                    }
                                  }
                                }
                                buttonLink {
                                  target
                                  title
                                  url
                                }
                                title
                                subHeading
                            }
                        }
                      }
                    }
                }
            }
          `,});
            if (
                    data &&
                    data.pages &&
                    data.pages.edges &&
                    data.pages.edges.length > 0 &&
                    data.pages.edges[0].node.home &&
                    data.pages.edges[0].node.home.advantagesSection
                ) {
                    setAdvantages(data.pages.edges[0].node.home.advantagesSection);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);
    const [activeTab, setActivetab] = useState(1)
    return (
        <>
            <section className={grey ? "grey advantages" : "advantages"}>
                <div className="container">
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{ __html: advantages?.title }} />
                        <p>{advantages?.subHeading}</p>
                    </div>
                    <div className="">
                        <div className="container">
                            <Flex className="advantage-tabs" wrap="wrap">
                                {advantages && Object.keys(advantages).map((boxKey, index) => {
                                    const box = advantages[boxKey];
                                    return (
                                        box.title && box?.icon2?.node?.mediaItemUrl &&
                                        <Flex className={`advantage-tab ${activeTab === index ? 'active' : ''}`} gap={8} key={index} align="center" onClick={() => {setActivetab(index)}}>
                                            <Image width={20} height={20} src={box.icon2.node.mediaItemUrl} alt={box.title} title={box.title} />
                                            <p>{box.title}</p>
                                        </Flex>
                                    );
                                })}
                            </Flex>
                            {advantages && Object.keys(advantages).map((boxKey, index) => {
                                const box = advantages[boxKey]
                                return (
                                    box.title && box?.icon?.node?.mediaItemUrl && activeTab === index &&
                                    <div className={`advantage-box`} key={index} style={{backgroundImage: `url(${box?.backgroundImage?.node?.mediaItemUrl})`}}>
                                        <div className="advantage-box-inner">
                                            {box?.icon?.node?.mediaItemUrl &&
                                              <Image width={42} height={42} src={box.icon.node.mediaItemUrl} alt={box?.title} title={box?.title} />
                                            }
                                            <h3>{box?.title}</h3>
                                            <p>{box?.subtext}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Flex justify="center">
                        <a href={`/contact-us#contactForm`} target={advantages?.buttonLink?.target} className="btn btn-primary">{advantages?.buttonLink?.title}<Image src={RightArrow} alt="righ-arrow" /></a>
                    </Flex>
                </div>
            </section>
        </>
    );
};

export default Advantages;