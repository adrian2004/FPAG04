function Card(props) {
    const { variant, extra, children, ...rest } = props;
    return (
      <div
        className={`!z-5 relative flex flex-col px-5 py-5 rounded-[30px] bg-[#fff] bg-clip-border shadow-3xl shadow-shadow-500 shadow-lg hover:shadow-xl transition duration-200`}
        {...rest}
      >
        {children}
      </div>
    );
  }
  
  export default Card;
  