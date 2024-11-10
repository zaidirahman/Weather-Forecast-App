import { motion } from "framer-motion";

function CurrentWeather({ data }) {
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-lg w-full h-80 flex flex-col items-center justify-center space-y-4"
    >
      <div className="flex items-center justify-between">
        <motion.img
          src={getWeatherIcon(data.weather[0].icon)}
          alt={data.weather[0].description}
          className="w-24 h-24 text-6xl"
        />
        <div>
          <div className="text-sm text-gray-700 text-xl">Today</div>
          <div className="text-3xl text-black font-bold">{data.name}</div>
          <div className="text-gray-700 text-xl">
            Temperature: {Math.round(data.main.temp)}°C
          </div>
          <div className="text-gray-700 text-xl">
            {data.weather[0].description}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default CurrentWeather;
