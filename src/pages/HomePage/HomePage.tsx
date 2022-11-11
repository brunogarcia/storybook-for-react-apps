import styled from 'styled-components'

import { categories } from '../../stub/categories'
import { PageTemplate } from '../../templates/PageTemplate'

import { Banner } from './components/Banner'
import { RestaurantsSection } from './components/RestaurantsSection'
import { AwardWinningSection } from './components/AwardWinningSection'
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection'

const Spacing = styled.div`
  margin-bottom: 4.5rem;
`

export const HomePage = () => {
  return (
    <PageTemplate>
      <Banner />
      <Spacing />
      <RestaurantsSection title="Our favorite picks" />
      <Spacing />
      <AwardWinningSection />
      <Spacing />
      <CategoriesSection categories={categories} />
      <Spacing />
    </PageTemplate>
  )
}
