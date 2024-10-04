export interface HomePageType {
  intoduction: {
    leftContent: string;
    rightContent: string;
  };
}

export interface AboutPage {
  bannerSection: {
    bannerTitle: string;
    description: string;
    buttonText: string;
    buttonLink: {
      url: string;
    };
    backgroundImage: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  secondSection: {
    sectionTitle: string;
    description: string;
    buttonText: string;
    buttonLink: {
      url: string;
    };
  };
  twoColumnsGrid: {
    column1: {
      subText: string;
      icon: {
        node: {
          mediaItemUrl: string;
        };
      };
      columnTitle: string;
    };
    column2: {
      columnTitle: string;
      subText: string;
      icon: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
  };
  meetOurLeadership: {
    heading: string;
    subHeading: string;
    leadership1: {
      name: string;
      designation: string;
      socialLink: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    leadership2: {
      name: string;
      designation: string;
      socialLink: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    leadership3: {
      name: string;
      designation: string;
      socialLink: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    leadership4: {
      name: string;
      designation: string;
      socialLink: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
    leadership5: {
      name: string;
      designation: string;
      socialLink: string;
      image: {
        node: {
          mediaItemUrl: string;
        };
      };
    };
  };
}
export interface CategoryNode {
  node: {
    name: string;
  };
}
export interface Faq {
  title: string;
  content: string;

  faqCategories: {
    edges: CategoryNode[];
  };
}

export interface ContactPage {
  bannerSection: {
    title: string;
    description: string;
    buttonUrl: string;
    buttonText: string;
    backgroundImage: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  contactDetails: {
    title: string;
    description: string;
    detail: string;
  };
  contactForm: {
    title: string;
    description: string;
  };
}
