import { useRecoilState } from "recoil";
import { selectedTab } from "../context/stateAtom";

const Tab = () => {
    const [activeTab, setActiveTab] = useRecoilState(selectedTab);
  return (
    <div className="w-full mt-2">
    <div className="w-[32rem] p-1 bg-[#E8E4DD] mx-auto rounded-lg flex justify-between items-center shadow-sm transition-all duration-300">
      <div 
        className={`w-1/2 text-center transition-all duration-300 ease-in-out ${
          activeTab === "example" 
            ? "bg-[#D6CFC4] text-[#5A4F41] font-medium shadow-sm" 
            : "text-[#8A7E6B] hover:bg-[#E0DAD0]"
        } rounded-md px-3 py-2 cursor-pointer`}
        onClick={() => setActiveTab("example")}
      >
        <h4 className="text-md">Example set</h4>
      </div>
      <div 
        className={`w-1/2 text-center transition-all duration-300 ease-in-out ${
          activeTab === "practical" 
            ? "bg-[#D6CFC4] text-[#5A4F41] font-medium shadow-sm" 
            : "text-[#8A7E6B] hover:bg-[#E0DAD0]"
        } rounded-md px-3 py-2 cursor-pointer`}
        onClick={() => setActiveTab("practical")}
      >
        <h4 className="text-md">Practical</h4>
      </div>
    </div>
  </div>
  )
}
export default Tab