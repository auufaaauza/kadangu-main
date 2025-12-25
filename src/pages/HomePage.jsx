import React, { useState } from "react";
import { Helmet } from "react-helmet";
import AutoCarousel from "@/components/sections/AutoCarousel";
import FeatureMenu from "@/components/FeatureMenu";
import MascotBanner from "@/components/sections/MascotBanner";
import PopularShows from "@/components/sections/PopularShows";
import TopTalents from "@/components/sections/TopTalents";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Kadangu - Platform Digital Seni Daerah Indonesia</title>
        <meta
          name="description"
          content="Kadangu adalah platform digital yang menghubungkan seniman daerah, penonton, dan penyelenggara acara seni. Jelajahi pertunjukan, beli tiket, dan dukung ekosistem seni Indonesia."
        />
      </Helmet>

      <div className="overflow-x-hidden">
        {/* Banner Section */}
        <section className="container mx-auto px-4 mt-2 sm:mt-6 mb-3 sm:mb-4">
          <AutoCarousel />
        </section>

        {/* Feature Menu Section */}
        <section className="container mx-auto px-4 mb-4 sm:mb-5">
          <FeatureMenu
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
          />
        </section>

        {/* Mascot Banner Section */}
        <section className="container mx-auto px-4 mb-4 sm:mb-5">
          <MascotBanner onButtonClick={() => setIsPopupOpen(true)} />
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
