import React from "react";

const Process = () => {
  const steps = [
    {
      number: "1",
      title: "Discovery Call",
      description:
        "The first step sets the foundation for our collaboration. During this initial consultation, we'll discuss your project goals, requirements, and vision. This allows us to understand your needs better and establish clear expectations for the project ahead.",
    },
    {
      number: "2",
      title: "Research & Analysis",
      description:
        "We conduct thorough market research and analyze your target audience, competitors, and industry trends. This critical phase helps us gather insights that will inform our strategy and ensure we create solutions that align with your business objectives.",
    },
    {
      number: "3",
      title: "Design & Development",
      description:
        "With a solid strategy in place, our team begins the creative process. We create comprehensive designs and develop solutions that align with your brand and goals. Regular check-ins ensure we're meeting your expectations and requirements throughout this phase.",
    },
    {
      number: "4",
      title: "Project Launch & Optimization",
      description:
        "We carefully launch your project and monitor its performance. Our team provides ongoing support and makes necessary optimizations to ensure everything runs smoothly. We'll stay connected to address any questions and help you maximize the value of your investment.",
    },
  ];

  return (
    <div className="2xl:w-4/5 md:mx-auto py-32 md:pb-32  px-6 md:px-16 ">
      <div className="mx-auto mb-12">
        <h2 className="text-4xl    font-bold text-black mb-4">
          We keep it simple
        </h2>
        <p className="text-[#7b7b7b] text-lg">
          Our process is designed to deliver exceptional results and ensure a
          seamless experience from start to finish.
        </p>
      </div>
      <div className="space-y-12">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-8">
            <div className="flex-none">
              <div className="text-3xl font-bold text-gray-900">
                {step.number}.
              </div>
            </div>
            <div className="flex-1 border-t border-gray-200 pt-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-[#7b7b7b] leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
