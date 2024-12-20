import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="w-full rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] transition-all placeholder:text-sm placeholder:text-[#9A9C9F] focus:border-[#00ADB5] focus:outline-none focus:ring-[#00ADB5]"
        ref={ref}
        {...rest}
      />
      {error && (
        <p className="text-left text-xs text-red-500">{error.message}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
