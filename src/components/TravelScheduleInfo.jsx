import React from "react";

function TravelScheduleInfo({ travelInfo }) {
  return (
    <div className="lookupform mt-10 mb-32 mx-auto flex-1 w-full md:w-[75%] lg:w-[60%]">
      <h1 className="text-green-700 text-2xl text-center font-bold mb-5">
        LỊCH TRÌNH HIỆN CÓ
      </h1>
      <hr class="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5" />
      <div className="title border border-gray-300 flex flex-row items-center mt-10 mb-5 rounded-xl p-3 text-blue-700">
        <div className="basis-2/6 font-semibold">Tuyến xe</div>
        <div className="basis-1/6 font-semibold">Ngày đi</div>
        <div className="basis-1/6 font-semibold">Thời gian đi</div>
        <div className="basis-1/6 font-semibold">Thời gian đến</div>
        <div className="basis-1/6 font-semibold text-center">Giá vé</div>
      </div>
      <div className="travel-info border border-gray-300 flex flex-col rounded-xl px-3 pt-3">
        {travelInfo.map((info) => (
          <div className="flex flex-row mb-3">
            <div className="basis-2/6 font-semibold">
              <span className="text-orange-600">{info.start_address}</span>{" "}
              -&gt; {info.end_address}
            </div>
            <div className="basis-1/6 font-semibold">{info.date}</div>
            <div className="basis-1/6 font-semibold">{info.start_time}</div>
            <div className="basis-1/6 font-semibold">{info.end_time}</div>
            <div className="basis-1/6 font-semibold text-center">
              {info.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelScheduleInfo;
