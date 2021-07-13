import React, { FC, useEffect, createContext, useContext } from 'react'
import { FirebaseApp } from 'firebase/app'

const FirebaseContext = createContext<FirebaseApp | null>(null)

export const useFirebase = (fn, dep = []) => {
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    if (!firebase) {
      return
    }
    return fn(firebase)
  }, [firebase, ...dep])
}

export default FirebaseContext
