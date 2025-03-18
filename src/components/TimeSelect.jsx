import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Time</InputLabel>
      <select
        id="time"
        className="w-full rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary transition-all placeholder:text-sm placeholder:text-brand-text-gray focus:border-brand-primary focus:outline-none focus:ring-brand-primary"
        {...props}
        ref={ref}
      >
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Night</option>
      </select>
    </div>
  )
})

TimeSelect.displayName = 'TimeSelect'

export default TimeSelect
