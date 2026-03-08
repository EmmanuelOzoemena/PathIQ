export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98]";
  const variants = {
    primary: "bg-[#0A2684] text-white hover:bg-blue-900", // Dark blue
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
