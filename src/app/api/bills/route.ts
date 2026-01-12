import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { desc } from 'drizzle-orm';

// GET all bills
export async function GET() {
    try {
        const bills = await db.select().from(schema.bills).orderBy(desc(schema.bills.createdAt));
        return NextResponse.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        return NextResponse.json({ error: 'Failed to fetch bills' }, { status: 500 });
    }
}

// POST create new bill
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Generate ID
        const id = Date.now().toString();

        await db.insert(schema.bills).values({
            id,
            imageUrl: body.imageUrl,
            date: body.date || new Date().toISOString().split('T')[0],
            description: body.description,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Error creating bill:', error);
        return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
    }
}
