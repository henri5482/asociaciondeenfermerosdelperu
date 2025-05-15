'use client'

import React from "react";
import { motion } from "framer-motion";

interface ImpactCardProps {
  title: string;
  subtitle: string;
  value: string;
  description: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
  title,
  subtitle,
  value,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-8 border-l border-black h-80 divide-y divide-gray-200
       flex flex-col"
    >
      <div className="flex flex-col h-full justify-between ">
        <div className="space-y-6">
          <h3 className="text-xl font-medium ">{title}</h3>
          <p className="text-gray-500 text-sm ">{subtitle}</p>
        </div>

        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl md:text-7xl font-normal "
        >
          {value}
        </motion.div>

        <div className="">
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Impact = () => {
  const impactData = [
    {
      title: "Sendinblue",
      subtitle: "Revenue Growth",
      value: "x5",
      description:
        "Sendinblue's revenue grew fivefold after partnering with Bruno and his team to redesign their brand identity.",
    },
    {
      title: "Qonto",
      subtitle: "Fundraising Success",
      value: "104M",
      description:
        "Bruno partnered with Qonto to create its very first brand identity, which helped the company raise €104 million in funding.",
    },
    {
      title: "Ausha",
      subtitle: "Bounce Rate Reduction",
      value: "-36%",
      description:
        "After rethinking Ausha's identity, the new design led to record-breaking stats, including a 36% reduction in bounce rate",
    },
    {
      title: "Greenly",
      subtitle: "Fundraising Achievement",
      value: "49M",
      description:
        "Greenly raised €49 million, solidifying its position as the leader in carbon footprint assessment. Bruno's team helped them with their brand.",
    },
    {
      title: "Clients",
      subtitle: "Average rating from our clients",
      value: "4.7/5",
      description:
        "Client satisfaction is central to our culture. Their feedback helps us grow, which is why we always invite them to share their experiences.",
    },
    {
      title: "Unicorn Collaborations",
      subtitle: "French unicorns",
      value: "04",
      description:
        "The agency had the opportunity to collaborate with four of them: Qonto, Mirakl, Jellysmack, and Owkin.",
    },
  ];

  return (
    <div className="2xl:w-4/5 md:mx-auto md:px-16 px-6 py-16 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 space-y-2"
      >
        <h2 className="text-4xl font-bold
         text-gray-900 mb-4">Our Impact</h2>
        <p className="text-[#7b7b7b] text-lg">
          Our process is designed to deliver exceptional results and ensure a
          seamless experience from start to finish.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {impactData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ImpactCard {...item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
