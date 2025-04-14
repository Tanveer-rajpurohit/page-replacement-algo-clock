import { atom } from "recoil";

export const selectedTab = atom({
    key: 'selectedTab',
    default: 'example',
});


interface Example {
    id: number;
    title: string;
    description: string;
    referenceString: string;
    array: number[];
    frameCount: number;
  }

export const selectedExample = atom<Example | null>({
    key: 'selectedExample',
    default: null,
})

