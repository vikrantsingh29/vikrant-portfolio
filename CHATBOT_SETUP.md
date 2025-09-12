# Setting Up the AI Chatbot with OpenRouter

This guide explains how to configure the OpenRouter API key to enable full AI-powered conversations in your portfolio chatbot.

## Quick Setup

1. **Get an OpenRouter API key**:
   - Go to [https://openrouter.ai/](https://openrouter.ai/)
   - Sign up for a free account
   - Navigate to "Keys" in your dashboard
   - Generate a new API key

2. **Configure your project**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and replace the placeholder with your actual API key
   # Change this line:
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   # To something like:
   VITE_OPENROUTER_API_KEY=sk-or-v1-abcd1234...
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Test the chatbot**:
   - Click the chat button in the bottom-right corner
   - The header should show "Powered by OpenRouter" instead of "Using smart responses"
   - Ask any question about your background, skills, or projects

## How It Works

### With API Key Configured
- Uses OpenRouter's AI models (currently meta-llama/llama-3.1-8b-instruct:free)
- Provides dynamic, contextual responses
- Header shows: "Powered by OpenRouter"

### Without API Key (Fallback Mode)
- Uses intelligent predefined responses
- Still provides helpful information about projects, skills, experience, etc.
- Header shows: "Using smart responses"

## Troubleshooting

### Common Issues

1. **Chatbot shows "Using smart responses" even with API key set**:
   - Make sure you replaced `your_openrouter_api_key_here` with your actual API key
   - Restart the development server after changing the .env file

2. **API key not working**:
   - Verify your API key is correct on [OpenRouter dashboard](https://openrouter.ai/keys)
   - Check that your OpenRouter account has sufficient credits
   - Look at browser console for error messages

3. **Environment variable not loading**:
   - Ensure your .env file is in the project root directory
   - Make sure the variable starts with `VITE_` prefix
   - Restart the development server

### Security Notes

- Never commit your actual API key to version control
- The `.env` file is included in `.gitignore` to prevent accidental commits
- Only use your API key on trusted domains

## Customization

You can customize the chatbot behavior by editing `src/ui/Chatbot.jsx`:

- **System prompt** (lines 26-41): Defines what the AI knows about you
- **Fallback responses** (lines 45-69): Predefined responses for common questions
- **AI model**: Currently uses `meta-llama/llama-3.1-8b-instruct:free` (free tier)

## Cost Information

OpenRouter offers free tier usage with rate limits. For production use, consider:
- Upgrading to a paid plan for higher rate limits
- Using a more powerful model for better responses
- Implementing your own proxy server for additional control

For more information, visit [OpenRouter's documentation](https://openrouter.ai/docs).