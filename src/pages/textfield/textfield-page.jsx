import "./styles.sass";
import Textfield from "../../components/textfield/textfield";

const TextfieldPage = () => {
  return (
    <div className="page infos-card-page">
      <Textfield onChange={() => {}} />
      <Textfield type={"textarea"} onChange={() => {}} />
    </div>
  );
};

export default TextfieldPage;
