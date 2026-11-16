(function () {
  var previo = document.getElementById("asistente-virtual-widget");
  if (previo) previo.remove();

  function cargarWidget() {
    var style = document.createElement("style");
    style.textContent = `
      #asistente-virtual-widget {
        position: fixed;
        bottom: 38px;
        left: 22px;
        z-index: 2147483647;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        color: #222222;
      }
      #ps-chat-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: #b59449;
        color: #ffffff;
        border: none;
        border-radius: 50px;
        padding: 13px 20px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.4px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
        transition: transform 0.25s ease, background-color 0.25s ease;
      }
      #ps-chat-toggle:hover {
        background-color: #9e7f3a;
        transform: translateY(-2px);
      }
      #ps-chat-toggle svg {
        width: 22px;
        height: 22px;
        fill: currentColor;
      }
      #ps-chat-window {
        display: none;
        flex-direction: column;
        width: 360px;
        max-width: calc(100vw - 44px);
        height: 490px;
        max-height: calc(100vh - 120px);
        background-color: #ffffff;
        border-radius: 14px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.24);
        border: 1px solid #e8e2d5;
        overflow: hidden;
        margin-bottom: 14px;
        animation: psFadeIn 0.25s ease-out;
      }
      #ps-chat-window.open {
        display: flex;
      }
      @keyframes psFadeIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ps-chat-header {
        background-color: #1e1e1e;
        color: #ffffff;
        padding: 16px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #b59449;
      }
      .ps-chat-header-info h4 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #ffffff;
      }
      .ps-chat-header-info span {
        font-size: 11px;
        color: #d4be87;
        display: block;
        margin-top: 2px;
      }
      #ps-chat-close {
        background: none;
        border: none;
        color: #cccccc;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        padding: 0 4px;
      }
      #ps-chat-close:hover {
        color: #ffffff;
      }
      #ps-chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background-color: #faf8f5;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ps-msg {
        max-width: 85%;
        padding: 11px 14px;
        border-radius: 12px;
        font-size: 13.5px;
        line-height: 1.48;
        word-wrap: break-word;
      }
      .ps-msg-bot {
        align-self: flex-start;
        background-color: #ffffff;
        color: #222222;
        border: 1px solid #e6dfd1;
        border-bottom-left-radius: 3px;
      }
      .ps-msg-bot a {
        color: #9e7f3a;
        font-weight: 700;
        text-decoration: underline;
      }
      .ps-msg-user {
        align-self: flex-end;
        background-color: #b59449;
        color: #ffffff;
        border-bottom-right-radius: 3px;
      }
      .ps-options-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
        align-self: flex-start;
        width: 85%;
      }
      .ps-option-btn {
        background-color: #ffffff;
        color: #1e1e1e;
        border: 1.5px solid #b59449;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 13.5px;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .ps-option-btn:hover {
        background-color: #b59449;
        color: #ffffff;
      }
      .ps-chat-input-area {
        display: flex;
        padding: 12px;
        background-color: #ffffff;
        border-top: 1px solid #e8e2d5;
        gap: 8px;
      }
      #ps-chat-input {
        flex: 1;
        border: 1px solid #dcd5c7;
        border-radius: 20px;
        padding: 9px 14px;
        font-size: 13.5px;
        outline: none;
        background-color: #ffffff;
        color: #222222;
      }
      #ps-chat-input:focus {
        border-color: #b59449;
      }
      #ps-chat-input:disabled {
        background-color: #f1efe9;
        color: #888888;
        cursor: not-allowed;
      }
      #ps-chat-send {
        background-color: #b59449;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      #ps-chat-send:disabled {
        background-color: #d6cbb3;
        cursor: not-allowed;
      }
      #ps-chat-send:not(:disabled):hover {
        background-color: #9e7f3a;
      }
      .ps-typing {
        font-style: italic;
        color: #777777;
        font-size: 12.5px;
      }
    `;
    document.head.appendChild(style);

    var widget = document.createElement("div");
    widget.id = "asistente-virtual-widget";
    widget.style.display = "none";
    widget.innerHTML = `
      <div id="ps-chat-window" role="dialog" aria-label="Asistente virtual Paulino Sancho">
        <div class="ps-chat-header">
          <div class="ps-chat-header-info">
            <h4>Paulino Sancho</h4>
            <span>Ceremonia · Desde 1985</span>
          </div>
          <button id="ps-chat-close" aria-label="Cerrar chat">&times;</button>
        </div>
        <div id="ps-chat-messages"></div>
        <form class="ps-chat-input-area" id="ps-chat-form">
          <input type="text" id="ps-chat-input" placeholder="Selecciona una opción arriba..." disabled autocomplete="off" />
          <button type="submit" id="ps-chat-send" disabled aria-label="Enviar mensaje">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
      <button id="ps-chat-toggle" aria-label="Abrir asistente virtual">
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <span>¿Te ayudamos?</span>
      </button>
    `;
    document.body.appendChild(widget);

    // Instrucción obligatoria para mostrarlo en cualquier web
    document.getElementById("asistente-virtual-widget").style.setProperty("display", "block", "important");

    var GEMINI_API_KEY = "";
    var SYSTEM_PROMPT =
      "Eres el asistente virtual oficial de 'Paulino Sancho Ceremonia', tienda de trajes y vestidos de ceremonia en Valencia. " +
      "Responde de forma amable, cercana, elegante y concisa en español usando exclusivamente estos datos de la tienda:\n" +
      "- Trayectoria: Más de 40 años de experiencia ('Tu mejor reflejo desde 1985'), más de 3.000 novios felices y valoración de 4,7 estrellas en Google con 793 reseñas.\n" +
      "- Filosofía: Asesoramiento cercano y personalizado, y garantía de exclusividad (nadie llevará tu mismo modelo en ese evento).\n" +
      "- Colecciones disponibles: Novio (trajes de novio), Madrina (vestidos de madrina), Invitado y Padrino, Fiesta (vestidos de fiesta), Clavariesa, Comunión y Complementos.\n" +
      "- Ubicación: Av. d'Ausiàs March, 50, 46970 Alaquàs, Valencia (a solo 7 minutos en coche del centro de Valencia, con parking gratuito disponible para clientes).\n" +
      "- Horario habitual: Lunes a viernes de 10:00 a 14:00 y de 17:00 a 20:30. Sábados de 10:00 a 14:00 y de 17:00 a 21:00. Domingos cerrado.\n" +
      "- Cita previa y contacto: Teléfono 961 17 71 98 o mediante el formulario web en https://www.paulinosancho.com/#cita";

    var toggleBtn = document.getElementById("ps-chat-toggle");
    var closeBtn = document.getElementById("ps-chat-close");
    var chatWindow = document.getElementById("ps-chat-window");
    var messagesContainer = document.getElementById("ps-chat-messages");
    var chatForm = document.getElementById("ps-chat-form");
    var chatInput = document.getElementById("ps-chat-input");
    var sendBtn = document.getElementById("ps-chat-send");

    var initialized = false;
    var chatHistory = [];

    function addMessage(htmlText, sender) {
      var msgDiv = document.createElement("div");
      msgDiv.className = "ps-msg " + (sender === "user" ? "ps-msg-user" : "ps-msg-bot");
      msgDiv.innerHTML = htmlText;
      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return msgDiv;
    }

    function enableChatInput() {
      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.placeholder = "Escribe tu consulta sobre la tienda...";
      chatInput.focus();
    }

    function initConversation() {
      if (initialized) return;
      initialized = true;

      addMessage(
        "¡Bienvenido a <strong>Paulino Sancho</strong>! Donde tus ceremonias cobran vida con más de 40 años de experiencia vistiendo momentos inolvidables. ¿En qué puedo ayudarte?",
        "bot"
      );

      var optionsDiv = document.createElement("div");
      optionsDiv.className = "ps-options-container";

      var btnCita = document.createElement("button");
      btnCita.type = "button";
      btnCita.className = "ps-option-btn";
      btnCita.textContent = "📅 Pedir cita";

      var btnHorario = document.createElement("button");
      btnHorario.type = "button";
      btnHorario.className = "ps-option-btn";
      btnHorario.textContent = "🕒 Horarios de la tienda";

      btnCita.addEventListener("click", function () {
        optionsDiv.remove();
        addMessage("Pedir cita", "user");
        addMessage(
          'Puedes pedir tu cita previa llamando al teléfono <strong>961 17 71 98</strong> o también desde <a href="https://www.paulinosancho.com/#cita" target="_blank" rel="noopener">aquí</a>.<br><br>A partir de ahora ya puedes escribirme cualquier consulta sobre la tienda o nuestras colecciones.',
          "bot"
        );
        chatHistory.push({ role: "user", text: "Quiero pedir cita" });
        chatHistory.push({ role: "model", text: "Puedes pedir cita previa llamando al 961 17 71 98 o desde la web." });
        enableChatInput();
      });

      btnHorario.addEventListener("click", function () {
        optionsDiv.remove();
        addMessage("Horarios de la tienda", "user");
        addMessage(
          "Nuestro horario de atención en tienda es:<br>" +
          "• <strong>Lunes a viernes:</strong> 10:00–14:00 y 17:00–20:30<br>" +
          "• <strong>Sábados:</strong> 10:00–14:00 y 17:00–21:00<br>" +
          "• <strong>Domingos:</strong> Cerrado<br><br>" +
          "A partir de ahora ya puedes escribirme cualquier consulta sobre nuestros trajes, vestidos o ubicación.",
          "bot"
        );
        chatHistory.push({ role: "user", text: "¿Cuál es el horario de la tienda?" });
        chatHistory.push({ role: "model", text: "Lunes a viernes 10:00-14:00 y 17:00-20:30. Sábados 10:00-14:00 y 17:00-21:00. Domingos cerrado." });
        enableChatInput();
      });

      optionsDiv.appendChild(btnCita);
      optionsDiv.appendChild(btnHorario);
      messagesContainer.appendChild(optionsDiv);
    }

    toggleBtn.addEventListener("click", function () {
      chatWindow.classList.toggle("open");
      if (chatWindow.classList.contains("open")) {
        initConversation();
      }
    });

    closeBtn.addEventListener("click", function () {
      chatWindow.classList.remove("open");
    });

    function getLocalAIResponse(question) {
      var q = question.toLowerCase();

      if (q.includes("cita") || q.includes("reservar") || q.includes("telefono") || q.includes("teléfono") || q.includes("llamar")) {
        return 'Para reservar tu cita personalizada puedes llamarnos al <strong>961 17 71 98</strong> o rellenar el formulario directamente desde <a href="https://www.paulinosancho.com/#cita" target="_blank" rel="noopener">aquí</a>.';
      }
      if (q.includes("horario") || q.includes("abierto") || q.includes("abris") || q.includes("abrís") || q.includes("hora") || q.includes("sabado") || q.includes("sábado") || q.includes("domingo")) {
        return "Abrimos de <strong>lunes a viernes de 10:00 a 14:00 y de 17:00 a 20:30</strong>, y los <strong>sábados de 10:00 a 14:00 y de 17:00 a 21:00</strong>. Los domingos permanecemos cerrados.";
      }
      if (q.includes("donde") || q.includes("dónde") || q.includes("ubicacion") || q.includes("ubicación") || q.includes("direccion") || q.includes("dirección") || q.includes("llegar") || q.includes("parking") || q.includes("aparcar") || q.includes("valencia") || q.includes("alaquas") || q.includes("alaquàs")) {
        return "Estamos en <strong>Av. d'Ausiàs March, 50, 46970 Alaquàs (Valencia)</strong>, a solo 7 minutos en coche del centro de Valencia. Además, disponemos de <strong>parking gratuito</strong> para nuestros clientes.";
      }
      if (q.includes("novio") || q.includes("madrina") || q.includes("fiesta") || q.includes("invitado") || q.includes("padrino") || q.includes("clavariesa") || q.includes("comunion") || q.includes("comunión") || q.includes("complemento") || q.includes("traje") || q.includes("vestido") || q.includes("coleccion") || q.includes("colección") || q.includes("teneis") || q.includes("tenéis")) {
        return "Contamos con colecciones especializadas para <strong>Novio, Madrina, Invitado y Padrino, Vestidos de Fiesta, Clavariesa, Comunión y Complementos</strong>. Ofrecemos asesoramiento cercano y personalizado con <strong>garantía de exclusividad</strong>: nadie llevará tu mismo modelo en tu evento.";
      }
      if (q.includes("exclusiv") || q.includes("repetir") || q.includes("igual") || q.includes("garantia") || q.includes("garantía")) {
        return "En Paulino Sancho garantizamos la <strong>exclusividad</strong>: nos aseguramos de que nadie más lleve tu mismo modelo en ese mismo evento.";
      }
      if (q.includes("precio") || q.includes("cuesta") || q.includes("presupuesto") || q.includes("vale")) {
        return 'Trabajamos con distintas firmas y opciones adaptadas a cada ceremonia con asesoramiento personalizado. Te recomendamos pedir cita previa llamando al <strong>961 17 71 98</strong> o desde <a href="https://www.paulinosancho.com/#cita" target="_blank" rel="noopener">aquí</a> para mostrarte modelos y precios en tienda.';
      }
      if (q.includes("opinion") || q.includes("opinión") || q.includes("reseña") || q.includes("experiencia") || q.includes("quienes") || q.includes("quiénes")) {
        return "Somos una boutique familiar con <strong>más de 40 años de experiencia</strong> (desde 1985), más de 3.000 novios felices y una valoración de <strong>4,7 estrellas en Google</strong> con 793 reseñas.";
      }

      return 'En <strong>Paulino Sancho Ceremonia</strong> (Alaquàs, Valencia) llevamos más de 40 años vistiendo a <strong>novios, madrinas, invitados, fiesta, clavariesas y comuniones</strong> con asesoramiento personalizado y parking gratuito. Puedes consultarme sobre nuestras colecciones, ubicación, horarios o pedir cita desde <a href="https://www.paulinosancho.com/#cita" target="_blank" rel="noopener">aquí</a>.';
    }

    async function askAI(userText) {
      if (!GEMINI_API_KEY) {
        await new Promise(function (r) { setTimeout(r, 450); });
        return getLocalAIResponse(userText);
      }

      try {
        var contents = chatHistory.map(function (item) {
          return { role: item.role, parts: [{ text: item.text }] };
        });
        contents.push({ role: "user", parts: [{ text: userText }] });

        var response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(GEMINI_API_KEY),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents: contents
            })
          }
        );

        var data = await response.json();
        var text = data.candidates[0].content.parts[0].text;
        return text
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/https:\/\/www\.paulinosancho\.com\/#cita/g, '<a href="https://www.paulinosancho.com/#cita" target="_blank" rel="noopener">aquí</a>')
          .replace(/\n/g, "<br>");
      } catch (err) {
        return getLocalAIResponse(userText);
      }
    }

    chatForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text) return;

      addMessage(text.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "user");
      chatInput.value = "";
      chatInput.disabled = true;
      sendBtn.disabled = true;

      var typingMsg = addMessage('<span class="ps-typing">Escribiendo...</span>', "bot");
      var reply = await askAI(text);
      typingMsg.innerHTML = reply;

      chatHistory.push({ role: "user", text: text });
      chatHistory.push({ role: "model", text: reply.replace(/<[^>]*>?/gm, " ") });

      chatInput.disabled = false;
      sendBtn.disabled = false;
      chatInput.focus();
    });
  }

  if (document.body) {
    cargarWidget();
  } else {
    document.addEventListener("DOMContentLoaded", cargarWidget);
  }
})();