import Navigation from "@/components/Navigation";
import TextCarousel from "@/components/TextCarousel";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jatin Singh",
    role: "Founder",
    image: "/myp.jpg",
    bio: `The early years (2003–2005) saw him as a ring trader at a local broker, marked by relentless
efforts to chase market tips and the pursuit of quick profits. Losses were frequent, but they
laid the foundation for understanding what not to do.
Inspired by setbacks and failures, he taught himself everything necessary to make sense of
the puzzle. A disciplined approach emerged, allowing him to navigate the turbulence of the
2008 global bear market with a net short portfolio.
Between 2009 and 2012, curiosity led him to explore programming, enabling him to
transition into systematic trading. This shift allowed him to develop and implement
strategies across global currency and commodity markets.
By 2016, his journey expanded into statistical arbitrage, diving deep into data and
mathematics to achieve consistency and a higher Sharpe ratio`,
    setupImages: ["/people.jpg", "/people.jpg"],
    setupDescription:
      "High-performance trading setup with multiple monitors for real-time market analysis and automated trading systems.",
  },
  {
    name: "Tarun Singh",
    role: "CO-Founder",
    image: "/myp.jpg",
    bio: `2013 Dropped out of school. His first book, Trading for Dummies, set him on a path from trading to programming across
multiple languages. By 2014, Developed and programmed his first systematic trading system, executing trades in major commodities on Indian exchanges and the Globex. By 2016 to 2017, Began back testing complex strategies in the options and arbitrage space.
He found his passion in deep quant, an intersection of computer science, market microstructure, and applied math, uncovering alpha in places others might overlook. 2021, Continuous research and development keep him engaged, with his curiosity leading him into the evolving world of artificial intelligence and its potential applications in trading. A deep seeker`,
    setupImages: ["/people.jpg", "/people.jpg"],
    setupDescription:
      "Custom-built workstation optimized for complex computational tasks and algorithm development.",
  },
];

const People = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-3xl font-bold mb-3 md:mb-12 font-funnel">
            The people and the story
          </h1>

          <div className="md:space-y-12 space-y-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="space-y-0 md:space-y-4  flex  justify-center items-center">
                        <div className="w-[125px] h-[125px] md:w-[400px] md:h-[400px] relative">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover object-center rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-0 md:space-y-4">
                        <h2 className="text-xl md:text-3xl font-bold font-funnel">
                          {member.name}
                        </h2>
                        <p className="text-trading-primary text-lg md:text-xl font-funnel">
                          {member.role}
                        </p>
                        <p className="text-gray-300 text-lg font-funnel">
                          <span className="md:hidden block">
                            <TextCarousel
                              text={member?.bio}
                              characterLimit={190}
                            />
                          </span>
                          <span className="hidden md:block">{member?.bio}</span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-0 md:space-y-4  flex  justify-center items-center md:order-2">
                        <div className="w-[125px] h-[125px] md:w-[400px] md:h-[400px] relative">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover object-center rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 md:space-y-4 md:order-1">
                        <h2 className="text-xl md:text-3xl font-bold font-funnel">
                          {member.name}
                        </h2>
                        <p className="text-trading-primary text-lg md:text-xl font-funnel">
                          {member.role}
                        </p>
                        <p className="text-gray-300 text-lg font-funnel">
                          <span className="md:hidden block">
                            <TextCarousel
                              text={member?.bio}
                              characterLimit={190}
                            />
                          </span>
                          <span className="hidden md:block">{member?.bio}</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default People;
