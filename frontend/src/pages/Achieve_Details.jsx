import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import axios from 'axios'

const Achieve_Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [selectedId, setSelectedId] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState('')
  const [allAwards, setAllAwards] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('https://admin-panel-a-ucse.vercel.app/api/fetchAwardAndAchievementData/?apikey=hello');
      if (res.data?.data) {
        setAllAwards(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleCardClick = (itmId) => {
    setSelectedId(prev => (prev === itmId ? null : itmId))
  }

  const getShortDescription = (text, wordLimit = 40) => {
    const words = text.trim().split(/\s+/)
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text
  }
const filteredData = allAwards.filter(item => {
  if (!item?.dateOfProgramme) return false;

  const programmeDate = new Date(item.dateOfProgramme);
  const programmeYear = programmeDate.getFullYear();

  // handle id like '2024-2025'
  const [startYear, endYear] = id === 'see-all' 
    ? [1900, 2100]  // show all
    : id.split('-').map(y => parseInt(y));

  const matchesYearRange = programmeYear >= startYear && programmeYear <= endYear;

  const matchesMonth = !selectedMonth || (programmeDate.getMonth() + 1 === Number(selectedMonth));

  return matchesYearRange && matchesMonth;
});
 

  return (
    <motion.div className="pt-15 min-h-screen w-full text-white fixed overflow-y-scroll inset-0 bg-gradient-to-b from-blue-800 via-blue-300 to-white">
      
      {/* Header */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-12 pb-6 flex flex-col items-center backdrop-blur-sm"
      >
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          {id === 'see-all' ? 'All Achievements' : id}
        </h1>
        <p className="text-xl mt-2 font-medium">Explore achievements for the year</p>

        {/* 📅 Month Picker */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex flex-row gap-3 items-center justify-center mb-10 mt-10"
        >
          <label className="text-lg font-semibold text-white flex items-center justify-center gap-2">
            <Calendar /> Select Month
          </label>

          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-white/10 text-white text-base font-medium px-4 py-1 rounded-sm shadow-lg backdrop-blur-sm border border-white focus:outline-none focus:ring-2 focus:ring-white w-40"
            >
              <option value="" className='bg-gray-700'>All Months</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, idx) => (
                <option key={idx} value={idx + 1} className='bg-gray-700'>{month}</option>
              ))}
            </select>

            <svg
              className="w-4 h-4 text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>

        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 px-5 py-2 bg-white text-blue-700 font-medium rounded-full hover:bg-gray-100 transition shadow"
        >
          Go Back →
        </button>
      </motion.div>

      {/* Cards */}
<motion.div
  initial={{ y: 80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1 }}
  className="w-full flex flex-wrap items-start justify-center gap-8 px-10 pb-20 mt-12"
>
  {filteredData.map((itm) => {
    const isOpen = selectedId === itm._id;
    const imageUrl = itm.imgUrl; // Ensure only the first image is used

    return (
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ duration: 0.3 }}
        key={itm._id}
        className="m-3 relative cursor-pointer bg-white text-black rounded-xl shadow-blue-300/80 shadow-xl w-[25rem] min-h-[30rem] h-auto overflow-hidden transition-all duration-500 flex flex-col justify-between"
      >
        {/* Date */}
        <div className="shadow-blue-400/90 shadow-lg absolute top-5 left-4 rounded-full px-4 py-1 bg-white/90 flex items-center justify-center gap-2">
          <Calendar size={15} />
          <p className='text-xs'>{new Date(itm.dateOfProgramme).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}</p>
        </div>

        {/* Image */}
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom right, #28292a18, #06060617), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="w-full h-[18rem] rounded-t-xl"
        />

        {/* Content */}
        <div className={`px-4 py-4 flex-1 flex flex-col justify-start gap-3 transition-all duration-500 ease-in-out`}>
          <h1 className="text-lg font-semibold">{itm.programmeName}</h1>
          <div
            className={`text-sm text-gray-700 leading-relaxed transition-all duration-500 ease-in-out overflow-hidden`}
            style={{
              maxHeight: isOpen ? '1000px' : '4.1rem',
            }}
          >
            {getShortDescription(itm.description)}
          </div>
        </div>

        {/* Footer */}
        <div
          onClick={() => handleCardClick(itm._id)}
          className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
        >
          <span className="text-blue-600 flex items-center gap-1 font-medium">
            {isOpen ? 'Close' : 'Read More'} <ArrowRight size={16} />
          </span>
          <span className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            Achievement
          </span>
        </div>
      </motion.div>
    )
  })}
</motion.div>

          </motion.div>
  )
}

export default Achieve_Details
