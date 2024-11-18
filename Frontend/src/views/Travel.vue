<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="carousel-item">
      <router-link 
        :to="{
          path: '/detail',
          query: {
            name: item.title,
            province: item.province,
            eventType: item.eventType,
            tel: item.tel,
            website: item.website,
            detail: item.description,
            imageUrl: item.image,
          }
        }"
        class="relative flex flex-2 my-2 mx-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
      >
        <div class="relative h-fit w-full m-2.5 overflow-hidden text-white rounded-md">
          <img :src="item.image" class="h-full w-full" alt="House image" />
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h6 class="text-slate-800 text-xl font-semibold">
              {{ item.title }}
            </h6>
            <p class="text-slate-600 leading-normal font-light">
              {{ item.province }}
            </p>
          </div>
          <p class="text-slate-600 leading-normal font-light">
            {{ item.description }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/OtDJToG8-image14-1024x683.jpg?tr=dpr-2,w-675",
    title: "สวนแม่ฟ้าหลวง",
    province: "เชียงราย",
    eventType: "Exhibition",
    tel: "0848795468",
    website: "https://maps.app.goo.gl/MDidoNMKDXTJE1hY8",
    description: "เป็นแหล่งท่องเที่ยวสำคัญแห่งหนึ่งของเชียงรายที่ใครไปก็ต้องหาโอกาสแวะเช็กอินกันสักครั้ง ",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/O2yRcsQJ-image3-1024x683.jpg?tr=dpr-2,w-675",
    title: "สิงห์ ปาร์ค",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0879546215",
    website: "https://maps.app.goo.gl/tPFAnLBCLRpXj7mF9",
    description: "พิกัดที่เที่ยวเชียงรายธรรมชาติเดินทางง่ายในตัวเมืองเชียงรายที่ไม่ควรมองข้าม สำหรับคนอยากเที่ยวฟีลธรรมชาติ",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/QRQa3zPI-image27-1024x683.jpg?tr=dpr-2,w-675",
    title: "ไร่ชาฉุยฟง",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0974568523",
    website: "https://maps.app.goo.gl/D7Yv3pMLEyRBDbxJA",
    description: "ที่เที่ยวเชียงรายที่เป็นไร่ชาขึ้นชื่อขนาดใหญ่ของเมืองเชียงราย ที่มีสองบรรยากาศให้ได้สัมผัสกัน อยากได้ฟีลไร่ชาแบบออริจินัลสุดจะเป็นธรรมชาติก็ต้องปักหมุดไปที่อำเภอแม่ฟ้าหลวง",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/djEowe9u-image4-1024x768.jpg?tr=dpr-2,w-675",
    title: "สามเหลี่ยมทองคำ",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0874596512",
    website: "https://maps.app.goo.gl/QcJmHaymiNxAracTA",
    description: "เปลี่ยนจากภูเขาสูง ๆ เขียว ๆ มาพักสายตากับวิวแม่น้ำโขงกว้าง ๆ กันบ้างดีกว่า กับจุดตัดที่ 3 ประเทศอย่างไทย ลาว เมียนมาร์",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/Z9VXWMzc-image19-1024x684.jpg?tr=dpr-2,w-675",
    title: "ล่องเรือชมแม่น้ำโขง",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0954568521",
    website: "https://maps.app.goo.gl/eaFTQrsLrogkQtCG8",
    description: "ในช่วงเวลาปกติ แม่น้ำโขงคือหนึ่งในเส้นทางที่จะมุ่งหน้าไปเยือนประเทศเพื่อนบ้านอย่าง สปป. ลาว แต่ในช่วงเวลาที่พรมแดนปิดแบบนี้",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/image21-1024x667.jpg?tr=dpr-2,w-675",
    title: "ภูชี้ฟ้า",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0856548521",
    website: "https://maps.app.goo.gl/65vKP7XqpLvLXGQi9",
    description: "อีกหนึ่งที่เที่ยวเชียงรายซิกเนเจอร์ยอดนิยมโดยเฉพาะในช่วงฤดูหนาว ภูชี้ฟ้านั้นเป็นพิกัดยอดนิยมที่เหล่าคนรักธรรมชาติมักไปปักหมุดเพื่อดูทะเลหมอกในยามเช้ากัน จริง ๆ",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/jDMqw4Ed-image11-1024x683.jpg?tr=dpr-2,w-675",
    title: "ดอยผาฮี้",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0654952655",
    website: "https://maps.app.goo.gl/bnaD9JfSXbYn4JDn7",
    description: "เชื่อว่าคนรักกาแฟต้องคุ้นหูกับชื่อนี้เป็นอย่างดีอยู่แล้วแน่ ๆ ดอยผาฮี้นั้นนอกจากจะเป็นแหล่งปลูกกาแฟชื่อดังของเมืองเชียงรายแล้ว",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/image16-1024x545.jpg?tr=dpr-2,w-675",
    title: "ภูชี้ดาว",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0624859521",
    website: "https://maps.app.goo.gl/k3mbL3pfDs7KbYGk6",
    description: "ภูชี้ดาวนับเป็นหนึ่งในบรรดาแฝดสามของจุดชมทะเลหมอกเด่น ๆ ในเมืองเชียงราย นั่นคือภูชี้ฟ้า, ภูชี้ดาว และภูชี้เดือน ซึ่งทั้งหมดนั้นอยู่ในเส้นทางไม่ไกลกัน",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/bmxIMAc3-image17-1024x683.jpg?tr=dpr-2,w-675",
    title: "ดอยแม่สลอง",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0845625715",
    website: "https://maps.app.goo.gl/oMAi576RxJknedtK6",
    description: "เป็นดอยสูง 1,200 เมตร ซึ่งเป็นพิกัดของชุมชนชาวจีนฮ่อที่อพยพมาจากประเทศจีนในช่วงที่มีการเปลี่ยนแปลงการปกครองครั้งใหญ่",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/04/image25-1024x565.jpg?tr=dpr-2,w-675",
    title: "ดอยผาตั้ง",
    province: "เชียงราย",
    eventType: "Location",
    tel: "0856321459",
    website: "https://maps.app.goo.gl/qm3fHwMCSHK2w4mh9",
    description: "อีกพิกัดที่เที่ยวเชียงรายสำหรับสายธรรมชาติที่อยากสัมผัสสีเขียวของภูเขา และอากาศสบาย ๆ แบบไม่ต้องทรมานร่างกายมากนัก",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2020/01/24/605e44c0-3ea8-11ea-9fb3-63900178746e_original.JPG",
    title: "วัดพระแก้ว ",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0954785611",
    website: "https://maps.app.goo.gl/fFHEU2CVnK6J7AWf7",
    description: "พระพุทธรูปคู่บ้านคู่เมืองของไทยเพื่อเป็นสิริมงคลค่ะ นอกจากนี้ ที่นี่ยังเป็นวัดหลวงที่สำคัญในพระราชพิธีต่างๆ ",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/6a4fedc0-782c-11ec-8fd5-c549a9b471b9_webp_original.jpg",
    title: "วัดอรุณราชวราราม",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0652485899",
    website: "https://maps.app.goo.gl/jiiTBrp5FqMDnScq8",
    description: " วัดอรุณราชวรารามราชวรมหาวิหาร หรือ วัดแจ้ง เป็นวัดโบราณสร้างในสมัยอยุธยา พระปรางค์วัดอรุณฯ นับเป็นหนึ่งในสัญลักษณ์ของกรุงเทพฯ ที่รู้จักกันทั่วโลก",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/30d3d650-7832-11ec-9ff2-9bcf383061a5_webp_original.jpg",
    title: "วัดโพธิ์ ท่าเตียน",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0854745665",
    website: "https://maps.app.goo.gl/LgyJ5UdhM4AXffHq7",
    description: "วัดพระเชตุพนวิมลมังคลาราม ราชวรมหาวิหาร หรือ วัดโพธิ์ ท่าเตียน เป็นวัดประจำรัชกาลในรัชกาลที่ 1 และเปรียบเสมือนเป็นมหาวิทยาลัยแห่งแรกของประเทศไทย",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/c8af91d0-7832-11ec-9ff2-9bcf383061a5_webp_original.jpg",
    title: "วัดเบญจมบพิตรดุสิตวนาราม",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0877542648",
    website: "https://maps.app.goo.gl/7EgkgwaUBpZopSuN8",
    description: "วัดเบญจมบพิตรดุสิตวนาราม “วัดของพระเจ้าแผ่นดินรัชกาลที่ 5” ถือเป็นสถาปัตยกรรมที่สมบูรณ์แบบของศิลปะไทย",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/13f04a30-7834-11ec-8fd5-c549a9b471b9_webp_original.jpg",
    title: "ภูเขาทอง วัดสระเกศ",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0548757966",
    website: "https://maps.app.goo.gl/GuqFUDi8oWzYhTzS8",
    description: "วัดสระเกศ ราชวรมหาวิหาร เป็นวัดโบราณในสมัยกรุงศรีอยุธยาค่ะ และได้รับการบูรณะในสมัยรัชกาลที่ 1 ภายในวัดยังเป็นที่ตั้งของ",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2021/12/30/1be83b60-694f-11ec-8b76-cfe2200cdf06_webp_original.jpg",
    title: "วัดเล่งเน่ยยี่ เยาวราช",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0874596255",
    website: "https://maps.app.goo.gl/cBBbfGVUNXEZ5cHfA",
    description: "วัดมังกรกมลาวาส หรือ วัดเล่งเน่ยยี่ เยาวราช เป็นวัดจีนในกรุงเทพฯ ที่สวยงาม มีลักษณะสถาปัตยกรรมเป็นแบบทางจีนตอนใต้ของสกุลช่างแต้จิ๋ว",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/5e80ac10-783a-11ec-8fd5-c549a9b471b9_webp_original.jpg",
    title: "ศาลหลักเมือง",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0657845952",
    website: "https://maps.app.goo.gl/57Pa4h9oEnhwYXjb8",
    description: "ศาลหลักเมืองกรุงเทพมหานคร เป็นศาลที่สร้างขึ้นพร้อมกับการสถาปนากรุงรัตนโกสินทร์เป็นราชธานี ใน สมัยรัชกาลที่ 1 ปี พ.ศ. 2325",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/62f86f30-7853-11ec-a752-3f0518e30bf6_webp_original.jpg",
    title: "ICONSIAM",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "123-456-7890",
    website: "https://maps.app.goo.gl/1pMiau9xBDNL5Uk49",
    description: "ที่เที่ยวกรุงเทพฯ ริมแม่น้ำเจ้าพระยา ไอคอนสยาม อภิมหาโครงการเมือง ที่ตอบโจทย์ทุกไลฟ์สไตล์ที่นำเสนอในรูปแบบของความวิจิตรล้ำสมัย",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/bebc47a0-7836-11ec-8fd5-c549a9b471b9_webp_original.jpg",
    title: "King Power Mahanakhon",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0856475952",
    website: "https://maps.app.goo.gl/Lc2ryTCvcuofnLtW8",
    description: "เตรียมชุดสวยๆ พร้อมสะพายกล้องถ่ายรูป ของทุกคนกันให้พร้อม! ชิลชมวิวดาดฟ้ากรุงเทพฯ ที่ มหานคร สกายวอล์ค (Mahanakhon Skywalk) บนชั้น 78",
  },
  {
    image: "https://cms.dmpcdn.com/travel/2022/01/18/a39ef530-783b-11ec-9ff2-9bcf383061a5_webp_original.jpg",
    title: "Harajuku Thailand",
    province: "กรุงเทพมหานคร",
    eventType: "Location",
    tel: "0845962751",
    website: "https://maps.app.goo.gl/VuTTkK82XPrp93Rd9",
    description: "ใครที่โหยหาการไป เที่ยวญี่ปุ่น ตามมาเช็คอินกันได้ที่ ฮาราจูกุ ไทยแลนด์ Harajuku Thailand ที่เที่ยวกรุงเทพฯ ย่านสุวินทวงศ์",
  },

]);
</script>
