import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Trading Strategy 1",
    content:
      "Learn about our sophisticated trading approaches and market analysis techniques. Our quantitative strategies combine mathematical models with market insights to deliver consistent results.",
    image: "/people.jpg",
  },
  // {
  //   title: "Trading Strategy 2",
  //   content:
  //     "Learn about our sophisticated trading approaches and market analysis techniques. Our quantitative strategies combine mathematical models with market insights to deliver consistent results.",
  //   image: "/people.jpg",
  // },
  // {
  //   title: "Trading Strategy 3",
  //   content:
  //     "Learn about our sophisticated trading approaches and market analysis techniques. Our quantitative strategies combine mathematical models with market insights to deliver consistent results.",
  //   image: "/people.jpg",
  // },
  // {
  //   title: "Trading Strategy 4",
  //   content:
  //     "Learn about our sophisticated trading approaches and market analysis techniques. Our quantitative strategies combine mathematical models with market insights to deliver consistent results.",
  //   image: "/people.jpg",
  // },
];

const Enlightened = () => {
  return (
    <div className="min-h-screen bg-trading-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-16 font-funnel">
            Get Enlightened
          </h1>

          <div className="space-y-12">
            {articles.map((article, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-white/5 rounded-xl overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full  object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-funnel">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 font-funnel">{article.content}</p>
                  <button className="text-trading-primary flex items-center gap-2 font-funnel hover:text-trading-primary/80 transition-colors">
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Enlightened;
