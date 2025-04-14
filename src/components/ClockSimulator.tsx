import  { useState } from "react";

const ClockSimulator = () => {
  const [frameSize, setFrameSize] = useState<number>(3);
  const [inputPage, setInputPage] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);
  const [steps, setSteps] = useState<
    {
      step: number;
      page: number;
      memory: (number | null)[];
      fault: boolean;
      reason: string;
    }[]
  >([]);

  
  const handleAddPage = () => {
    const parsed = parseInt(inputPage.trim());
    if (!isNaN(parsed)) {
      const updatedPages = [...pages, parsed];
      setPages(updatedPages);
      setInputPage("");
      simulateClock(updatedPages);
    }
  };

  
  const simulateClock = (pageSequence: number[]) => {
    const frames: (number | null)[] = Array(frameSize).fill(null);
    const referenceBits: number[] = Array(frameSize).fill(0);
    let pointer = 0;
    const newSteps: typeof steps = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let pageFaults = 0;

    pageSequence.forEach((page, index) => {
      let fault = false;
      let reason = "";
      const frameIndex = frames.indexOf(page);

      if (frameIndex !== -1) {
        
        referenceBits[frameIndex] = 1;
        reason = "Already in memory";
      } else {
        
        fault = true;
        pageFaults++;

        while (true) {
          if (frames[pointer] === null) {
            
            frames[pointer] = page;
            referenceBits[pointer] = 1;
            reason = "Not in memory";
            pointer = (pointer + 1) % frameSize;
            break;
          } else if (referenceBits[pointer] === 0) {
            
            reason = `Replaced ${frames[pointer]}`;
            frames[pointer] = page;
            referenceBits[pointer] = 1;
            pointer = (pointer + 1) % frameSize;
            break;
          } else {
            
            referenceBits[pointer] = 0;
            pointer = (pointer + 1) % frameSize;
          }
        }
      }

      newSteps.push({
        step: index + 1,
        page,
        memory: [...frames],
        fault,
        reason,
      });
    });

    setSteps(newSteps);
  };


  const handleFrameChange = (value: number) => {
    setFrameSize(value);
    setPages([]);
    setSteps([]);
    setInputPage("");
  };

  return (
    <div className="bg-[#E8E4DD] p-4 rounded-lg text-[#5A4F41]">
      <h3 className="font-medium text-lg mb-4">Clock Algorithm Simulator</h3>

     
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Frame Size"
          className="px-4 py-2 rounded border border-gray-400 text-black"
          value={frameSize}
          onChange={(e) => handleFrameChange(Number(e.target.value))}
          min={1}
        />
        <input
          type="text"
          placeholder="Enter page number"
          className="px-4 py-2 rounded border border-gray-400 text-black"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />
        <button
          className="bg-[#5A4F41] text-white px-6 py-2 rounded hover:bg-[#473f34]"
          onClick={handleAddPage}
        >
          Add Page
        </button>
      </div>

      
      {steps.length > 0 && (
        <table className="w-full mt-4 border border-[#BFB9AF]">
          <thead>
            <tr className="bg-[#D6D2C4] text-[#5A4F41]">
              <th className="py-2 px-4 border">Step</th>
              <th className="py-2 px-4 border">Page</th>
              <th className="py-2 px-4 border">Memory</th>
              <th className="py-2 px-4 border">Page Fault</th>
              <th className="py-2 px-4 border">Reason</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, idx) => (
              <tr
                key={idx}
                className={
                  step.fault ? "bg-[#F9F6F0]" : "bg-[#EFEDE8] text-[#8A7E6B]"
                }
              >
                <td className="py-2 px-4 border text-center">{step.step}</td>
                <td className="py-2 px-4 border text-center">{step.page}</td>
                <td className="py-2 px-4 border text-center">
                  [{step.memory.filter((m) => m !== null).join(", ")}]
                </td>
                <td className="py-2 px-4 border text-center">
                  {step.fault ? "✅ Yes" : "❌ No"}
                </td>
                <td className="py-2 px-4 border text-center text-sm">
                  {step.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClockSimulator;
