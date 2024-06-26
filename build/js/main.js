import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY_GEMINI = "AIzaSyAms7u6yB1z5lsooLtDFnCYPf38xG6RMVo";
const API_KEY_GEMINI2 = "AIzaSyC3Z-b_9dXqEVCuPWn7UcOj3ntF-HQCR1s";
const API_KEY_GEMINI3 = "AIzaSyAdxscC2HHWS1AL6ewM6SSlv1jdpGvQzpw";

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI3);
const inputText = document.getElementById("input-query");
const chatSection = document.getElementById("chat-section");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    temperature: 1.0 // Adjust this value between 0.0 and 1.0
  });

document.getElementById("btn-send").addEventListener("click", async () => {
    //obtener el valor del input y limpuar el input
    const textInputValue = inputText.value;
    inputText.value = "";
    console.log(textInputValue);

    //crear un nuevo parrafo y agregarlo al chat
    const newParagraph = document.createElement("p");

    newParagraph.textContent = textInputValue;
    newParagraph.classList.add(
        "text-end",
        "py-2",
        "px-4",
        "rounded-md",
        "max-w-[4rem]",
        "bg-white/10",
        "text-wrap"
    );
    chatSection.appendChild(newParagraph);

    //crear la prompt
    const prompt = textInputValue;

    try {
        const loadingText = "Generando contenido...";
        const loadingParagraph = document.createElement("p");
        loadingParagraph.textContent = loadingText;
        loadingParagraph.classList.add(
            "text-start",
            "p-2",
            "rounded-md",
            "text-wrap",
            "leading-loose"
        );
        chatSection.appendChild(loadingParagraph);

        //obtener la respuesta de la API
        const result = await model.generateContent(prompt);
        const response = result.response.candidates[0].content.parts[0].text;
        // const response = "Lorem ipsum dolor sit amet consectetur adipiscing elit"

        chatSection.removeChild(loadingParagraph);

        //crear un nuevo parrafo y agregarlo al chat
        const newParagraphResponse = document.createElement("p");
        newParagraphResponse.textContent = response;
        newParagraphResponse.classList.add(
            "text-start",
            "p-2",
            "rounded-md",
            "text-wrap",
            "leading-loose"
        );
        chatSection.appendChild(newParagraphResponse);
        // console.log(response);
    } catch (error) {
        console.error("Error al generar contenido:", error);
        const newParagraphResponseError = document.createElement("p");
        newParagraphResponseError.textContent = "Error al generar contenido";
        newParagraphResponseError.classList.add(
            "text-start",
            "p-2",
            "rounded-md",
            "text-wrap",
            "leading-loose"
        );
        chatSection.appendChild(newParagraphResponseError);
    }
});

document.getElementById("btn-clean-chat").addEventListener("click", () => {
    while (chatSection.firstChild) {
        chatSection.removeChild(chatSection.firstChild);
    }
});
