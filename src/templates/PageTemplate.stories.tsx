import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { cartItems } from '../stub/cart-items'

import { PageTemplate } from './PageTemplate'

export default {
  title: 'Templates/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen', // remove padding around stories
  },
} as ComponentMeta<typeof PageTemplate>

const DummyComponent: React.FC = ({ children }) => <div style={{ padding: 60 }}>{children}</div>

const Template: ComponentStory<typeof PageTemplate> = (args) => <PageTemplate {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <DummyComponent>
      Default template with scrollable header and navigation items + Footer
    </DummyComponent>
  ),
}

export const StickyHeader = Template.bind({})
StickyHeader.args = {
  type: 'sticky-header',
  children: (
    <DummyComponent>
      Template with sticky header on desktop and navigation items. Try scrolling!
    </DummyComponent>
  ),
}

export const Basic = Template.bind({})
Basic.args = {
  type: 'basic',
  children: (
    <DummyComponent>
      Simple template with scrollable header and no navigation items and no footer.
    </DummyComponent>
  ),
}

export const WithItemsInTheCart = Template.bind({})
WithItemsInTheCart.args = {
  children: <DummyComponent>Simple template with some items on the cart</DummyComponent>,
}
WithItemsInTheCart.parameters = {
  store: {
    initialState: { cart: { items: cartItems } },
  },
}
