document.getElementById("transcribeButton").addEventListener("click", async () => {
    console.log("לחיצה על כפתור התמלול");

    const audioFile = document.getElementById("audioFile").files[0];
    if (!audioFile) {
        alert("בחר קובץ אודיו");
        console.log("שגיאה: קובץ אודיו לא נבחר");
        return;
    }

    console.log("קובץ אודיו נבחר:", audioFile.name);

    const formData = new FormData();
    formData.append("data", audioFile); // 'data' הוא השם שמצופה ב-HF Spaces

    console.log("שליחת בקשה ל-API ב-HF Space...");

    try {
        const response = await fetch("https://Nitzantry1-ivrit-ai-whisper-v2-d3-e3-2.hf.space/run/predict", {
            method: "POST",
            body: formData
        });

        console.log("תשובת השרת התקבלה. סטטוס:", response.status);

        if (!response.ok) {
            console.log("שגיאה בתשובת השרת:", response.status, response.statusText);
            throw new Error(`שגיאה בשרת: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("תשובה מהשרת:", data);

        // תוצאת התמלול תימצא בדרך כלל ב-'data[0].data'
        document.getElementById("result").innerText = data.data[0].data;
        console.log("תמלול הושלם בהצלחה");
    } catch (error) {
        console.error("שגיאה בזמן התהליך:", error.message);
        document.getElementById("result").innerText = "שגיאה: " + error.message;
    }
});
