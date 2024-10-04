import { useState, useEffect } from "react";
import { C_CLOSE, C_OPEN } from "@/utils/image-constants";
import { Col, Collapse, Row } from "antd";
import Image from "next/image";
import { Faq } from "@/utils/types";
import { usePathname } from 'next/navigation'


const FaqSection: React.FC<{ faqs: Faq[], desc? : any }> = ({ faqs, desc }) => {
  // Extract unique categories

  const pathname = usePathname();
  const categorySet = new Set<string>();
  faqs.forEach((faq) => {
    faq.faqCategories.edges.forEach((edge) => {
      categorySet.add(edge.node.name);
    });
  });
  const categories: string[] = Array.from(categorySet);

  // State to track the selected category, default to a specific category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    pathname === '/mit-harbour' ? "About MIT Harbour" : "About MIT Online"
  );

  // Filtered FAQs based on selected category
  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) =>
        faq.faqCategories.edges.some((edge) => edge.node.name === selectedCategory)
      )
    : faqs;

  // collapse item list
  const items = filteredFaqs.map((faq, index) => ({
    key: index.toString(),
    label: faq.title,
    children: <p dangerouslySetInnerHTML={{ __html: faq.content }} />,
  }));

  return (
    <section className={`bg-grey faq-section`}>
      <div className="section-head">
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <p className="banner-desc">
          {desc ? desc : 
            'Got questions about MIT Online? Navigate through answers to commonly asked queries about admissions, programs, and more in our FAQ section.'
          }
        </p>
      </div>
      <div className="container">
        <Row
          gutter={[
            { xs: 0, md: 60, lg: 117 },
            { xs: 36, md: 0, lg: 0 },
          ]}
        >
          <Col lg={8} md={8} xs={24}>
            <ul className="faq-cat-list">
            {categories
              .filter(category => {
                if (pathname === '/mit-harbour') {
                  return category.toLowerCase() !== "programs" && category.toLowerCase() !== "about mit online";
                }
                return category.toLowerCase() !== "contact information" && category.toLowerCase() !== "about mit harbour" && category.toLowerCase() !== "process & registration"; 
              })
              .map((category, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`${category
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .replace("/", "")}  ${
                    selectedCategory === category ? "selected-category" : ""
                  }`}
                >
                  {category}
                </li>
              ))}

            </ul>
          </Col>
          <Col lg={16} md={16} xs={24} className="faq-main">
            <Collapse
              bordered={false}
              className="faqs-container"
              defaultActiveKey={["0"]}
              expandIconPosition="end"
              items={items}
              expandIcon={({ isActive }) => (
                <Image
                  src={isActive ? C_OPEN : C_CLOSE}
                  alt={isActive ? "close" : "open"}
                />
              )}
            />
              {/* {items.map((item) => (
                <Collapse.Panel header={item.label} key={item.key}>
                  {item.children}
                </Collapse.Panel>
              ))} */}
            {/* </Collapse> */}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FaqSection;
