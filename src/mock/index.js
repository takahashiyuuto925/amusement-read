import Mock from 'mockjs'
import home from './bookHome'
import shelf from './bookShelf'
import list from './bookList'
import flatList from './bookFlatList'

Mock.mock(/\/bookstore\/home/, 'get', home)
Mock.mock(/\/bookstore\/shelf/, 'get', shelf)
Mock.mock(/\/bookstore\/list/, 'get', list)
Mock.mock(/\/bookstore\/flatList/, 'get', flatList)