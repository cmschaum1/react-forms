import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    reset: resetName,
    inputChangedHandler: inputNameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    reset: resetEmail,
    inputChangedHandler: inputEmailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
  } = useInput((value) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase())
  );

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetName();
    resetEmail();
  };

  let nameStyle = "form-control";
  if (nameHasError) {
    nameStyle = nameStyle + " invalid";
  }

  let emailStyle = "form-control";
  if (emailHasError) {
    emailStyle = emailStyle + " invalid";
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div>
        <div className={nameStyle}>
          <label htmlFor="name">Your Name</label>
          <input
            onChange={inputNameChangeHandler}
            value={enteredName}
            onBlur={nameInputBlurHandler}
            type="text"
            id="name"
          />
        </div>
        <div className={emailStyle}>
          <label htmlFor="email">Your Email</label>
          <input
            onChange={inputEmailChangeHandler}
            value={enteredEmail}
            onBlur={emailInputBlurHandler}
            type="text"
            id="email"
          />
        </div>
        <div>
          {nameHasError && (
            <p className="error-text">Name must not be empty.</p>
          )}
          {emailHasError && <p className="error-text">Email must be valid.</p>}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
