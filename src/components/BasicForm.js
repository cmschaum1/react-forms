import useInput from "../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isValidEmail = (value) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    inputChangedHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    inputChangedHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangedHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isValidEmail);

  // form valid
  let formIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  let firstNameStyle = "form-control";
  if (firstNameHasError) {
    firstNameStyle = firstNameStyle + " invalid";
  }

  let lastNameStyle = "form-control";
  if (lastNameHasError) {
    lastNameStyle = lastNameStyle + " invalid";
  }

  let emailStyle = "form-control";
  if (emailHasError) {
    emailStyle = emailStyle + " invalid";
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameStyle}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
          />
        </div>
        <div className={lastNameStyle}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
          />
        </div>
      </div>
      <div className={emailStyle}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      <div>
        {firstNameHasError && (
          <p className="error-text">First Name must not be empty.</p>
        )}
        {lastNameHasError && (
          <p className="error-text">Last Name must not be empty.</p>
        )}
        {emailHasError && <p className="error-text">Email must be valid.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
