import React, { useState, useEffect, memo } from "react"
import icons from "ultils/icons"
import { apiGetProducts } from "apis/product"
import { renderStarFromNumber, formatMoney, secondsToHms } from "ultils/helpers"
import { Countdown } from "components"
import moment from "moment"
import { useSelector } from "react-redux"
import withBaseComponent from "hocs/withBaseComponent"
import { getDealDaily } from "store/products/productSlice"

const { AiFillStar, AiOutlineMenu } = icons
let idInterval
const DealDaily = ({ dispatch }) => {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expireTime, setExpireTime] = useState(false)
  const { dealDaily } = useSelector((s) => s.products)

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({ sort: "-totalRatings", limit: 20 })
    if (response.success) {
      const pr = response.products[Math.round(Math.random() * 20)]
      dispatch(
        getDealDaily({ data: pr, time: Date.now() + 24 * 60 * 60 * 1000 })
      )

      //   const today = `${moment().format("MM/DD/YYYY")} 7:00:00`
      //   const seconds =
      //     new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000
      //   const number = secondsToHms(seconds)
      //   setHour(number.h)
      //   setMinute(number.m)
      //   setSecond(number.s)
      // } else {
      //   setHour(0)
      //   setMinute(59)
      //   setSecond(59)
    }
  }
  //   console.log(dealDaily)
  // useEffect(() => {
  //     fetchDealDaily()
  // }, [])
  useEffect(() => {
    if (dealDaily?.time) {
      const deltaTime = dealDaily.time - Date.now()
      const number = secondsToHms(deltaTime)
      setHour(number.h)
      setMinute(number.m)
      setSecond(number.s)
    }
  }, [dealDaily])
  useEffect(() => {
    idInterval && clearInterval(idInterval)
    if (moment(moment(dealDaily?.time).format("MM/DD/YYYY")).isBefore(moment()))
      fetchDealDaily()
  }, [expireTime])
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1)
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])
  return (
    <div className="border hidden lg:block w-full flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          TOP RATED
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealDaily?.data?.thumb ||
            "https://apollobattery.com.au/wp-content/uploads/2022/08/default-product-image.png"
          }
          alt=""
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">
          {dealDaily?.data?.title}
        </span>
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.data?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span>{`${formatMoney(dealDaily?.data?.price)} VNĐ`}</span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <div className="text-center text-gray-500 text-xs">
          A new top rated product will be shown after the countdown ends.
        </div>
      </div>
    </div>
  )
}

export default withBaseComponent(memo(DealDaily))
