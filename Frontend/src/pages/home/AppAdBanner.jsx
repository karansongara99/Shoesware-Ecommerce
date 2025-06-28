export default function AppAdBanner() {
    return (
        <>
                <section className="py-5 my-5">
                    <div className="container-lg">
                        <div className="bg-warning py-5 px-4 rounded-5">
                            <div className="container">
                                <div className="row justify-content-center align-items-center text-center text-md-start">
                                    {/* Left Content */}
                                    <div className="col-md-5">
                                        <h2 className="mt-3 fw-bold">Download Skyline Shoppers App</h2>
                                        <p className="text-dark mb-4">Online orders made easy, fast, and reliable.</p>
                                        <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-md-start">
                                            <a href="#" title="App Store">
                                                <img src="images/img-app-store.png" alt="App Store" className="img-fluid" style={{ maxWidth: "150px", height: "auto" }} />
                                            </a>
                                            <a href="#" title="Google Play">
                                                <img src="images/img-google-play.png" alt="Google Play" className="img-fluid" style={{ maxWidth: "150px", height: "auto" }} />
                                            </a>
                                        </div>
                                    </div>
                                    {/* Right Image */}
                                    <div className="col-md-5 d-flex justify-content-center mt-4 mt-md-0">
                                        <img src="images/banner-2.jpg" alt="Phone" className="img-fluid rounded" style={{ maxWidth: "90%", height: "auto" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        </>
    );
}