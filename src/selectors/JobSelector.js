import { selector } from "recoil";
import { jobState } from "../atoms/JobState";

export const jobSelector = selector({
    key: 'jobSelector', 
    get: ({get}) => {
      const text = get(jobState);
      return text.length;
    },
  });