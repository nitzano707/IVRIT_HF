document.getElementById("transcribeButton").addEventListener("click", async () => {
    const audioFile = document.getElementById("audioFile").files[0];
    if (!audioFile) {
        alert("בחר קובץ אודיו");
        return;
    }

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/ivrit-ai/faster-whisper-v2-d4", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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" // החלף את YOUR_HUGGING_FACE_TOKEN בטוקן שלך
            },
            body: formData
        });

        if (!response.ok) throw new Error("שגיאה בתמלול");

        const data = await response.json();
        document.getElementById("result").innerText = data.text;
    } catch (error) {
        document.getElementById("result").innerText = "שגיאה: " + error.message;
    }
});
