import React from 'react'
import { withDesign } from 'storybook-addon-designs'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { initialize as initializeMSW, mswDecorator } from 'msw-storybook-addon'

import { DecoratorFn } from '@storybook/react'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme, darkTheme } from '../src/styles/theme'

initializeMSW()

const ThemeProviderProxy: any = ThemeProvider
const GlobalStyleProxy: any = GlobalStyle

const withTheme: DecoratorFn = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
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

export const globalDecorator = [mswDecorator, withTheme, withDesign, withRouter]
