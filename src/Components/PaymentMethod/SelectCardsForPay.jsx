import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./SelectCardsForPay.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const SelectCardsForPay = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to handle card selection
    const handleCardClick = (card) => {
        setSelectedCard(card === selectedCard ? null : card);
    };

    return (
        <div>
            <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
                <div className="absolute w-full">
                    <Navbar />
                </div>
            </div>
            <div className="SelectCardsForPay">
                <div className="CardDataArea">
                    <p className="TitleCard">CHOOSE A PAYMENT METHOD</p>
                    <div className="CardAbout">
                        <p>
                            If import costs are not included in your order, you will need to
                            pay them locally.
                        </p>
                    </div>
                    <div className="CardArea">
                        {/* Add onClick event handlers to each card */}
                        <div
                            className={selectedCard === "VISA" ? "selected" : ""}
                            onClick={() => handleCardClick("VISA")}
                        >
                            <img
                                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-visa_new.svg"
                                alt=""
                            />
                            <p>VISA</p>
                        </div>
                        <div
                            className={selectedCard === "MASTERCARD" ? "selected" : ""}
                            onClick={() => handleCardClick("MASTERCARD")}
                        >
                            <img
                                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-mastercard.svg"
                                alt=""
                            />
                            <p>MASTERCARD</p>
                        </div>
                        <div
                            className={selectedCard === "AMEX" ? "selected" : ""}
                            onClick={() => handleCardClick("AMEX")}
                        >
                            <img
                                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-amex.svg"
                                alt=""
                            />
                            <p>AMEX</p>
                        </div>
                        <div
                            className={selectedCard === "PAYPAL" ? "selected" : ""}
                            onClick={() => handleCardClick("PAYPAL")}
                        >
                            <img
                                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-paypal_new.svg"
                                alt=""
                            />
                            <p>PAYPAL</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="sticky bottom-0 z-50">
                <div className="CartpropccessOrder">
                    <div className="CartProccesses">
                        <div>
                            <div>TOTAL</div>
                            <div className="flex-col">
                                <div className="pl-4">899.50 EUR</div>
                                <div
                                    className="text-gray-700"
                                    style={{
                                        fontSize: "9px",
                                    }}
                                >
                                    * BEFORE TAXES
                                </div>
                            </div>
                        </div>
                        <Link className="Cartcontinuebutton" to="/SelectCardsForPay">
                            <button className="Contiun">CONTINUE</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectCardsForPay;