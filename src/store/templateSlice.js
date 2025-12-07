import { createSlice } from "@reduxjs/toolkit";

const genId = () => `id_${Date.now().toString(36)}_${Math.floor(Math.random() * 10000)}`;

const templateSlice = createSlice({
    name: "template",
    initialState: {
        pages: [],
        selectedTemplate: null,
        currentPageIndex: 0,
    },
    reducers: {
        setPages(state, action) {
            state.pages = action.payload || [];
            state.currentPageIndex = 0;
        },

        setSelectedTemplate(state, action) {
            state.selectedTemplate = action.payload || null;
            state.pages = (action.payload && action.payload.pages) || [];
            state.currentPageIndex = 0;
        },

        resetTemplate(state) {
            state.pages = [];
            state.selectedTemplate = null;
            state.currentPageIndex = 0;
        },


        addPage(state, action) {
            const page = action.payload || {
                id: genId(),
                number: state.pages.length + 1,
                background: null,
                elements: [],
            };
            state.pages.push(page);
            state.currentPageIndex = state.pages.length - 1;
        },

        updatePage(state, action) {
            const { id, index, patch } = action.payload;
            const i = typeof index === "number" ? index : state.pages.findIndex((p) => p.id === id);
            if (i >= 0 && state.pages[i]) {
                state.pages[i] = { ...state.pages[i], ...patch };
            }
        },

        removePage(state, action) {
            const { id, index } = action.payload;
            const i = typeof index === "number" ? index : state.pages.findIndex((p) => p.id === id);
            if (i >= 0) {
                state.pages.splice(i, 1);
                state.pages.forEach((p, idx) => (p.number = idx + 1));
                state.currentPageIndex = Math.max(0, Math.min(state.currentPageIndex, state.pages.length - 1));
            }
        },

    
    },
});

export const {
    setPages,
    setSelectedTemplate,
    resetTemplate,
    addPage,
    updatePage,
    removePage,
} = templateSlice.actions;

export default templateSlice.reducer;

