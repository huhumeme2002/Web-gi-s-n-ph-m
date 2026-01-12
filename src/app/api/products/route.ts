import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

// GET all products with pricing tiers
export async function GET() {
    try {
        const products = await db.select().from(schema.products).where(eq(schema.products.isActive, true));
        const tiers = await db.select().from(schema.pricingTiers);

        // Combine products with their pricing tiers
        const productsWithTiers = products.map(product => ({
            ...product,
            pricingTiers: tiers.filter(tier => tier.productId === product.id)
        }));

        return NextResponse.json(productsWithTiers);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST create new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { pricingTiers: tiers, ...productData } = body;

        // Generate ID
        const id = Date.now().toString();

        // Insert product
        await db.insert(schema.products).values({
            ...productData,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Insert pricing tiers
        if (tiers && tiers.length > 0) {
            await db.insert(schema.pricingTiers).values(
                tiers.map((tier: { duration: string; requestLimit: string; price: number; isPopular?: boolean }) => ({
                    productId: id,
                    duration: tier.duration,
                    requestLimit: tier.requestLimit,
                    price: tier.price,
                    isPopular: tier.isPopular || false,
                }))
            );
        }

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
