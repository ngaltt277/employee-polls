import { useState } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

function NewQuestion({ dispatch }) {
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    optionOneText: "",
    optionTwoText: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddQuestion(options));

    setOptions({ optionOneText: "", optionTwoText: "" });

    navigate("/");
  };

  return (
    <div>
      <Nav currentActive="add" />
      <div className="my-6 w-full flex items-center flex-col">
        <h1 className="font-bold text-2xl">Would You Rather</h1>
        <div className="text-gray-500">Create Your Own Poll</div>
        <form className="my-6 w-[50%] text-center" onSubmit={onSubmit}>
          <div className="grid grid-cols-4 m-4">
            <label htmlFor="optionOneText" className="font-semibold text-start">
              First Option
            </label>
            <input
              type="text"
              name="optionOneText"
              placeholder="Option One"
              value={options.optionOneText}
              onChange={onChange}
              className="border-[1px] w-full col-span-3 py-1 px-3 rounded"
            />
          </div>
          <div className="grid grid-cols-4 m-4">
            <label htmlFor="optionTwoText" className="font-semibold text-start">
              Second Option
            </label>
            <input
              type="text"
              name="optionTwoText"
              placeholder="Option Two"
              value={options.optionTwoText}
              onChange={onChange}
              className="border-[1px] w-full col-span-3 py-1 px-3 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-1 px-4 rounded disabled:bg-gray-500 disabled:text-black"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NewQuestion);
