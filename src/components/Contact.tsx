import React from "react";
import styles from "../styles/about-us.module.scss";
import ContactForm from "./ContactForm";

const Contact = ({content, white} : any) => {
    return (
        <>
            <section className={`${styles.formSec} ${white ? '' : 'grey'}`}>
                <div className={styles.contentWrap}>
                    <div className="section-head">
                        <h2 dangerouslySetInnerHTML={{
                            __html: content?.heading,
                        }}
                        />
                        <p className="banner-desc">
                            {/* {contactPageData.contactForm.description} */}
                            {content?.subHeading}
                        </p>
                    </div>
                </div>
                <div className={styles.formcard}>
                    <h3>Contact Us</h3>
                    <ContactForm />
                </div>
            </section>
        </>
    );
};

export default Contact;