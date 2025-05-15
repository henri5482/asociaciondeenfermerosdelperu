import React from "react";

const Industries = () => {
  const industries = [
    {
      title: "Fintech",
      description:
        "Financial technology solutions and digital banking services",
      companies:
        "Discover, Stripe, CreditKarma, STC Bank, MoneyLion, Marqeta, Quicken, Lulo Bank, Earnin, Fundbox, StreetBeat, Q2",
    },
    {
      title: "Insurance",
      description: "Digital insurance platforms and insurtech solutions",
      companies:
        "StateFarm, Progressive, Geico, Lemonade, Oscar Health, MetLife",
    },
    {
      title: "Energy",
      description: "Sustainable energy and power management systems",
      companies:
        "Shell, BP, Chevron, NextEra Energy, Duke Energy, Siemens Energy",
    },
    {
      title: "B2B & Enterprise Software",
      description: "Enterprise-grade software solutions",
      companies:
        "Slack, ADP, VMware, Okta, Splunk, Nutanix, Zenefits, Comscore, Papaya, TeamViewer, Cornerstone, WorkBoard, AppDynamics",
    },
    {
      title: "Crypto & Web3",
      description: "Blockchain technology and decentralized applications",
      companies: "Coinbase, Binance, Ripple, OpenSea, MetaMask, Alchemy",
    },
    {
      title: "Technology",
      description: "Cutting-edge technology solutions and services",
      companies: "Microsoft, Google, Apple, Amazon, IBM, Intel, Oracle",
    },
    {
      title: "Ecommerce & Fashiotech",
      description: "Digital retail and fashion technology",
      companies: "Shopify, ASOS, Farfetch, StitchFix, Rent the Runway, ThredUp",
    },
    {
      title: "Electronics",
      description: "Electronic systems and component solutions",
      companies: "Samsung, Sony, LG, Panasonic, Xiaomi, TSMC",
    },
    {
      title: "Food & Beverages",
      description: "Food service and beverage industry solutions",
      companies: "Coca-Cola, PepsiCo, Nestlé, DoorDash, Uber Eats, Blue Apron",
    },
    {
      title: "Startups & VC",
      description: "Solutions for startups and venture capital firms",
      companies:
        "Sequoia, Andreessen Horowitz, Y Combinator, TechStars, 500 Startups",
    },
    {
      title: "Healthcare & Life Sciences",
      description: "Healthcare technology and life science solutions",
      companies:
        "Johnson & Johnson, Pfizer, Moderna, Illumina, Epic Systems, Cerner",
    },
    {
      title: "Telecommunications",
      description: "Communication infrastructure and services",
      companies: "AT&T, Verizon, T-Mobile, Vodafone, Orange, Deutsche Telekom",
    },
    {
      title: "Mobility",
      description: "Transportation and mobility solutions",
      companies: "Uber, Lyft, Bird, Lime, Via, BlaBlaCar",
    },
    {
      title: "Logistics",
      description: "Supply chain and logistics management",
      companies: "FedEx, UPS, DHL, Maersk, Flexport, XPO Logistics",
    },
    {
      title: "Manufacturing & Automotive",
      description: "Industrial manufacturing and automotive solutions",
      companies: "Tesla, Ford, BMW, Toyota, General Motors, Siemens",
    },
    {
      title: "Agriculture",
      description: "Agricultural technology and farming solutions",
      companies:
        "John Deere, Corteva, Bayer, Indigo Ag, Farmers Business Network",
    },
    {
      title: "Architecture & Construction",
      description: "Building design and construction technology",
      companies: "Autodesk, Procore, PlanGrid, Trimble, Bentley Systems",
    },
    {
      title: "Government & Specialty Projects",
      description: "Public sector and specialized project solutions",
      companies: "Palantir, Booz Allen Hamilton, SAIC, Leidos, CACI",
    },
    {
      title: "Non-Profits",
      description: "Technology solutions for non-profit organizations",
      companies:
        "Gates Foundation, Red Cross, UNICEF, World Wildlife Fund, Charity: Water",
    },
  ];

  return (
    <div className="min-h-screen bg-[#17191f] text-white px-6  py-16  ">
      <div className="mx-auto 2xl:w-4/5 md:px-10">
        {/* Header */}
        <h1 className="text-4xl  font-bold mb-8">Industries</h1>
        <p className="md:text-xl mb-24 max-w-2xl">
          We unite with big brands and startups in various industries to create
          award-winning work.
        </p>

        {/* Industries List */}
        <div className="space-y-12">
          {industries.map((industry, index) => (
            <div key={index} className="border-t border-gray-700 py-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Title Column - 4 columns wide */}
                <div className="md:col-span-4">
                  <h2 className="text-2xl font-semibold">{industry.title} \</h2>
                </div>

                {/* Description Column - 4 columns wide */}
                <div className="md:col-span-4">
                  <p className="text-gray-300">{industry.description}</p>
                </div>

                {/* Companies Column - 4 columns wide */}
                <div className="md:col-span-4">
                  <p className="text-gray-300">{industry.companies}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;
