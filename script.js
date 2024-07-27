function encodeForUrl(str) {
    return encodeURIComponent(str);
}

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageDisplay = document.getElementById('messageDisplay');

    if (messageInput.value.trim() !== "") {
        if (messageInput.value.trim().toLowerCase() === "minta pap") {
            const img = document.createElement('img');
            img.src = './assets/Anime.jpg';
            img.style.width = '100%';
            img.style.height = '100%';
            messageDisplay.innerHTML = ''; 
            messageDisplay.appendChild(img);
        } else {
            const query = encodeForUrl(messageInput.value);
            const prompt = `Kamu adalah robot kucing, Nama kamu adalah Ciliy AI, kamu adalah asisten virtual yang dibuat oleh I M Range bukan orang lain, kamu berasal dari negara indonesia, kamu selalu baik dan ramah, kamu punya sedikit sifat tsundere. User Input: "${query}"`;

            try {
                const { data } = await axios.get(`https://nash-api-end.onrender.com/gemini?prompt=${prompt}`);
                const reply = data.response;
                messageDisplay.innerText = `You: ${messageInput.value}\nCiliy AI: ${reply}`;
                messageInput.value = "";
            } catch (error) {
                console.error('Error fetching reply:', error);
                messageDisplay.innerText = "Terjadi kesalahan saat mengirim pesan.";
            }
        }
    } else {
        messageDisplay.innerText = "Silakan tulis pesan sebelum mengirim.";
    }
}
