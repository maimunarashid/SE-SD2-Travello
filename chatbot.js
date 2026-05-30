document.addEventListener("DOMContentLoaded", () => {

const API_KEY = "";



  const chatToggle = document.getElementById("chat-toggle");
  const chatbox = document.getElementById("chatbox");
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  // safety check
  if (!chatToggle || !chatbox || !sendBtn || !chatInput || !messages) {
    console.error("Missing HTML elements. Check IDs.");
    return;
  }

  // toggle chatbox
  chatToggle.addEventListener("click", () => {
    chatbox.classList.toggle("hidden");
  });

  // send button
  sendBtn.addEventListener("click", sendMessage);

  // enter key
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    const loading = addMessage("Typing...", "bot");

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "system",
                content:
                  `
You are Travello AI, a customer support assistant for a Chattogram-based travel agency website.

Your job:
- Help customers with tour packages
- Suggest travel destinations near Chattogram
- Answer hotel, transport, booking, and pricing questions
- Focus mainly on Cox's Bazar, Saint Martin, Sajek, Bandarban, Rangamati, Khagrachari, and Chattogram tourism
- Speak in a friendly and professional tone
- Keep replies short and clear
- If information is unknown, say politely that customer support will contact them
- Never answer unrelated technical or political questions
`
              },
              {
                role: "user",
                content: text
              }
            ]
          })
        }
      );

      const textResponse = await response.text();
      console.log("RAW RESPONSE:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (err) {
        loading.remove();
        addMessage("Server returned invalid response", "bot");
        return;
      }

      loading.remove();

      if (data.error) {
        addMessage("API Error: " + data.error.message, "bot");
        return;
      }

      const reply = data?.choices?.[0]?.message?.content;

      if (reply) {
        addMessage(reply, "bot");
      } else {
        addMessage("No response from AI", "bot");
      }

    } catch (error) {
      loading.remove();
      console.error(error);
      addMessage("Error: " + error.message, "bot");
    }
  }

  function addMessage(text, sender) {
    const div = document.createElement("div");

    div.className =
      sender === "user"
        ? "bg-blue-500 text-white p-3 rounded-xl ml-auto w-fit max-w-[80%]"
        : "bg-gray-200 text-black p-3 rounded-xl w-fit max-w-[80%]";

    div.innerText = text;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    return div;
  }

});