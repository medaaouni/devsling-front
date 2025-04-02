import type { Meta, StoryObj } from '@storybook/angular';
import { SearchPageComponent } from './search-page.component';


const meta: Meta<SearchPageComponent> = {
  title: 'Pokemon/Search Page',
  component: SearchPageComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SearchPageComponent>;


export const DefaultState: Story = {
  name: 'Default View'
};

