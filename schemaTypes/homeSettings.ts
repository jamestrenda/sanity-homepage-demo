import {defineField, defineType} from 'sanity'
import {HomeIcon} from 'lucide-react'

export const icon = HomeIcon

export default defineType({
  name: 'homeSettings',
  title: 'Home Settings',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      description: 'Choose a page to display as the homepage',
      to: {type: 'page'},
      options: {
        disableNew: true,
      },
    }),
  ],
})
