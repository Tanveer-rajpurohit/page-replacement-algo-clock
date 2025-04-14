import Tab from "./components/Tab";
import { useRecoilValue } from "recoil";
import { selectedTab } from "./context/stateAtom";
import EaxmpleSet from "./components/EaxmpleSet";
import ClockSimulator from "./components/ClockSimulator";

function App() {
  const activeTab = useRecoilValue(selectedTab);
  console.log(selectedTab);
  return (
    <>
      <div className="w-full relative min-h-[100vh] bg-[#F4F1EC] text-black font-mono">
        {/* Header */}
        <div className="h-[70px] w-full border-b-2 border-gray-500 flex items-center justify-start px-10 md:px-6 sm:px-4">
          <div>
            <h4 className="text-[#5A4F41] font-medium ">
              Page Replacement Algorithm
            </h4>
            <p className="text-[#8A7E6B] sm:text-base">Clock</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="h-[75%] w-full py-4 px-10 md:px-6 sm:px-4">
          {/* tab */}
          <Tab />

          {/* Tab content */}
          <div className="mt-6 transition-all duration-300 ease-in-out">
            {activeTab === "example" ? (
              <EaxmpleSet />
            ) : (
              <div className="animate-fadeIn">
                {/* Practical content goes here */}
                <div className="p-4 bg-[#E8E4DD] rounded-lg">
                  <h3 className="text-[#5A4F41] font-medium mb-2">
                    Practical
                  </h3>
                  

                  <ClockSimulator />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
