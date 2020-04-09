import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from "../utils/constant";
import { saveLocation, getBookmark, getBookShelf, saveBookShelf } from '../utils/localstorage'
import { gotoBookDetail, appendAddToShelf, computeId, removeAddFromShelf } from './bookmall'
import { shelf } from '../api/bookmall'

export const ebookMixin = {
    computed: {
        ...mapGetters([
            'fileName',
            'menuVisible',
            'settingVisible',
            'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark'
        ]),
        themeList() {
            return themeList(this);
        },
        getSectionName() {
            return this.section ? this.navigation[this.section].label : ''
        }
    },
    methods: {
        ...mapActions([
            'setFileName',
            'setMenuVisible',
            'setSettingVisible',
            'setDefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark'
        ]),
        initGlobalStyle() {
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break;
                case 'Gold':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
                    break;
                case 'Eye':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
                    break;
                case 'Night':
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
                    break;
                default: 
                    addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
                    break;
            }
        },
        refreshLocation() {
            const currentLocation = this.currentBook.rendition.currentLocation()
            if (currentLocation && currentLocation.start) { 
                const startCfi = currentLocation.start.cfi
                const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
                this.setProgress(Math.floor(progress * 100))
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
                const bookmark = getBookmark(this.fileName)
                if (bookmark) {
                    if (bookmark.some(item => item.cfi === startCfi)) {
                      this.setIsBookmark(true)
                    } else {
                      this.setIsBookmark(false)
                    }
                  } else {
                    this.setIsBookmark(false)
                  }
                  if (this.pagelist) {
                    const totalPage = this.pagelist.length
                    const currentPage = currentLocation.start.location
                    if (currentPage && currentPage > 0) {
                      this.setPaginate(currentPage + ' / ' + totalPage)
                    } else {
                      this.setPaginate('')
                    }
                  } else {
                    this.setPaginate('')
                  }
                }
        },
        display(target, callback) {
            if (target) {
                return this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (callback) {
                        callback()
                    }
                })
            } else {
                return this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (callback) {
                        callback()
                    }
                })
            }
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        },
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
        }
    }
}

export const bookmallMixin = {
    computed: {
        ...mapGetters([
            'offsetY',
            'hotSearchOffsetY',
            'flapCardVisible'
        ])
    },
    methods: {
        ...mapActions([
            'setOffsetY',
            'setHotSearchOffsetY',
            'setFlapCardVisible'
        ]),
        showBookDetail(book) {
            gotoBookDetail(this, book)
        }
    }
}

export const shelfMixin = {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'offsetY',
            'shelfCategory',
            'currentType'
        ])
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'setShelfCategory',
            'setCurrentType'
        ]),
        showBookDetail(book) {
            gotoBookDetail(this, book)
        },
        getShelfList() {
            let shelfList = getBookShelf()
            if (!shelfList) {
                shelf().then(res => {
                    if (res.status === 200 && res.data && res.data.data.bookList) {
                        shelfList = appendAddToShelf(res.data.data.bookList)
                        saveBookShelf(shelfList)
                        return this.setShelfList(shelfList)
                    }
                })
            } else {
                return this.setShelfList(shelfList)
            }
        },
        getCategoryList(title) {
            this.getShelfList().then(() => {
                const categoryList = this.shelfList.filter(book => book.type === 2 && book.title === title)[0]
                this.setShelfCategory(categoryList)
            })
        },
        moveOutOfGroup(fun) {
            this.setShelfList(this.shelfList.map(book => {
                if (book.type === 2 && book.itemList) {
                  book.itemList = book.itemList.filter(subBook => !subBook.selected)
                }
                return book 
            })).then(() => {
                const list = computeId(appendAddToShelf([].concat(removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
                this.setShelfList(list).then(() => {
                    this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
                    if(fun) fun()
                })
            })    
        }
    }
}