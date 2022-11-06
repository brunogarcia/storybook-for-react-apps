import React from 'react'
import { ThemeProvider } from 'styled-components'

import { DecoratorFn } from '@storybook/react'
import { lightTheme } from '../src/styles/theme'
import { GlobalStyle } from '../src/styles/GlobalStyle'

const withTheme: DecoratorFn = (StoryFn: any) => (
  <>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <StoryFn />
    </ThemeProvider>
  </>
)

export const globalDecorator = [withTheme]
