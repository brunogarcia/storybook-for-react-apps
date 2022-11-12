import React from 'react'
import { DecoratorFn } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { withDesign } from 'storybook-addon-designs'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { initialize as initializeMSW, mswDecorator } from 'msw-storybook-addon'

import { rootReducer } from '../src/app-state'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme, darkTheme } from '../src/styles/theme'

initializeMSW()

const ThemeProviderProxy: any = ThemeProvider
const GlobalStyleProxy: any = GlobalStyle

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

/**
 *
 * Provide components support for Redux store
 * optionally passing custom initial state, and using default initial state if not passed
 *
 * @example
 * export const MyComponent = () => Template.bind({})
 * MyComponent.parameters = {
 *   store: {
 *     initialState: {
 *       foo: 'bar'
 *     },
 *   }
 * };
 */
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

/**
 *
 * Provide components support for routing support and simulated deeplinking
 * it renders the component with a mocked history based on the route passed
 *
 * @example`
 * export const MyComponent = () => Template.bind({})
 * MyComponent.parameters = {
 *   deeplink: {
 *     path = '/restaurant/:id',
 *     route = '/restaurant/12',
 *   }
 * };
 */
export const withRouter: DecoratorFn = (StoryFn, { parameters: { deeplink } }) => {
  // if there's no deeplink parameter, just return the story in a BrowserRouter
  if (!deeplink) {
    return (
      <BrowserRouter>
        <StoryFn />
      </BrowserRouter>
    )
  }

  // if there is a deeplink parameter, wrap the story with a simulated route in MemoryRouter
  const { path, route } = deeplink

  return (
    <MemoryRouter
      // encode the route to simulate what the browser would do
      initialEntries={[encodeURI(route)]}
    >
      <Routes>
        <Route path={path} element={<StoryFn />} />
      </Routes>
    </MemoryRouter>
  )
}

export const globalDecorator = [mswDecorator, withStore, withTheme, withDesign, withRouter]
