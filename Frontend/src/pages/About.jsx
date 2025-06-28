import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5" style={{ maxWidth: "900px" }}>
            <div className="card shadow-sm border-0" style={{ borderRadius: "10px" }}>
                <div className="card-body p-4">
                    <h2 className="text-center mb-4" style={{ color: "#2c3e50" }}>About Skyline Shoppers</h2>
                    <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                        Welcome to <strong>Skyline Shoppers</strong>, your ultimate destination for premium fashion, footwear, and lifestyle products. 
                        Our mission is to bring you the latest trends, top-quality shoes, and an unparalleled shopping experience.
                    </p>
                    <h4 className="mt-4" style={{ color: "#34495e" }}>Why Choose Us?</h4>
                    <ul className="text-muted" style={{ fontSize: "1.05rem" }}>
                        <li>Exclusive collection of trendy and comfortable shoes</li>
                        <li>High-quality footwear at competitive prices</li>
                        <li>Seamless shopping experience with secure checkout</li>
                        <li>Excellent customer support to assist you anytime</li>
                    </ul>
                    <h4 className="mt-4" style={{ color: "#34495e" }}>Our Vision</h4>
                    <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                        At Skyline Shoppers, we envision a world where shopping is not just a necessity but a delightful experience. 
                        Our goal is to provide stylish, durable, and comfortable footwear that suits every occasion, ensuring quality and satisfaction for every customer worldwide.
                    </p>
                    <div className="text-center mt-4">
                        <button 
                            className="btn btn-primary" 
                            style={{ padding: "10px 20px", borderRadius: "5px" }}
                            onClick={() => navigate("/category")}
                        >
                            Explore Our Shoes Collection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;