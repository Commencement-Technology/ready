import FeatureLayout from "./FeatureLayout";
import data from "@/utils/siteContent/featuresData.json";

const KeyFeatures = () => {
  return (
    <section className="flex flex-col gap-8 items-center">
      <h2 className="text-center text-2xl md:text-5xl font-bold">
        What You Can Do...
      </h2>
      <section className="mt-20 flex flex-col gap-44">
        {data.map((item) => (
          <FeatureLayout
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            altText={item.altText}
            description={item.description}
            isReverseDirection={item.isReverseDirection}
          />
        ))}
      </section>
    </section>
  );
};

export default KeyFeatures;
