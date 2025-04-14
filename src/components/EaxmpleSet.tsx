import { useRecoilState } from "recoil";
import { selectedExample } from "../context/stateAtom";
import { Play } from "lucide-react";
import { useState } from "react";

interface Example {
  id: number;
  title: string;
  description: string;
  referenceString: string;
  array: number[];
  frameCount: number;
}

const EaxmpleSet = () => {
  const [selectedEg, setSelectedEg] = useRecoilState(selectedExample);
  const [currentEgPageFualt, setCurrentEgPageFualt] = useState<null | number>(null)
  const exampleSet = [
    {
      id: 1,
      title: "Example 1",
      description:
        "This is the first example page replacement algorithm using clock.",
      referenceString: "[7, 0, 1, 2, 0, 3, 4]",
      array: [7, 0, 1, 2, 0, 3, 4],
      frameCount: 3,
    },
    {
      id: 2,
      title: "Example 2",
      description:
        "This is the second example page replacement algorithm using clock.",
      referenceString: "[0, 1, 2, 3, 0, 4]",
      array: [0, 1, 2, 3, 0, 4],
      frameCount: 2,
    },
    {
      id: 3,
      title: "Example 3",
      description:
        "This is the third example page replacement algorithm using clock.",
      referenceString: "[0, 1, 2, 3, 4, 2, 1]",
      array: [0, 1, 2, 3, 4, 2, 1],
      frameCount: 3,
    },
    {
      id: 4,
      title: "Example 4",
      description:
        "This example tests repeated access and how the second chance works effectively.",
      referenceString: "[1, 2, 3, 2, 1, 4, 5]",
      array: [1, 2, 3, 2, 1, 4, 5],
      frameCount: 3,
    },
    {
      id: 5,
      title: "Example 5",
      description:
        "This example tests quick reuse of recently replaced pages.",
      referenceString: "[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]",
      array: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
      frameCount: 4,
    },
  ];

  const handleExampleSelect = (example: Example) => {
    setSelectedEg(example);
    setCurrentEgPageFualt(null);
  };

  class ClockPage {
    constructor(public value: number, public useBit = 1) {}
  }

  // Clock Page Replacement Algorithm Simulation
  const simulateClock = (pages: number[], frames: number): number => {
    const memory: ClockPage[] = [];
    let pageFaults = 0;
    let pointer = 0;

    for (const page of pages) {
      const index = memory.findIndex((p) => p.value === page);

      if (index !== -1) {
        memory[index].useBit = 1;
      } else {
        pageFaults++;
        if (memory.length < frames) {
          memory.push(new ClockPage(page));
          continue;
        }

        while (true) {
          if (memory[pointer].useBit === 0) {
            memory[pointer] = new ClockPage(page);
            pointer = (pointer + 1) % frames;
            break;
          } else {
            memory[pointer].useBit = 0;
            pointer = (pointer + 1) % frames;
          }
        }
      }
    }
    return pageFaults;

  };

  return (
    <>
      <div className="animate-fadeIn">
        {/* Example set content goes here */}
        <div className="p-4 bg-[#E8E4DD] rounded-lg min-h-[73vh] overflow-y-auto">
          <h3 className="text-[#5A4F41] font-medium mb-2">
            Example Set
          </h3>
          <p className="text-[#8A7E6B] w-[50%]">
            Example of Page Replacement Algorithm Clock 
          </p>

          <div className="w-full flex items-start justify-between mt-6 gap-2 overflow-y-auto">
            {/* example List*/}
            <div className="list w-[37%] h-full px-2 flex flex-col items-start gap-2">
              {exampleSet.map((example) => (
                <div
                  key={example.id}
                  onClick={() => handleExampleSelect(example)}
                  className={`w-full px-6 py-2.5 rounded-full flex items-center justify-between cursor-pointer bg-[#D6CFC4] text-[#5A4F41] ${
                    selectedEg?.id === example.id
                      ? "border border-[#968d8d]"
                      : ""
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-lg">{example.title}</h2>
                    <h2 className="text-lg">{example.referenceString}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* example description */}

            {selectedEg && (
              <div className="data w-[60%] h-full border border-[#968d8d] rounded-2xl py-4 px-6 min-h-[45vh] text-[#5A4F41]">
                <div className="w-full px-6 flex items-center justify-end">
                  <button
                  onClick={()=>{
                    setCurrentEgPageFualt(simulateClock(selectedEg.array,selectedEg.frameCount))
                  }}
                   className="flex items-center justify-center gap-2 border border-[#968d8d] rounded-full px-3 py-1 hover:bg-[#D6CFC4] text-[#5A4F41]">
                    <Play className="w-4 h-4" />
                    <h2 className="text-lg">Run</h2>
                  </button>
                </div>
                <h2 className="text-lg">{selectedEg?.title}</h2>
                <h2 className="text-lg">{selectedEg?.description}</h2>

                <div className="mt-4">
                  <p className=" text-lg">
                    Array :{selectedEg?.referenceString}
                  </p>
                  <p className=" text-lg ">
                    Frame Count :{selectedEg?.frameCount}
                  </p>
                </div>

                {currentEgPageFualt && (
                  <div className="mt-4">
                  <h2 className="text-xl">Output:</h2>
                  <p className=" text-lg">
                    Page Faults: {currentEgPageFualt}
                  </p>
                </div>
                )}
              </div>
            )}

            {!selectedEg && (
              <div className=" w-[60%] text-center py-12">
                <h2>No example selected</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default EaxmpleSet;
