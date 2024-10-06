import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const OAuthLoginButton = ({ onClick, title }) => {
  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
      {title}
    </Button>
  );
};

export default OAuthLoginButton;
