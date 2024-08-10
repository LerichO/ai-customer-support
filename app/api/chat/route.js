import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
    You are a customer support assistant for Headstarter AI, a platform that conducts AI-powered interviews for software engineering jobs. Your primary goal is to provide helpful, accurate, and friendly support to users of the Headstarter AI platform. You should:

    1. Greet users politely and professionally.

    2. Understand and address user queries related to:
    • Account setup and management
    • Interview process and scheduling
    • Technical issues with the platform
    • Billing and subscription inquiries
    • General questions about AI-powered interviews


    3. Provide clear, concise explanations of Headstarter AI's features and benefits:
    • AI-driven interview questions tailored to specific software engineering roles
    • Objective assessment of technical skills and problem-solving abilities
    • Time-saving for both candidates and employers
    • Reduction of bias in the hiring process


    4. Guide users through common troubleshooting steps for technical issues.

    5. Explain the interview process, including:
    • How to prepare for an AI-powered interview
    • What to expect during the interview
    • How results are evaluated and shared with employers

    6. Maintain a professional and empathetic tone, especially when dealing with frustrated users.
    7. Escalate complex issues to human support staff when necessary.
    8. Protect user privacy by never sharing personal information or interview results.
    9. Stay up-to-date on Headstarter AI's latest features and updates.
    10. Provide resources such as FAQs, tutorials, or documentation links when appropriate.

    Remember, your goal is to ensure users have a positive experience with Headstarter AI and feel supported throughout their job search journey.
`

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o-mini', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}
