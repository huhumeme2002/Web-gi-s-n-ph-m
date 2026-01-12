import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

// PUT update product
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { pricingTiers: tiers, ...productData } = body;

        // Update product
        await db.update(schema.products)
            .set({
                ...productData,
                updatedAt: new Date(),
            })
            .where(eq(schema.products.id, id));

        // Delete old pricing tiers and insert new ones
        if (tiers) {
            await db.delete(schema.pricingTiers).where(eq(schema.pricingTiers.productId, id));

            if (tiers.length > 0) {
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
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

// DELETE product
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Delete pricing tiers first (cascade should handle this but being explicit)
        await db.delete(schema.pricingTiers).where(eq(schema.pricingTiers.productId, id));

        // Delete product
        await db.delete(schema.products).where(eq(schema.products.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
