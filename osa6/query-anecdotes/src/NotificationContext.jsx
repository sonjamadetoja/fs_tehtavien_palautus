import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload
    case 'removeNotification': 
      return ''
  }
}

const NotificationContext = createContext()

const initialState = ''

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}


export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

// export const resetNotification = (dispatch, message, seconds) => {
//   return dispatch => {
//     console.log('resetNotification')
//     dispatch({type: 'setNotification', payload: message})
//     setTimeout(() => {dispatch({type: 'removeNotification'}), seconds*1000})
//   }
// }

export default NotificationContext