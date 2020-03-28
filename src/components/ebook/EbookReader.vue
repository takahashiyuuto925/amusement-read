<template>
  <div class="ebook-reader">
      <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme } from '../../utils/localstorage'

global.epub = Epub
export default {
    mixins: [ ebookMixin ],
    mounted() {
        this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
            this.initEpub()
        })
    },
    methods: {
        initEpub() {
            const url = process.env.VUE_APP_RES_URL + '/defaultBook/' + this.fileName + '.epub'
            this.book = new Epub(url)
            this.setCurrentBook(this.book)
            this.initRendition()
            this.initGesture()
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
            }).then(locations => {
                this.setBookAvailable(true)
            })
        },
        initGesture() {
                this.rendition.on('touchstart', event => {
                this.touchStartX = event.changedTouches[0].clientX
                this.touchStartTime = event.timeStamp
            })
            this.rendition.on('touchend', event => {
                const offsetX = event.changedTouches[0].clientX - this.touchStartX
                const time = event.timeStamp - this.touchStartTime
                if (time < 500 && offsetX > 40) {
                    this.prevPage()
                } else if (time < 500 && offsetX < -40) {
                    this.nextPage(time)
                } else {
                    this.toggleTitleAndMenu()
                }
                // event.preventDefault()
                // event.stopPropagation()
            })
        },
        initRendition() {
            this.rendition = this.book.renderTo('read', {
                width: innerWidth,
                height: innerHeight,
                method: 'default'
            })
            this.rendition.display().then(() => {
                this.initTheme()
                this.initFontSize()
                this.initFontFamily()
                this.initGlobalStyle()
            })
            this.rendition.hooks.content.register(contents => {
                Promise.all([
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
                    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
                ])
                
            })
        },
        initFontSize() {
            let fontSize = getFontSize(this.fileName)
            if (!fontSize) {
                saveFontSize(this.fileName, this.defaultFontSize)
            } else {
                this.rendition.themes.fontSize(fontSize)
                this.setDefaultFontSize(fontSize)
            }
        },
        initFontFamily() {
            let font = getFontFamily(this.fileName)
            if (!font) {
                saveFontFamily(this.fileName, this.defaultFontFamily)
            } else {
                this.rendition.themes.font(font)
                this.setDefaultFontFamily(font)
            }
        },
        initTheme() {
            let defaultTheme = getTheme(this.fileName)
            if (!defaultTheme) {
                defaultTheme = this.themeList[0].name
                saveTheme(this.fileName, defaultTheme)
            }
            this.setDefaultTheme(defaultTheme)
            this.themeList.forEach(theme => {
                this.rendition.themes.register(theme.name, theme.style)
            });
            this.rendition.themes.select(defaultTheme)
        },
        prevPage() {
            if (this.rendition) {
                this.rendition.prev()
                if (this.menuVisible) {
                    this.hideTitleAndMenu()  
                }
            }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next()
                if (this.menuVisible) {
                    this.hideTitleAndMenu()  
                }
            }
        },
        toggleTitleAndMenu() {
            if (this.setMenuVisible) {
                this.setSettingVisible(-1)
                this.setFontFamilyVisible(false)
            }
            this.setMenuVisible(!this.menuVisible)
        },
        hideTitleAndMenu() {
            this.setMenuVisible(false)
            this.setSettingVisible(-1)
            this.setFontFamilyVisible(false)
        }
    }
}
</script>

<style>

</style>