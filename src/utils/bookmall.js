import { setLocalStorage, getLocalStorage, getBookShelf, saveBookShelf } from './localstorage'

export function getCategoryName(id) {
    switch (id) {
      case 1:
        return 'xuanhuan'
      case 2:
        return 'qihuan'
      case 3:
        return 'xianxia'
      case 4:
        return 'dushi'
      case 5:
        return 'qingxiaoshuo'
    }
}

export function categoryText(category, vue) {
switch (category) {
    case 1:
    return vue.$t('category.xuanhuan')
    case 2:
    return vue.$t('category.qihuan')
    case 3:
    return vue.$t('category.xianxia')
    case 4:
    return vue.$t('category.dushi')
    case 5:
    return vue.$t('category.qingxiaoshuo')
}
}

export const categoryList = {
'xuanhuan': 1,
'qihuan': 2,
'xianxia': 3,
'dushi': 4,
'qingxiaoshuo': 5,
}

export function appendAddToShelf(list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function removeAddFromShelf(list) {
  return list.filter(item => item.type !== 3)
}

export function gotoBookmallHome(vue) {
  vue.$router.push({
    path: '/bookmall/home'
  })
}

export function gotoBookDetail(vue, book) {
  vue.$router.push({
    path: '/bookmall/detail',
    query: {
        fileName: book.fileName,
        category: book.categoryText
    }
})
}

export function computeId(list) {
  return list.map((book, index) => {
    if (book.type !== 3) {
      book.id = index + 1
      if (book.itemList) {
        book.itemList = computeId(book.itemList)
      }
    }
    return book
  })
}

export function addToShelf(book) {
  let shelfList = getBookShelf()
  shelfList = removeAddFromShelf(shelfList)
  book.type = 1
  shelfList.push(book)
  shelfList = computeId(shelfList)
  shelfList = appendAddToShelf(shelfList)
  saveBookShelf(shelfList)
}

export function removeFromBookShelf(book) {
  return getBookShelf().filter(item => {
    if (item.itemList) {
      item.itemList = removeAddFromShelf(item.itemList)
    }
    return item.fileName !== book.fileName
  })
}