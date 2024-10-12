import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import data from "@/utils/siteContent/faqData.json";

const FAQ = () => {
  return (
    <div className="max-w-[700px] mx-auto w-full">
      <h2 className="text-center text-2xl md:text-5xl font-bold">FAQ</h2>
      <div className="my-8">
        <Accordion type="single" collapsible>
          {data.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
