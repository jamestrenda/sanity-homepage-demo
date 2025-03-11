import {FileIcon} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export const icon = FileIcon

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
})
