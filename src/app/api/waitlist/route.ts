import { NextRequest, NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);
    
    // In a real application, you would:
    // 1. Store data in a database
    // 2. Send confirmation email
    // 3. Add to email marketing system
    console.log('Waitlist submission:', validatedData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!' 
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid data submitted' },
      { status: 400 }
    );
  }
} 