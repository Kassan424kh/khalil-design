import "./styles.sass";
import Button from "../../components/button/button";

const ButtonPage = () => {
  return (
    <div className="button-page">
      <div className="normal-buttons">
        <Button leftIcon={"add"} rightIcon={"add"} text>
          I'm a [normal] button
        </Button>
        <Button leftIcon={"add"} rightIcon={"add"}>
          I'm a [normal] button
        </Button>
        <Button leftIcon={"add"} rightIcon={"add"} outlined>
          I'm a [outlined] button
        </Button>
        <Button leftIcon={"add"} rightIcon={"add"} primary>
          I'm a [primary] button
        </Button>
      </div>
      <div className="icon-buttons">
        <Button leftIcon={"add"} />
        <Button leftIcon={"add"} outlined />
        <Button leftIcon={"add"} primary />
      </div>
    </div>
  );
};

export default ButtonPage;
