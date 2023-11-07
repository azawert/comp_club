import { FirebaseError } from 'firebase/app'

export const thunkErrorHandler = (e: unknown): string => {
  const err = e as Error | FirebaseError
  if (err instanceof FirebaseError) {
    return err.message
  }
  return `Some error ${err.message}`
}
