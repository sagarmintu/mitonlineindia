import React, {useEffect, useRef} from "react";

const CompanyLogo = ({content} : any) => {
    const marqueeContentRef = useRef<any>(null);
    useEffect(() => {
        const marqueeContent = marqueeContentRef.current;
        const firstChild = marqueeContent.firstElementChild;
        const cloneFirstChild = firstChild.cloneNode(true);
        marqueeContent.appendChild(cloneFirstChild);
    }, [content]);
    return (
        <>
            <div className="container company-logos--container">
                <div className="company-logos">
                    <div ref={marqueeContentRef} dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </>
    );
};

export default CompanyLogo;