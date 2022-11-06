// src/components/Badge/Badge.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge } from './Badge'

// Metadata of our component
export default {
  title: 'Components/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>

// Base Template
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

// Story, a component variation consisting of a template + args
export const Default = Template.bind({})
Default.args = {
  text: 'Comfort food',
}

export const DarkTheme = Template.bind({})
DarkTheme.args = {
  text: 'Comfort food',
}
DarkTheme.parameters = {
  theme: 'dark',
}
