import { Grid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const viewGroup = [
  {
    view: "grid",
    title: "Grid",
    icon: <Grid className="h-4 w-4" />,
  },
  {
    view: "list",
    title: "List",
    icon: <List className="h-4 w-4" />,
  },
];

const ViewToggle = ({ handleValueChange }) => {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      onValueChange={handleValueChange}
    >
      <TooltipProvider>
        {viewGroup.map((item) => (
          <Tooltip key={item.view}>
            <TooltipTrigger asChild>
              <ToggleGroupItem value={item.view} aria-label={item.view}>
                {item.icon}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </ToggleGroup>
  );
};

export default ViewToggle;
