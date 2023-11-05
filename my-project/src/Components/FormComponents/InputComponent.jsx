const InputComponent = ({
  type,
  isLogin,
  id,
  name,
  isFocus,
  value,
  handleOnChange,
  placeholder,
  addClass,
}) => {
  return (
    <input
      type={type}
      className={`${
        isLogin && "hidden"
      } block pl-10 border border-grey-light w-full p-3 rounded mb-4 ${addClass}`}
      name={name}
      id={id}
      autoFocus={isFocus}
      required={!isLogin}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
