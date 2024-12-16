const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      <label htmlFor={rest.id} className="text-sm font-semibold text-[#35383E]">
        {label}
      </label>
      <input
        className="w-full rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] transition-all placeholder:text-sm placeholder:text-[#9A9C9F] focus:border-[#00ADB5] focus:outline-none focus:ring-[#00ADB5]"
        {...rest}
      />
    </div>
  )
}

export default Input
