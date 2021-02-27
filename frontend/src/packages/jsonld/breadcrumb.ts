interface ParamsBreadcrumb {
  name: string
  url: string
}

interface ItemListElement {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

interface Breadcrumb {
  '@type': 'BreadcrumbList'
  itemListElement: ItemListElement[]
}

const breadcrumb = (breadcrumb: ParamsBreadcrumb[]): Breadcrumb => {
  const _itemListElement: ItemListElement[] = breadcrumb.map<ItemListElement>(
    ({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url
    })
  )
  return {
    '@type': 'BreadcrumbList',
    itemListElement: _itemListElement
  }
}

export { breadcrumb, ParamsBreadcrumb }
