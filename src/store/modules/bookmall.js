const state = {
    hotSearchOffsetY: 0,
    flapCardVisible: false,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true,
    shelfCategory: [], // 书架分类列表
    currentType: 1 // 书架列表1 书架分类列表2
}
const getters = {
    hotSearchOffsetY: state => state.hotSearchOffsetY,
    flapCardVisible: state => state.flapCardVisible,
    isEditMode: state => state.isEditMode,
    shelfList: state => state.shelfList,
    shelfSelected: state => state.shelfSelected,
    shelfTitleVisible: state => state.shelfTitleVisible,
    shelfCategory: state => state.shelfCategory,
    currentType: state => state.currentType
}
const mutations = {
    'SET_HOT_SEARCH_OFFSETY': (state, offsetY) => {
        state.hotSearchOffsetY = offsetY
    },
    'SET_FLAPCARD_VISIBLE': (state, visible) => {
        state.flapCardVisible = visible
    },
    'SET_IS_EDIT_MODE': (state, isEditMode) => {
        state.isEditMode = isEditMode
    },
    'SET_SHELF_LIST': (state, list) => {
        state.shelfList = list
    },
    'SET_SHELF_SELECTED': (state, shelfSelected) => {
        state.shelfSelected = shelfSelected
    },
    'SET_SHELF_TITLE_VISIBLE': (state, visible) => {
        state.shelfTitleVisible = visible
    },
    'SET_SHELF_CATEGORY': (state, category) => {
        state.shelfCategory = category
    },
    'SET_CURRENT_TYPE': (state, type) => {
        state.currentType = type
    }
}
const actions = {
    setHotSearchOffsetY({commit}, offsetY) {
        return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
    },
    setFlapCardVisible({commit}, visible) {
        return commit('SET_FLAPCARD_VISIBLE', visible)
    },
    setIsEditMode({ commit }, isEditMode) {
        return commit('SET_IS_EDIT_MODE', isEditMode)
    },
    setShelfList({ commit }, list) {
        return commit('SET_SHELF_LIST', list)
    },
    setShelfSelected({ commit }, shelfSelected) {
        return commit('SET_SHELF_SELECTED', shelfSelected)
    },
    setShelfTitleVisible({ commit }, visible) {
        return commit('SET_SHELF_TITLE_VISIBLE', visible)
    },
    setShelfCategory({ commit }, category) {
        return commit('SET_SHELF_CATEGORY', category)
    },
    setCurrentType({ commit }, type) {
        return commit('SET_CURRENT_TYPE', type)
    }
}

export default {
    state, getters, mutations, actions
}