import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col items-start space-y-1">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="w-full rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary transition-all placeholder:text-sm placeholder:text-brand-text-gray focus:border-brand-primary focus:outline-none focus:ring-brand-primary"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
