import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";

  let formIsValid = false;

  if (enteredNameIsValid /* && otherEntriesAreValid */) {
    formIsValid = true;
  }

  const inputChangeHandler = (event) => {
    setEnteredNameTouched(true);
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formStyle = "form-control";
  if (nameIsInvalid) {
    formStyle = formStyle + " invalid";
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={formStyle}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={inputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlurHandler}
          type="text"
          id="name"
        />
        {nameIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
