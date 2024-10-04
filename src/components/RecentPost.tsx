import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import client from "../../client";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";

interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: {
    nodes: {
      slug: string;
      name: string;
    }[];
  };
  featuredImage: {
    node: {
      mediaItemUrl: string;
    };
  };
}
const RecentPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query GetPosts {
              posts(last: 3) {
                edges {
                  node {
                    id
                    slug
                    title
                    date
                    excerpt
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
            }
          `,
        });

        if (
          data &&
          data.posts &&
          data.posts.edges &&
          data.posts.edges.length > 0
        ) {
          const fetchedPosts = data.posts.edges.map((edge: any) => edge.node);
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      <div className="blog-list">
        {posts.map((post, index) => (
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
              <p className="date">{dayjs(post.date).format("DD MMM YYYY")}</p>
              <h3 className="item-title">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RecentPost;
