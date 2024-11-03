import { motion } from 'framer-motion';

function CurrentWeather({ data }) {
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
      <motion.img
          src={getWeatherIcon(data.weather[0].icon)}
          alt={data.weather[0].description}
          className="text-6xl"
        />
        <div>
          <div className="text-sm text-gray-700">Today</div>
          <div className="text-2xl font-bold">{data.name}</div>
          <div className="text-gray-700">
            Temperature: {Math.round(data.main.temp)}°C
          </div>
          <div className="text-gray-700">{data.weather[0].description}</div>
        </div>
      </div>
    </motion.div>
  );
}
export default CurrentWeather