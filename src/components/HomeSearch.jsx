import React from "react";

function HomeSearch(props) {
  return (
    <div className="mt-10 mb-20">
      <h3 className="text-center text-2xl font-bold text-green-700 mb-5">
        LỰA CHỌN CHUYẾN ĐI
      </h3>
      <hr class="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />
      <form className="w-[80%] md:w-[60%] xl:w-[80%] 2xl:w-[60%] bg-white text-black mx-auto mt-10 p-5 border border-orange-400 shadow-2xl rounded-lg flex flex-col xl:flex-row items-center gap-8">
        <div className="input-search flex flex-col basis-1/4 mb-3">
          <div className="mb-3 pl-3">
            <span className="font-semibold">Điểm đi</span>
          </div>
          <div>
            <input className="rounded-lg border-slate-300" type="text" />
          </div>
        </div>
        <div className="input-search flex flex-col basis-1/4 mb-3">
          <div className="mb-3 pl-3">
            <span className="font-semibold">Điểm đến</span>
          </div>
          <div>
            <input className="rounded-lg border-slate-300" type="text" />
          </div>
        </div>
        <div className="input-search flex flex-col basis-1/4 mb-3">
          <div className="mb-3 pl-3">
            <span className="font-semibold">Ngày đi</span>
          </div>
          <div>
            <input
              className="rounded-lg w-[207px] border-slate-300"
              type="date"
            />
          </div>
        </div>
        <div className="mt-5 search-button flex item-center basis-1/4">
          <button className="font-semibold text-white hover:bg-red-600 transition-all mx-4 border border-transparent bg-red-500 px-10 py-3 rounded-full">
            Tìm chuyến xe
          </button>
        </div>
      </form>
    </div>
  );
}

export default HomeSearch;
