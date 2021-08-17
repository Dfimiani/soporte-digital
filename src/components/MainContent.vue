<template>
  <div class="bg-gray-100 flex-1 p-7">
    <form class="w-full max-w-lg">
      
      <!-- ASUNTO -->
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">

          <div class="flex justify-between items-center">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="asunto" >
              Asunto
            </label>
            
            
            <button class="h-4 bg-blue-200 hover:bg-blue-300 text-gray-800 text-xs px-2 rounded-full mb-2" @click="ClearForm">
              Limpiar
            </button>
          </div>

          <input
            v-model="subject"
            required
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " id="asunto" type="text" />
        </div>
      </div>

      <!-- DESCRIPCION -->
      <div class="flex -mx-3 mb-4">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="descripcion">
            Descripcion
          </label>
          <p class="text-gray-600 text-xs italic">
            Agregue una breve descripcion.
          </p>
          <textarea required v-model="description" class="mt-2 w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="descripcion"
            id="descripcion"
            cols="35"
            rows="4"
          ></textarea>
        </div>
      </div>

      <!-- CAPTURA -->
      <div class="w-full flex justify-around">
        <div class="flex justify-between w-full items-center">          
          <button class="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="TakeCapture">
            <i class="fa fa-camera mr-1"></i>
            Tomar captura
          </button>
          
          <div v-if="!src" class="rounded-lg overflow-hidden w-6/12  cursor-pointer">
              <div class="flex cursor-pointer">
                  <div class="relative border-dotted h-20 rounded-lg border-dashed border-2 border-yellow-700 bg-gray-200 flex justify-center items-center  cursor-pointer">
                      <div class="absolute cursor-pointer">
                        <div class="flex flex-col items-center cursor-pointer"> 
                          <i class="fa fa-image text-yellow-700 cursor-pointer"></i> 
                          <span class="block text-yellow-700 font-bold cursor-pointer">Adjuntar imagen</span> 
                        </div>
                      </div> 
                      <input type="file" accept="image/png, image/jpeg" class="h-full w-full opacity-0 cursor-pointer" name="" @change="HandleFileInput">
                  </div>
              </div>
          </div>
        </div>
        
        <div v-if="src" class="flex w-full justify-around items-center">
          <button class="h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full" @click="RemoveImage">
              <i  class="fa fa-trash text-white-700"></i> 
          </button>
          <ModalImg :src="src"/>
        </div>
        
      </div>

      <!-- SUBMIT -->
      <div class="w-full flex justify-center">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mt-12" type="submit" @click="Submit" >
          <i class="fa fa-arrow-alt-circle-up mr-1"></i>
          Crear ticket
        </button>
      </div>

    </form>
  </div>
</template>
<script>
import ModalImg from "./ModalImg.vue";

const { ipcRenderer, desktopCapturer } = require("electron");

export default {
  name: "MainContent",
  data() {
    return {
      src: "",
      subject: "",
      description: "",
    };
  },
  props : {
    ip : String
  },
  components: {
    ModalImg,
  },
  methods: {
    TakeCapture: function (e) {
      e.preventDefault();

      const thumbnailSize = ipcRenderer.sendSync("getThumbnailSize");

      ipcRenderer.send("hide");

      this.ImpPnt(thumbnailSize);
    },
    ImpPnt: function (thumbnailSize) {
      setTimeout(() => {
        desktopCapturer
          .getSources({ types: ["screen"], thumbnailSize: thumbnailSize })
          .then((sources) => {
            this.src = sources[0].thumbnail.toDataURL();
            ipcRenderer.send("show");
          })
          .catch(() => {
            ipcRenderer.send("show");
          });
      }, 100);
    },
    Submit: async function (e) {
      e.preventDefault();
      
      let arrBase64 = this.src.split(',')
      let TicketDescription 
      let res ;
      let confiSettingUrl = 'http://localhost:8080/serialapi/stationConfiguration';
      await fetch(confiSettingUrl, {method: "GET"}).then(res => {return res.json()}).then( data =>{
        TicketDescription = `TOTEM CONFIG: \n`;
        TicketDescription += `Hostname : ${data.hostname} \n`
        TicketDescription += `Proceso : ${data.process} \n` 
      }).catch(err => console.log(err));

      TicketDescription += `\n`; //Salto de Linea 

      TicketDescription += `VNC : ${this.ip} \n`;
      
      TicketDescription += `\n`; //Salto de Linea

      TicketDescription += `DESCRIPCION : \n`; //Salto de Linea
      TicketDescription += this.description;   

      const Ticket = {
        Ticket: {
          Title: "Sucursal 129 Totem Digital",
          Type: "Incident",
          Queue: "Junk",
          State: "open",
          Priority: "3 normal",
          CustomerUser: "dvilla",
        },
        Article: {
          Subject: this.subject,
          Body: TicketDescription,
          ContentType: "text/plain; charset=utf8",
        },
        Attachment: {
          ContentType: "image/png",
          Filename: "captura.png",
          Content: arrBase64[1].toString(),
        },
      };

      let TickeUrl = "http://slnxotrs01/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorREST/Ticket?UserLogin=dfimiani&Password=123456";
      res = await fetch(TickeUrl, {
        method: "POST",
        body: JSON.stringify(Ticket),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })

      if (res.status >= 200 && res.status < 300) {
        ipcRenderer.send('notifyticketsuccess');
        ipcRenderer.send('hide');
        this.src = "";
        this.subject = "";
        this.description = "";
      }
    },
    HandleFileInput: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => this.src = reader.result; 
    },
    RemoveImage: function(e) {
      e.preventDefault();
      this.src = '';
    },
    ClearForm: function(e) {
      e.preventDefault()
      this.src = '';
      this.subject = '';
      this.description = '';
    }
  },
};
</script>