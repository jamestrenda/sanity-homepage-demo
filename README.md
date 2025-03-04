# Sanity Homepage Management Demo

A Sanity.io studio project that demonstrates a flexible model for managing homepages in Sanity Studio. For a full explanation of the strategy and implementation details, check out the guide: [How to Manage Homepages in Sanity Studio](https://www.trenda.dev/blog/how-to-manage-homepages-in-sanity-studio)

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3333](http://localhost:3333) to access the Sanity Studio

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm start` - Start the production server
- `pnpm build` - Build the studio
- `pnpm deploy` - Deploy the studio
- `pnpm deploy-graphql` - Deploy the GraphQL API

## Technical Details

### Homepage Management

The project uses a singleton document type (`homeSettings`) to manage the homepage setting. The homepage is determined by a reference field in the `homeSettings` document that points to the selected page. This approach:

- Uses `documentStore.listenQuery` to reactively subscribe to homepage changes
- Maintains a single source of truth for the homepage setting
- Properly handles both draft and published states
- Provides type-safe document references

### Studio Structure

The Sanity Studio interface is customized for better homepage management:

- A dedicated "Home" list item at the top level that shows the current homepage
- The homepage is automatically filtered out from the regular pages list to prevent confusion
- Easy access to homepage settings through a dedicated settings section
- Reactive updates to the structure when the homepage changes

### Type Safety

The project implements proper TypeScript types and null handling:

- Observable types for homepage queries using RxJS
- Null handling for cases where no homepage is set
- Type-safe document references and query results

## Dependencies

- Sanity.io v3
- React 18
- TypeScript
- RxJS for reactive programming
- Lucide React for icons

## License

MIT License - see [LICENSE](LICENSE) for details

---

_This README was automatically generated using Cursor, an AI-powered code editor._
