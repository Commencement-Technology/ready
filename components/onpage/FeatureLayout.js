import Image from "next/image";

const FeatureLayout = ({
  title,
  altText,
  description,
  imageUrl,
  isReverseDirection,
}) => {
  return (
    <div
      className={`flex flex-col ${
        isReverseDirection ? `md:flex-row-reverse` : `md:flex-row`
      } gap-24 items-center`}
    >
      <div className="flex-1">
        <Image
          src={imageUrl}
          alt={altText}
          width={500}
          height={300}
          style={{
            maxWidth: "100%",
            height: "auto",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {!!title && <h3 className="text-2xl font-semibold">{title}</h3>}
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureLayout;
