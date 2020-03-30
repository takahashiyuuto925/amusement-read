import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss } from "../utils/constant";
import { saveLocation } from '../utils/localstorage'

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
            const startCfi = currentLocation.start.cfi
            const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
            this.setProgress(Math.floor(progress * 100))
            this.setSection(currentLocation.start.index)
            saveLocation(this.fileName, startCfi)
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
            console.log('op')
        }
    }
}