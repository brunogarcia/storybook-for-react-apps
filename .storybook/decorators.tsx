import React from 'react'
import { DecoratorFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { withDesign } from 'storybook-addon-designs'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { initialize as initializeMSW, mswDecorator } from 'msw-storybook-addon'

import { rootReducer } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme, darkTheme } from '../src/styles/theme'

initializeMSW()

const ThemeProviderProxy: any = ThemeProvider
const GlobalStyleProxy: any = GlobalStyle

export const withStore: DecoratorFn = (StoryFn, { parameters }) => {
  // Create a store by merging optional custom initialState coming from story parameters
  const store = configureStore({
    reducer: rootReducer,
    // if undefined, it will use default state from reducers
    preloadedState: parameters.store?.initialState,
  })
  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  )
}

const withTheme: DecoratorFn = (StoryFn, { parameters, globals }) => {
  const theme = parameters.theme || globals.theme
  const storyTheme = theme === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProviderProxy theme={storyTheme}>
      <GlobalStyleProxy />
      <StoryFn />
    </ThemeProviderProxy>
  )
}

export const withRouter: DecoratorFn = (StoryFn) => (
  <BrowserRouter>
    <StoryFn />
  </BrowserRouter>
)

export const globalDecorator = [mswDecorator, withStore, withTheme, withDesign, withRouter]
