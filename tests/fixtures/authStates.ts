export const initialState={
  status:'not-authenticated',
  user: {},
  errorMessage:undefined
}

export const authenticatedState={
  status:'authenticated',
  user: {
    uid:'abc',
    name:'Roberto'
  },
  errorMessage:undefined
}

export const notAuthenticatedState={
  status:'not-authenticated',
  user: { },
  errorMessage:undefined
}