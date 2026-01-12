import { pgTable, text, integer, boolean, timestamp, serial } from 'drizzle-orm/pg-core';

// Products table
export const products = pgTable('products', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    icon: text('icon').notNull(),
    imageUrl: text('image_url'),
    description: text('description').notNull(),
    features: text('features').array().notNull(),
    tag: text('tag'),
    contactLink: text('contact_link').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Pricing tiers table
export const pricingTiers = pgTable('pricing_tiers', {
    id: serial('id').primaryKey(),
    productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
    duration: text('duration').notNull(),
    requestLimit: text('request_limit').notNull(),
    price: integer('price').notNull(),
    isPopular: boolean('is_popular').default(false).notNull(),
});

// Bills table
export const bills = pgTable('bills', {
    id: text('id').primaryKey(),
    imageUrl: text('image_url').notNull(),
    date: text('date').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type exports
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type PricingTier = typeof pricingTiers.$inferSelect;
export type NewPricingTier = typeof pricingTiers.$inferInsert;
export type Bill = typeof bills.$inferSelect;
export type NewBill = typeof bills.$inferInsert;
