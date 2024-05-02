import React from "react";

function SearchResult({ searchInfo, searchData }) {
  return (
    <div>
      {searchInfo.map((info) => (
        <h3 className="text-center text-2xl font-bold text-green-700 mb-5">
          KẾT QUẢ TÌM KIẾM ({searchData.length}) : {info.start_address} -&gt;{" "}
          {info.end_address} {info.date}
        </h3>
      ))}

      <hr class="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5 xl:w-1/5" />

      {searchData.map((data) => (
        <div className="md:w-[75%] lg:w-[60%] border border-slate-300 hover:border-orange-500 mx-auto rounded-xl my-10 hover:shadow-2xl transition-all">
          <div className="flex flex-row p-5">
            <div className="basis-2/6">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-2">
                  <div className="text-lg xl:text-2xl font-semibold">
                    Thời gian đi
                  </div>
                  <div className="hidden lg:flex pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-light text-lg md:text-2xl">
                    {data.start_time}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mt-2">{data.address1}</p>
                </div>
              </div>
            </div>
            <div className="basis-2/6">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-2">
                  <div className="text-lg lg:text-2xl font-semibold">
                    Thời gian đến
                  </div>
                  <div className="hidden lg:flex pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-light text-lg md:text-2xl">
                    {data.end_time}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mt-2">{data.address2}</p>
                </div>
              </div>
            </div>
            <div className="basic-1/6">
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-2">
                  <div className="text-lg lg:text-2xl font-semibold">
                    Ghế trống
                  </div>
                  <div className="hidden lg:flex pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="font-light text-lg md:text-2xl">
                  {data.vacant_seat} chỗ
                </div>
              </div>
            </div>
            <div className="basis-1/6 ml-10">
              <div className="flex flex-col">
                <div className="text-orange-500 text-xl font-semibold mb-3 text-center">
                  Giá vé: {data.price}
                </div>
                <div className="mx-auto">
                  <button className="font-semibold text-white  hover:bg-red-600 transition-all mx-auto border border-transparent bg-red-500 px-5 py-3 rounded-full">
                    Chọn chuyến
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
