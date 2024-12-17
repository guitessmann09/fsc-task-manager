import InputLabel from './InputLabel'

const TimeSelect = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 text-left">
        <InputLabel htmlFor="time">Time</InputLabel>
      </div>
      <select
        id="time"
        className="w-full rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] transition-all placeholder:text-sm placeholder:text-[#9A9C9F] focus:border-[#00ADB5] focus:outline-none focus:ring-[#00ADB5]"
      >
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
    </div>
  )
}

export default TimeSelect
