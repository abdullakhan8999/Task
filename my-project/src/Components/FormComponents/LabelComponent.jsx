const LabelComponent = ({ isLogin, name, HtmlFor }) => {
  return (
    <label
      htmlFor={HtmlFor}
      className={`${
        isLogin && "hidden"
      } block cursor-pointer text-sm font-bold text-gray-700 mb-1`}
    >
      {name}
    </label>
  );
};

export default LabelComponent;
