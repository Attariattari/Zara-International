import React, { useEffect, useState } from "react";
import "./Help.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
function useScrollPosition() {
  const [showScrollAnimation, setShowScrollAnimation] = useState(true);

  useEffect(() => {
      function handleScroll() {
          const scrollPosition = window.pageYOffset;
          setShowScrollAnimation(scrollPosition <= window.innerHeight * 0.1);
      }

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return showScrollAnimation;
}
function Help() {
  const showScrollAnimation = useScrollPosition();
  const topics = [
    {
      title: "MY ZARA ACCOUNT",
      links: [
        "REGISTRATION AND LOG IN",
        "MANAGING MY PROFILE",
        "MY FAVOURITES",
      ],
    },
    {
      title: "ITEMS AND SIZES",
      links: [
        "ITEMS AVAILABILITY",
        "WHAT’S MY SIZE?",
        "COMPOSITION AND CARE",
        "ITEMS WARRANTY",
        "PRICING POLICY",
        "WITHDRAWN ITEMS",
      ],
    },
    {
      title: "SHIPPING",
      links: [
        "SHIPPING METHODS, TIMES AND COSTS",
        "ORDERS IN SEVERAL SHIPMENTS",
        "WHERE DO WE SHIP?",
      ],
    },
    {
      title: "PAYMENTS AND INVOICES",
      links: ["PAYMENT METHODS", "PAYMENT SECURITY", "INVOICES"],
    },
    {
      title: "MY PURCHASES",
      links: [
        "ONLINE SHOPPING",
        "ORDER STATUS",
        "CHANGE OR CANCEL AN ONLINE ORDER",
        "ISSUES WITH MY ORDER",
      ],
    },
    {
      title: "EXCHANGES, RETURNS AND REFUNDS",
      links: [
        "HOW TO RETURN",
        "HOW TO EXCHANGE",
        "REFUNDS",
        "SPECIAL TERMS AND CONDITIONS FOR RETURNS",
      ],
    },
    {
      title: "ZARA EXPERIENCES",
      links: ["NEWSLETTER"],
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderLinks = (linkArray) => {
    return linkArray.map((link, index) => (
      <Link key={index} className="Link">
        {link}
      </Link>
    ));
  };

  return (
    <div>
      <div
        className="sticky top-0 z-10"
        style={{
          marginTop: "-9px",
        }}
      >
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      <div className="Help">
        <div className="Help_Background_Image">
          <div className="Help_Search">
            <input type="text" placeholder="HOW WE CAN HELP YOU?" />
          </div>
          {showScrollAnimation && (
                <div id="mouse-scroll">
                    <div className="mouse">
                        <div className="mouse-in"></div>
                    </div>
                    <div>
                        <span className="down-arrow-1"></span>
                        <span className="down-arrow-2"></span>
                        <span className="down-arrow-3"></span>
                    </div>
                </div>
            )}
        </div>
        <div className="Help_Question_area">
          <div className="Help_FREQUENTLY">
            <div>FREQUENTLY ASKED QUESTIONS</div>
            <div className="Help_Questions">
              <Link className="Help_Links">HOW TO RETURN</Link>
              <Link className="Help_Links">ITEMS AVAILABILITY</Link>
              <Link className="Help_Links">ORDER STATUS</Link>
              <Link className="Help_Links">REFUNDS</Link>
            </div>
          </div>
          <div className="All-Topic_Question">
            <p className="Help-title">ALL HELP TOPICS</p>
            <div className="Help_Question_Grid">
              {topics.map((topic, index) => (
                <div className="QuestionArea" key={index}>
                  <p>{topic.title}</p>
                  {showAll || topic.links.length <= 3
                    ? renderLinks(topic.links)
                    : renderLinks(topic.links.slice(0, 3))}
                  {topic.links.length > 3 && (
                    <button
                      className="ShowAndlessButton"
                      onClick={toggleShowAll}
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Help;
