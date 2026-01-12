import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

// DELETE bill
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await db.delete(schema.bills).where(eq(schema.bills.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting bill:', error);
        return NextResponse.json({ error: 'Failed to delete bill' }, { status: 500 });
    }
}
