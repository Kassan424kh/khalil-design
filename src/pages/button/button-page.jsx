import "./styles.sass";
import Button from "../../components/button/button";

const ButtonPage = () => {
    return (
        <div className="button-page">
            <div className="normal-buttons">
                <Button>I'm a [normal] button</Button>
                <Button outlined>I'm a [outlined] button</Button>
                <Button primary>I'm a [primary] button</Button>
            </div>
            <div className="icon-buttons">
                <Button leftIcon={"add"} />
                <Button leftIcon={"add"} outlined />
                <Button leftIcon={"add"} primary />
            </div>

            <div className="normal-buttons-with-icons">
                <Button>I'm a [normal] button</Button>
                <Button outlined>I'm a [outlined] button</Button>
                <Button primary>I'm a [primary] button</Button>
            </div>
        </div>
    );
};

export default ButtonPage;
