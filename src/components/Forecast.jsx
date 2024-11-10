import { motion } from "framer-motion";

function Forecast({ data }) {
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  // Process 5-day forecast data
  const getDayForecast = () => {
    // Group forecasts by day and get the middle time of each day (around noon)
    const dailyForecasts = {};

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().split("T")[0];

      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = item;
      }
    });

    // Convert to array and take first 4 days (excluding today)
    return Object.values(dailyForecasts)
      .slice(1, 5)
      .map((day) => ({
        day: new Date(day.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        temp: Math.round(day.main.temp), // Convert Kelvin to Celsius
        weather: day.weather[0].icon,
      }));
  };

  return (
    <div className="flex justify-between gap-2">
      {getDayForecast().map((day, index) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/30 backdrop-blur-md rounded-xl p-4 flex-1 text-center shadow-lg hover:bg-white/40 transition-all duration-300 flex flex-col items-center"
        >
          <div className="text-lg font-medium text-gray-700">{day.day}</div>
          <motion.img
            src={getWeatherIcon(day.weather)}
            className="text-6xl text-center"
          />
          <div className="text-lg text-gray-700">{day.temp}°C</div>
        </motion.div>
      ))}
    </div>
  );
}

export default Forecast;
