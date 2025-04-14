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

const ExampleSet = () => {
  const [selectedEg, setSelectedEg] = useRecoilState(selectedExample);
  const [currentEgPageFault, setCurrentEgPageFault] = useState<null | number>(null);
  
  const exampleSet = [
    {
      id: 1,
      title: "Example 1",
      description: "This is the first example page replacement algorithm using clock.",
      referenceString: "[7, 0, 1, 2, 0, 3, 4]",
      array: [7, 0, 1, 2, 0, 3, 4],
      frameCount: 3,
    },
    {
      id: 2,
      title: "Example 2",
      description: "This is the second example page replacement algorithm using clock.",
      referenceString: "[0, 1, 2, 3, 0, 4]",
      array: [0, 1, 2, 3, 0, 4],
      frameCount: 2,
    },
    {
      id: 3,
      title: "Example 3",
      description: "This is the third example page replacement algorithm using clock.",
      referenceString: "[0, 1, 2, 3, 4, 2, 1]",
      array: [0, 1, 2, 3, 4, 2, 1],
      frameCount: 3,
    },
    {
      id: 4,
      title: "Example 4",
      description: "This example tests repeated access and how the second chance works effectively.",
      referenceString: "[1, 2, 3, 2, 1, 4, 5]",
      array: [1, 2, 3, 2, 1, 4, 5],
      frameCount: 3,
    },
    {
      id: 5,
      title: "Example 5",
      description: "This example tests quick reuse of recently replaced pages.",
      referenceString: "[1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]",
      array: [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5],
      frameCount: 4,
    },
  ];

  const handleExampleSelect = (example: Example) => {
    setSelectedEg(example);
    setCurrentEgPageFault(null);
  };

  class ClockPage {
    constructor(public value: number, public useBit = 1) {}
  }

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
    <div className="animate-fadeIn w-full max-w-[100vw] px-4 sm:px-6 lg:px-8">
      <div className="bg-[#E8E4DD] rounded-lg min-h-[60vh] max-h-[80vh] overflow-y-auto p-4 sm:p-6">
        <h3 className="text-[#5A4F41] font-medium text-lg sm:text-xl mb-2">
          Example Set
        </h3>
        <p className="text-[#8A7E6B] text-sm sm:text-base md:w-3/4 lg:w-1/2">
          Example of Page Replacement Algorithm Clock
        </p>

        <div className="w-full flex flex-col md:flex-row items-start justify-between mt-6 gap-4">
          {/* Example List */}
          <div className="w-full md:w-[40%] max-h-[50vh] overflow-y-auto pr-2">
            {exampleSet.map((example) => (
              <div
                key={example.id}
                onClick={() => handleExampleSelect(example)}
                className={`w-full px-4 py-2.5 rounded-full flex items-center justify-between cursor-pointer bg-[#D6CFC4] text-[#5A4F41] mb-2 text-sm sm:text-base
                  ${selectedEg?.id === example.id ? "border border-[#968d8d]" : ""}`}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <h2 className="font-medium">{example.title}</h2>
                  <h2 className="text-right truncate">{example.referenceString}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Example Description */}
          {selectedEg ? (
            <div className="w-full md:w-[58%] border border-[#968d8d] rounded-2xl py-4 px-4 sm:px-6 min-h-[30vh]">
              <div className="w-full flex justify-end mb-4">
                <button
                  onClick={() => {
                    setCurrentEgPageFault(simulateClock(selectedEg.array, selectedEg.frameCount));
                  }}
                  className="flex items-center justify-center gap-2 border border-[#968d8d] rounded-full px-3 py-1.5 hover:bg-[#D6CFC4] text-[#5A4F41] text-sm sm:text-base"
                >
                  <Play className="w-4 h-4" />
                  <h2>Run</h2>
                </button>
              </div>
              <h2 className="text-lg sm:text-xl font-medium">{selectedEg.title}</h2>
              <p className="text-sm sm:text-base text-[#5A4F41] mt-2">{selectedEg.description}</p>

              <div className="mt-4 text-sm sm:text-base">
                <p>Array: {selectedEg.referenceString}</p>
                <p>Frame Count: {selectedEg.frameCount}</p>
              </div>

              {currentEgPageFault && (
                <div className="mt-4">
                  <h2 className="text-lg sm:text-xl font-medium">Output:</h2>
                  <p className="text-sm sm:text-base">Page Faults: {currentEgPageFault}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full md:w-[58%] text-center py-12">
              <h2 className="text-lg sm:text-xl text-[#5A4F41]">No example selected</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleSet;