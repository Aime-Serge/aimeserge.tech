import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaseStudy } from "@/modules/portfolio/caseStudy";
import initialCaseStudies from "@/store/mockData";

const STORAGE_KEY = "caseStudies_v1";

function loadFromStorage(): CaseStudy[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CaseStudy[]) : null;
  } catch {
    return null;
  }
}
function saveToStorage(items: CaseStudy[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

interface CaseStudiesState { items: CaseStudy[] }

const persisted = loadFromStorage();
const initialState: CaseStudiesState = { items: persisted ?? initialCaseStudies };

const slice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    addCaseStudy(state, action: PayloadAction<CaseStudy>) {
      state.items.unshift(action.payload);
      saveToStorage(state.items);
    },
    editCaseStudy(state, action: PayloadAction<CaseStudy>) {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
      saveToStorage(state.items);
    },
    deleteCaseStudy(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveToStorage(state.items);
    },
    importCaseStudies(state, action: PayloadAction<CaseStudy[]>) {
      state.items = action.payload;
      saveToStorage(state.items);
    },
    resetCaseStudies(state) {
      state.items = initialCaseStudies;
      saveToStorage(state.items);
    },
    // NEW: restore at exact index
    restoreCaseStudyAt(state, action: PayloadAction<{ item: CaseStudy; index: number }>) {
      const { item, index } = action.payload;
      const safeIndex = Math.max(0, Math.min(index, state.items.length));
      state.items.splice(safeIndex, 0, item);
      saveToStorage(state.items);
    }
  }
});

export const {
  addCaseStudy,
  editCaseStudy,
  deleteCaseStudy,
  importCaseStudies,
  resetCaseStudies,
  restoreCaseStudyAt
} = slice.actions;

export default slice.reducer;
