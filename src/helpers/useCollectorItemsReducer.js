import { useReducer } from 'react'

const useCollectorItemsReducer = () => {
  const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
      case 'select': {
        return action.itemId
      }
      case 'close': {
        return null
      }
    }
  }
  const [selectedItem, dispatchItemAction] = useReducer(reducer)

  const selectCollectorItemAction = (event) => {
    let itemId = event.target.id
    dispatchItemAction({ type: 'select', itemId })
  }

  const closeCollectorItemAction = (event) => {
    dispatchItemAction({ type: 'close' })
  }

  return {
    selectedCollectorItem: selectedItem,
    selectCollectorItemAction,
    closeCollectorItemAction,
  }
}

export default useCollectorItemsReducer
