<h1 align="center">Pagina web del Atomic Linux Team</h1>

> *Una prueba de que la curiosidad y el aburrimiento traen cosas increibles <3*
  
A ver, por pura curiosidad y aurrimiento se me dió por agarrar un proyecto bastante viejo que tenía, la idea era hacer una pagina web medianamente decente pero... creo que se me fué de las manos, JAJAJAJAJA

> [!NOTE]
> Es MUY Posible que siga mejorando la web para brindar una mejor experiencia y/o integración de las funciones

Pero bueno, vamos a desglosar esto, bueno, no desglosar pero sí van a ver un poco del funcionamiento del backend y del frontend, pero antes de nada, ¿Qué es lo que estoy usando para cada cosa? bien, esta es la respuesta:

---

<h3 align="center">Lenguajes y Frameworks que se están usando</h3>

* **Frontend**: _Para el Forntend e estado usando una combinación bastante clasica en este mundo, solo que con un par de aditivos para que se viese mejor: HTML, CSS, JS(JavaScript), Angular.JS(sí, ya se, pude haber usado React pero no, ¿Porqué no?, porque no se me dió la gana >:V, me gusta angular, que puedo decir), Anime.JS(es un Framework de JS bastante conocido y que ofrece animaciones bastante increibles solo con hacer scroll), Node.JS(el indispensable en entornos JS) y TypeScript, ese es mi combo para el Frontend_

* **Backend**: _Para el Backend es estado usando sola y llanamente **GO**, que ¿porqué Go?, es algo mas de costumbre y facilidad de uso por mi parte, Go ofrece una sintexis y funcionamiento bastante similar al de C además que es MUY rapido y bastante compatible, originalmente planeaba hacer el combo clasico de Rust + Go pero sería un dolor de cabeza para mantener y gestionar sus recursos, además que sigo aprendiendo a usar los tipados de Rust_

---

<h3 align="center">Estado actual y Hosts que estoy usando</h3>

Bien, entramos en la parte mas complicada, XD, para mantener el Frontend, osea, la pagina principal, estoy ocupando Netlify, que es gratuito, solo coloco como directorio raiz a *welcome-app*, el comando de compilación *npm run build* y el directorio de salida *welcome-app/dist/welcome-app/browser* y pues eso es lo que tengo en Netlify para el Frontend.

Por otra parte está el Backend, que lo manejo desde Render (tambien gratuito pero, es muy jodido tener dos host para mantener la misma pagina web, XD), y al estar hacho enteramente en Go, es mas rapido y facil (segun yo, no se, XD), como directorio raiz tengo la carpeta, pues, *backend* XD, como comando de compilación tengo a *go build -o main* y como comando de ejecución tengo a *./main* y tambien tengo una variable de entorno pero meh, solo sirve para conectarlo con GitHub


Bien, por el apartado actual, de su estado en como tal, especialmente de funcionamiento y apariencia, pues, bastante bien la vdd, aquí les quedán un par de ejemplos de como está quedando ahora mismo:

_Pagina de inicio, lo que ves de primero a la hora de iniciar la web, debajo del banner están los botones de unirse al discord, ir a la organización de Github y de ir al tutorial de como empezar a contribuir al proyecto_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/c299de59-f234-42c2-860f-c7ef3d25e434" />

---

_Un poco sobre nosotros y que hacemos_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/4028cda8-ee0f-4922-b8d0-12ffa83f35d5" />

---

_El estado de nuestros proyectos, aquí entra en juego el backend en Go_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/bc8dd0cd-f850-4e3e-9a29-a6af19a23b4f" />

---

_Proyectos actuales en los que estámos trabajando_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/4a92ee79-8244-4ef5-85a2-947b6e9a24bd" />

---

_Nuestro equipo actual de desarrollo y/o colaboradores_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/ba33b2f8-a535-4eaf-9fa6-fbf2026d2f22" />

---

_Una pregunta para alimentar la curiosidad del ser humano, jajajajaja_

<img width="1920" height="1200" alt="imagen" src="https://github.com/user-attachments/assets/42f18f82-6061-4873-bd62-0e76b250d414" />

---

Y bueno, eso es todo, ya se la saben, cuidencce y hasta la proxima <3

> -- By Ange
