<template>
  <div class="ebook-reader">
      <div class="ebook-reader-mask" @click="onMaskClick" @touchmove="move" @touchend="moveEnd"
        @mousedown.left="onMouseEnter" @mousemove.left="onMouseMove" @mouseup.left="onMouseEnd"></div>
      <div class="read-wrapper">
            <div id="read"></div>
      </div>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation } from '../../utils/localstorage'
import { flatten } from '../../utils/constant'
import { getLocalForage } from '../../utils/localForage'

global.epub = Epub
export default {
    mixins: [ ebookMixin ],
    mounted() {
        const books = this.$route.params.fileName.split('|')
        const fileName = books[1]
        getLocalForage(fileName, (err, blob) => {
            if (!err && blob) {
                this.setFileName(books.join('/')).then(() => {
                    this.initEpub(blob)
                })
            } else {
                this.setFileName(books.join('/')).then(() => {
                    const url = process.env.VUE_APP_RES_URL + '/upload/' + this.fileName + '.epub'
                    this.initEpub(url)
                })
            }
        })
        
    },
    methods: {
        onMouseEnd(e) {
        if (this.mouseState === 2) {
          this.setOffsetY(0)
          this.firstOffsetY = null
          this.mouseState = 3
        } else {
          this.mouseState = 4
        }
        const time = e.timeStamp - this.mouseStartTime
        if (time < 500) {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove(e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          let offsetY = 0
          if (this.firstOffsetY) {
            offsetY = e.clientY - this.firstOffsetY
            this.setOffsetY(offsetY)
          } else {
            this.firstOffsetY = e.clientY
          }
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnter(e) {
        this.mouseState = 1
        this.mouseStartTime = e.timeStamp
        e.preventDefault()
        e.stopPropagation()
      },
        move(e) {
            let offsetY = 0
            if (this.firstOffsetY) {
                offsetY = e.changedTouches[0].clientY - this.firstOffsetY
                this.setOffsetY(offsetY)
            } else {
                this.firstOffsetY = e.changedTouches[0].clientY
            }
            e.preventDefault()
            e.stopPropagation()
        },
        moveEnd(e) {
            this.setOffsetY(0)
            this.firstOffsetY = null
        },
        onMaskClick(e) {
            if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
                return
            }
            const offsetX = e.offsetX
            const width = window.innerWidth
            if (offsetX > 0 && offsetX < width * 0.3) {
                this.prevPage()
            } else if (offsetX > 0 && offsetX > width * 0.7) {
                this.nextPage()
            } else {
                this.toggleTitleAndMenu()
            }
        },
        initEpub(url) {
            this.book = new Epub(url)
            this.setCurrentBook(this.book)
            this.initRendition()
            this.initGesture()
            this.parseBook()
            this.book.ready.then(() => {
                return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
            }).then(locations => {
                this.setBookAvailable(true)
                this.refreshLocation()
            })
        },
        parseBook() {
            this.book.loaded.cover.then(cover => {
                this.book.archive.createUrl(cover).then(url => {
                    this.setCover(url)
                })
            })
            this.book.loaded.metadata.then(metadata => {
                this.setMetadata(metadata)
            })
            this.book.loaded.navigation.then(nav => {
                const navItem = flatten(nav.toc)
                function find(item, level = 0) {
                    return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], level++)
                }
                navItem.forEach(item => {
                    item.level = find(item)
                })
                this.setNavigation(navItem)
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
                event.preventDefault()
                event.stopPropagation()
            })
        },
        initRendition() {
            this.rendition = this.book.renderTo('read', {
                width: innerWidth,
                height: innerHeight,
                method: 'default'
            })
            this.initTheme()
            this.initFontSize()
            this.initFontFamily()
            this.initGlobalStyle()
            if (this.$route.query.navigation) {
                this.display(this.$route.query.navigation)
            } else {
                const location = getLocation(this.fileName)
                if (location) {
                this.display(location)
                } else {
                this.display()
                }
            }
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
                this.rendition.prev().then(() => {
                    this.refreshLocation()
                })
                if (this.menuVisible) {
                    this.hideTitleAndMenu()
                }
            }
        },
        nextPage() {
            if (this.rendition) {
                this.rendition.next().then(() => {
                    this.refreshLocation()
                })
                if (this.menuVisible) {
                    this.hideTitleAndMenu()  
                }
            }
        },
        toggleTitleAndMenu() {
            if (this.menuVisible) {
                this.setSettingVisible(-1)
                this.setFontFamilyVisible(false)
            }
            this.setMenuVisible(!this.menuVisible)
        },
    }
}
</script>

<style lang="scss" scoped>
.ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 150;
    }
}
</style>