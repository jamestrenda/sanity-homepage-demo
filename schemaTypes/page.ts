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
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare: ({title, slug = {current: ''}}) => {
      const path = `/${slug.current}`

      return {
        title: `${title || 'Untitled'}`,
        subtitle: slug.current ? path : '(missing slug)',
        media: FileIcon,
      }
    },
  },
})
