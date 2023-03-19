import { FC, useEffect, useState } from "react"
import { OptionType } from "./types/options"

const App: FC = () => {
  const [options, setOptions] = useState<OptionType[]>([])
  const [inputValue, setInputValue] = useState<string>("")

  const getSearchOptions = async(value: string): Promise<void> => {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=aeb3a9b2dfb3dc9c4cf179cb68390fa7`
      const res = await fetch(url)
      const data = await res.json()
      if (data.length > 0) {
        setOptions(data as OptionType[])
      } else {
        setOptions([])
      }
    } catch (err) {
      setOptions([])
    }
  }

  useEffect(() => {
    void(async(): Promise<void> => {
      if (inputValue.length > 0) {
        await getSearchOptions(inputValue)
      } else {
        setOptions([])
      }
    })()
  }, [inputValue])

  return (
    <div className="mt-12">
      <div className="w-full text-center flex flex-col gap-x-12">
        <h1 className="text-2xl text-center font-semibold">
          Weather App using OpenWeatherMap API
        </h1>
        <p className="text-sm mt-2 italic">
          Enter below a place you want to know the weather and select an option
          from the dropdown
        </p>
      </div>

      <div className="relative mt-10 mx-auto w-2/4">
        <input
          type="text"
          value={inputValue}
          className="px-4 py-2 w-full rounded-md border border-gray-200 outline-none"
          onChange={(e): void => setInputValue(e.target.value)}
          placeholder="Search place.."
        />

        {options.length > 0 ?
          <ul key="options-list" className="mt-4 ml-[-0.2px] rounded-b-md">
            {options.map((option: OptionType) => {
              return (
                <div className="border border-gray-200 py-2 px-4 rounded-md hover:cursor-pointer hover:bg-gray-100">{option.name} - {option.country}</div>
              )
            })}
          </ul>
          :
          <></>
        }
      </div>
    </div>
  )
}

export default App
