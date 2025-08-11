import React, { useEffect, useState } from 'react';
import FlipWords from '../components/Flipwords';
import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import axios from 'axios';
import Logo from '../components/Logo';

const Achievements = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [allAwards, setAllAwards] = useState([]);

  const words = [
    "Celebrating milestones",
    "Honouring excellence",
    "Flipping challenges",
    "Turning dreams",
    "Into achievements"
  ];

  // ✅ Fetch data from API
  const fetchData = async () => {
    try {
      const res = await axios.get('https://admin-panel-a-ucse.vercel.app/api/fetchSessions/?apikey=hello');
      if (res.data?.data) {
        setAllAwards(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Extract unique years from API data
  const uniqueYears = [...new Set(allAwards.map(item => item.year))].sort().reverse();

  // 🔍 Filtered cards
  const filteredData = selectedYear
    ? allAwards.filter(item => item.year === selectedYear)
    : allAwards;

  // 🔁 Repeat data for infinite scroll illusion (if no filter selected)
  const displayData = !selectedYear
    ? Array(3).fill(filteredData).flat()  // Repeat 3 times
    : filteredData;

  return (
    <div className="overflow-x-hidden min-h-screen w-full text-white overflow-y-scroll pt-[7vh] pb-[10vh] fixed inset-0 bg-gradient-to-b from-blue-600 via-blue-300 to-white ">
      {/* Header */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-10 pb-7 flex flex-col items-center text-center px-4 space-y-4"
      >
        <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-classic text-white flex items-center justify-center gap-3 leading-tight tracking-wide">
          Awards & Achievements
          <Trophy size={40} className="text-white" strokeWidth={2.5} />
        </h1>

        <p className="text-sm sm:text-base md:text-lg  text-white max-w-4xl px-2 font-medium leading-relaxed">
          A journey of resilience, creativity, and excellence — where every milestone reflects hard work and passion.
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-yellow-300">
          <FlipWords words={words} className="font-black" />
        </p>
      </motion.div>


      {/* Filter Dropdown */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-row gap-3 items-center justify-center  mb-15"
      >
        <label className="text-lg font-semibold text-white flex items-center gap-2">
          <Calendar /> Select Year
        </label>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className=" appearance-none bg-transparent text-white text-base font-medium px-4 py-1 rounded-sm shadow-lg backdrop-blur-sm border border-white focus:outline-none focus:ring-2 focus:ring-white w-40"
          >
            <option value="" className="bg-gray-800 text-white">All Years</option>
            {uniqueYears.map((year, idx) => (
              <option key={idx} value={year} className="bg-gray-800 text-white">
                {year}
              </option>
            ))}
          </select>
          <svg className="w-4 h-4 text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={`w-full ${!selectedYear ? 'animate-marquee' : ''}`}
      >
        <div className={`flex ${!selectedYear ? 'whitespace-nowrap' : 'flex-wrap justify-center'} gap-6 px-6`}>
          {displayData.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={`${item._id}-${index}`} // important for repeated items
              onClick={() => window.location.href = `/achievements/${item.year}`}

              className="relative min-w-[17.3rem] max-w-[17.3rem] bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl  h-82 flex flex-col items-center justify-start cursor-pointer shadow-blue-800 shadow-lg"
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(/banner3.jpg)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow: "0 0 10px rgba(255,255,255,0.4)"
                }}
                className="w-[100%] h-[40%] rounded-t-xl">

              </div>
              <p className="absolute text-2xl font-bold text-white top-7 text-center">{item.year}</p>
              <div className="text-center w-[100%] h-[60%] bg-white/60 rounded-b-xl flex flex-col p-2">
                <div className="w-full flex items-center justify-between text-gray-900 px-1">
                  <img src='/logo.png' className='w-15'></img>
                  <Logo size={14} />

                </div>
                <div className="py-2 h-full text-gray-600 max-w-full overflow-hidden">
                  <p className="whitespace-normal break-words text-xs font-medium text-left pt-2 px-3">
                    Adamas University achieved NAAC A++ accreditation,
                    recognizing its commitment to academic excellence,
                    advanced research, and robust infrastructure,
                    placing it among the top-rated institutions in India.
                  </p>
                </div>



              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Achievements;
