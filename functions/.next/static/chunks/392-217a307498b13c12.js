"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[392],{55371:function(e,t,i){i.d(t,{Z:function(){return K}});var l=i(57437),s=i(2265),a=i(51438),n=i(98809),r=i(71796),o=i(29172),c=e=>{let{title:t,subtitle:i,level:s,content:c}=e,d=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(s);return(0,l.jsxs)(r.E.section,{className:"mb-12 w-full max-w-6xl px-4",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[t&&(0,l.jsxs)("div",{className:"flex items-center mb-2 text-center",children:[(0,l.jsx)(o.DAO,{className:"text-primary mr-2 text-center"}),(0,l.jsx)(d,{className:"text-".concat(1===s?"4xl":2===s?"3xl":"2xl"," font-bold text-primary text-center"),children:t})]}),i&&(0,l.jsx)("h3",{className:"text-2xl font-semibold mb-4 text-secondary text-center",children:i}),(0,l.jsx)("div",{className:"prose dark:prose-dark max-w-none",children:(0,l.jsx)(a.U,{remarkPlugins:[n.Z],className:"text-lg leading-relaxed text-gray-700 dark:text-gray-300",children:c})})]})},d=i(32555),m=i(59291),x=i(61396),u=i.n(x),h=e=>{let{title:t,subtitle:i,level:s,content:c,backgroundImage:x,ctaText:h,ctaLink:p}=e,b=(e=>{switch(e){case 1:default:return"h1";case 2:return"h2";case 3:return"h3"}})(s),{scrollY:y}=(0,d.M)(),v=(0,m.H)(y,[0,300],[0,-50]),w={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}};return(0,l.jsxs)(r.E.section,{className:"relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden",initial:"hidden",animate:"visible",transition:{duration:1},children:[(0,l.jsxs)(r.E.div,{className:"absolute inset-0",style:{y:v},children:[(0,l.jsx)("img",{src:x,alt:"Hero Background",className:"w-full h-full object-cover",loading:"lazy"}),(0,l.jsx)("div",{className:"absolute inset-0 bg-black opacity-50"})]}),(0,l.jsxs)("div",{className:"relative z-10 px-4",children:[t&&(0,l.jsx)(r.E.div,{className:"flex items-center justify-center mb-4",variants:{hidden:{opacity:0,y:50},visible:{opacity:1,y:0}},initial:"hidden",animate:"visible",transition:{duration:1,delay:.2},children:(0,l.jsx)(b,{className:"text-glow ".concat(1===s?"text-6xl":2===s?"text-5xl":"text-4xl"," font-bold text-gray-200"),children:t})}),i&&(0,l.jsx)(r.E.h2,{className:"text-gray-300 text-2xl md:text-3xl font-semibold mb-6",variants:w,initial:"hidden",animate:"visible",transition:{duration:1,delay:.4},children:i}),c&&(0,l.jsx)(r.E.div,{className:"prose dark:prose-dark max-w-none mb-8",variants:w,initial:"hidden",animate:"visible",transition:{duration:1,delay:.6},children:(0,l.jsx)(a.U,{remarkPlugins:[n.Z],className:"text-gray-100 text-lg leading-relaxed",children:c})}),h&&p&&(0,l.jsx)(r.E.div,{variants:w,initial:"hidden",animate:"visible",transition:{duration:1,delay:.8},children:(0,l.jsx)(u(),{href:p,children:(0,l.jsxs)("a",{className:"inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300",children:[h,(0,l.jsx)(o.Z1Y,{className:"ml-2"})]})})})]})]})},p=e=>{let{title:t,subtitle:i,level:s,content:o,photo:c,imageLeft:d=!0}=e,m=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(s);return(0,l.jsxs)(r.E.section,{className:"mb-12 flex flex-col md:flex-row items-center w-full max-w-6xl px-4",initial:{opacity:0,scale:.95},whileInView:{opacity:1,scale:1},viewport:{once:!0},transition:{duration:.6},children:[c&&d&&(0,l.jsx)("div",{className:"relative w-full md:w-1/2 h-80 mb-6 md:mb-0 md:mr-6",children:(0,l.jsx)("img",{src:c,alt:t,style:{maxHeight:"400px",maxWidth:"500px"},className:"object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"})}),(0,l.jsxs)("div",{className:"w-full md:w-1/2",children:[t&&(0,l.jsx)("div",{className:"flex items-center mb-2",children:(0,l.jsx)(m,{className:"text-".concat(1===s?"4xl":2===s?"3xl":"2xl"," font-bold text-primary"),children:t})}),i&&(0,l.jsx)("h3",{className:"text-lg font-semibold mb-4 text-secondary",children:i}),(0,l.jsx)("div",{className:"prose dark:prose-dark max-w-none",children:(0,l.jsx)(a.U,{remarkPlugins:[n.Z],className:"text-sm leading-relaxed text-gray-700 dark:text-gray-300",children:o})})]}),c&&!d&&(0,l.jsx)("div",{className:"relative w-full md:w-1/2 h-80 mt-6 md:mt-0 md:ml-6",children:(0,l.jsx)("img",{src:c,alt:t,style:{maxHeight:"400px",maxWidth:"500px"},className:"object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"})})]})},b=e=>{let{title:t,subtitle:i,level:a,videoUrl:n}=e,o=(0,s.useRef)(null),c=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(a),d=(e=>{let t=e.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/),i=e.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/),l=t?t[1]:i?i[1]:null;return l?"https://www.youtube.com/embed/".concat(l):e})(n);return(0,s.useEffect)(()=>{let e=new IntersectionObserver(e=>{let t=o.current;t&&e.forEach(e=>{var i,l;e.isIntersecting?null===(i=t.contentWindow)||void 0===i||i.postMessage('{"event":"command","func":"playVideo","args":""}',"*"):null===(l=t.contentWindow)||void 0===l||l.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")})},{threshold:.7});return o.current&&e.observe(o.current),()=>{o.current&&e.unobserve(o.current)}},[]),(0,l.jsxs)(r.E.section,{className:"mb-12 w-full max-w-6xl px-4",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[t&&(0,l.jsx)(c,{className:"text-".concat(1===a?"4xl":2===a?"3xl":"2xl"," font-bold mb-2 text-primary"),children:t}),i&&(0,l.jsx)("h3",{className:"text-lg font-semibold mb-6 text-secondary",children:i}),(0,l.jsx)("div",{className:"relative",style:{paddingTop:"56.25%"},children:(0,l.jsx)(r.E.iframe,{ref:o,src:d,title:t,className:"absolute top-0 left-0 w-full h-full rounded-lg shadow-lg",allowFullScreen:!0,initial:{scale:.95},whileHover:{scale:1},transition:{duration:.3}})})]})},y=e=>{let{title:t,subtitle:i,level:s,headers:a,rows:n}=e,c=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(s);return(0,l.jsxs)(r.E.section,{className:"mb-12 w-full max-w-6xl px-4",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[t&&(0,l.jsxs)("div",{className:"flex items-center mb-2",children:[(0,l.jsx)(o.WHV,{className:"text-primary mr-2"}),(0,l.jsx)(c,{className:"text-".concat(1===s?"4xl":2===s?"3xl":"2xl"," font-bold mb-2 text-primary"),children:t})]}),i&&(0,l.jsx)("h3",{className:"text-base font-semibold mb-6 text-secondary",children:i}),(0,l.jsx)("div",{className:"overflow-x-auto",children:(0,l.jsxs)("table",{className:"min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md",children:[(0,l.jsx)("thead",{children:(0,l.jsx)("tr",{children:a.map((e,t)=>(0,l.jsx)("th",{className:"py-3 px-6 bg-primary text-left text-sm font-semibold text-white uppercase",children:e},t))})}),(0,l.jsx)("tbody",{children:n.map((e,t)=>(0,l.jsx)("tr",{className:"border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200",children:e.map((e,t)=>(0,l.jsx)("td",{className:"py-4 px-6 text-sm text-gray-700 dark:text-gray-300",children:e},t))},t))})]})})]})},v=e=>{let{title:t,subtitle:i,level:s,newsItems:a,sectionHeight:n="h-auto"}=e,o=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(s);return(0,l.jsxs)(r.E.section,{className:"mb-12 w-full max-w-6xl px-4 ".concat(n),initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[t&&(0,l.jsx)(o,{className:"text-".concat(1===s?"4xl":2===s?"3xl":"2xl"," font-bold mb-2 text-primary underline"),children:t}),i&&(0,l.jsx)("h3",{className:"text-lg font-semibold mb-6 text-secondary",children:i}),(0,l.jsx)("div",{className:"space-y-6",children:a.map((e,t)=>(0,l.jsxs)(r.E.div,{className:"w-full",initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.3,delay:.1*t},children:[(0,l.jsx)("h4",{className:"text-lg font-semibold mb-2 text-secondary",children:e.title}),(0,l.jsx)("iframe",{src:e.url,title:"News Article ".concat(t+1),className:"w-full h-64 border rounded-badge",sandbox:"allow-same-origin allow-scripts allow-popups allow-forms"})]},t))})]})},w=i(45253),g=i(3952),f=i(16573),j=i(24235),N=i(50039),E=i(86812),k=i(79857),I=i(19223),A=e=>{let{title:t,subtitle:i,level:s,data:a,notation:n}=e,c=(e=>{switch(e){case 1:default:return"h2";case 2:return"h3";case 3:return"h4"}})(s);return(0,l.jsxs)(r.E.section,{className:"mb-12 w-full max-w-6xl px-4",initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},children:[t&&(0,l.jsxs)("div",{className:"flex items-center mb-2",children:[(0,l.jsx)(o.Op,{className:"text-primary mr-2"}),(0,l.jsx)(c,{className:"text-".concat(1===s?"4xl":2===s?"3xl":"2xl"," font-bold text-primary"),children:t})]}),i&&(0,l.jsx)("h3",{className:"text-base font-semibold mb-6 text-secondary",children:i}),(0,l.jsx)(w.h,{width:"100%",height:400,children:(0,l.jsxs)(g.w,{data:a,children:[(0,l.jsx)(f.q,{strokeDasharray:"3 3"}),(0,l.jsx)(j.K,{dataKey:"name"}),(0,l.jsx)(N.B,{}),(0,l.jsx)(E.u,{}),(0,l.jsx)(k.D,{formatter:()=>n}),(0,l.jsx)(I.x,{type:"monotone",dataKey:"score",stroke:"#8884d8",activeDot:{r:8}})]})})]})},L=()=>(0,l.jsxs)(r.E.div,{className:"flex items-center my-8 w-full max-w-6xl px-4",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.6},children:[(0,l.jsx)("hr",{className:"flex-grow border-t-2 border-gray-300 dark:border-gray-700"}),(0,l.jsx)(o.NWQ,{className:"mx-4 text-gray-500 dark:text-gray-400 animate-bounce"}),(0,l.jsx)("hr",{className:"flex-grow border-t-2 border-gray-300 dark:border-gray-700"})]}),K=e=>{let{section:t}=e;switch(t.type){case"text":return(0,l.jsx)(c,{title:t.title,subtitle:t.subtitle,level:t.level,content:t.content||""});case"hero":return(0,l.jsx)(h,{title:t.title,subtitle:t.subtitle,level:t.level,content:t.content||"",backgroundImage:t.backgroundImage||"",ctaText:t.ctaText||"",ctaLink:t.ctaLink||""});case"combined":return(0,l.jsx)(p,{title:t.title,subtitle:t.subtitle,level:t.level,content:t.content||"",photo:t.photos?t.photos[0]:void 0,imageLeft:void 0===t.imageLeft||t.imageLeft});case"video":return(0,l.jsx)(b,{title:t.title,subtitle:t.subtitle,level:t.level,videoUrl:t.videoUrl||""});case"table":return(0,l.jsx)(y,{title:t.title,subtitle:t.subtitle,level:t.level,headers:t.headers||[],rows:t.rows||[]});case"news":return(0,l.jsx)(v,{title:t.title,subtitle:t.subtitle,level:t.level,newsItems:t.newsItems||[]});case"chart":return(0,l.jsx)(A,{title:t.title,subtitle:t.subtitle,level:t.level,data:t.data||[],notation:t.notation||""});case"divider":return(0,l.jsx)(L,{});default:return null}}},22392:function(e,t,i){i.r(t),i.d(t,{default:function(){return o}});var l=i(57437);i(2265);var s=i(55371),a=[{type:"hero",title:"KNK",subtitle:"초기 활동 및 성장",level:1,content:"",backgroundImage:"https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2017/10/11/cINmMOiDiW3E636433128356676691.jpg"},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-1. 2016년 - 데뷔",subtitle:"강력한 사전 프로모션",level:2,content:"- **강력한 사전 프로모션**\n      - 2016년 데뷔 당시, 빌보드에서 ‘유망주’로 소개될 정도로 큰 기대를 모으며 상당히 주목받았다. [빌보드 기사1](https://www.billboard.com/music/music-news/best-k-pop-debuts-2016-7625235/amp) [빌보드 기사2](https://www.billboard.com/music/music-news/k-pop-debuts-2016-best-so-far-7430879/amp)\n      - 193cm의 박서함을 중심으로, 큰 신장을 통해 인지도를 확보하려는 모습이 돋보이며 데뷔 전부터 타 아티스트의 뮤직비디오, 드라마 출연 등 팬층 형성에 큰 노력을 기울인다.",photos:["https://i.ytimg.com/vi/vlIAAe4-wak/maxresdefault.jpg"],imageLeft:!0},{type:"news",title:"",subtitle:"",level:3,newsItems:[{title:"크나큰, 美 빌보드 선정 '2016년 K팝 신인그룹 TOP10'",url:"https://pickcon.co.kr/site/data/html_dir/2016/12/22/2016122201677.html"}]},{type:"text",title:"무리한 로드맵",subtitle:"",level:3,content:"- **무리한 로드맵**\n      - 데뷔 8개월 만에 EP 3개(총 19곡)를 발매하는 로드맵은 업계 평균과 유사하나 상당히 짧은 기간으로 판단된다. 이는, 사전 프로모션에 사용된 비용을 빠르게 충당하고자 하는 전략으로 해석된다. 결과론적으로, 완성도와 팬덤 확보에 어려움을 겪은 것으로 보인다.",photos:["/images/past3.jpg"],imageLeft:!1},{type:"table",title:"음반 발매 빈도 비교",subtitle:"크나큰 vs 비스트 vs 동방신기 vs 엑소 vs 에이티즈",level:3,headers:["크나큰","비스트","동방신기","엑소","에이티즈"],rows:[["8개월","11개월","9개월","1년 4개월","8개월"],["19곡","18곡","16곡","23곡","18곡"],["EP, 싱글, EP, EP","EP, EP, 싱글, 싱글, EP","싱글, 싱글, 정규","EP, 정규, 리팩","EP, EP, EP"]]},{type:"chart",title:"연도별 앨범 발매 횟수",subtitle:"",level:3,data:[{name:"2016",score:3},{name:"2017",score:2},{name:"2018",score:1},{name:"2019",score:2},{name:"2020",score:1}],notation:"Albums"},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"레퍼런스 아티스트와의 유사성",subtitle:"",level:2,content:"- **레퍼런스 아티스트와의 유사성**\n      - 비스트와 동방신기의 음악적, 비주얼적 유사성이 과도하게 드러났다는 점이 지적된다. 데뷔 당시부터 비스트의 작곡가와 함께 작업하며 비스트의 음악적 스타일을 차용한 부분이 두드러졌고, 기존 비스트 팬덤 또한 부정적인 반응을 확인할 수 있다. 이러한 대중의 반응은 기존 팬덤의 반감과 유입된 신규 팬층에게 보수적인 반응을 야기할 수 있다는 점에서 부정적으로 해석된다.",photos:["https://i.namu.wiki/i/8Rvyye_7cg_u6zNOEoZvo4LxMkU5BXdmcqo3uwoD17-xTi00jDo3c3GALlSC3HhG5Vz54E5FyergVAdzvlKaGQ.webp"],imageLeft:!0},{type:"combined",title:"성과를 보인 전략",subtitle:"",level:2,content:"- **성과를 보인 전략**\n      - 그럼에도 불구하고, ‘크나큰’이 현재까지 발매했던 앨범 중 가장 팬덤 참여도가 높았던 앨범은 <AWAKE>이다.\n      - 위의 언급한 프로모션과 로드맵 그리고 멤버들의 큰 키를 활용한 수트핏의 이미지 전략을 통해 팬덤 확보에 어느 정도 성공했다고 볼 수 있다.",photos:["https://i.ytimg.com/vi/uGArVVM1zVM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAcYIfRkCz2oiZINmUFy2w5fI9CTQ"],imageLeft:!1},{type:"chart",title:"앨범 상호작용 점수",subtitle:"크나큰 앨범 상호작용 점수",level:3,data:[{name:"KNOCK",score:67.84},{name:"요즘 넌 어때",score:46.81},{name:"AWAKE",score:97.05},{name:"REMAIN",score:71.77},{name:"GRAVITY",score:52.05},{name:"GRAVITY, Completed",score:63.2},{name:"한 끗 차이",score:31.81},{name:"LONELY NIGHT",score:51.02},{name:"KNK S/S COLLECTION",score:56.6},{name:"KNK AIRLINE",score:53.26}],notation:"Interaction Score"},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-2. 2017년 - 스퍼트",subtitle:"",level:2,content:"",photos:["https://i.namu.wiki/i/6Ve-5dV1SQzi7fYakfB0UtMpviEsyT4cfHbQ4ebQYhSmaBoV9oVSjHrwDYQZFKtLKn_EYHwyFQjNfRS-7Ti3EQ.webp"],imageLeft:!0},{type:"combined",title:"여전한 레퍼런스와의 유사성",subtitle:"",level:3,content:"- **여전한 레퍼런스와의 유사성**\n      - 2017년 활동은 이전보다 더욱 비스트의 음악과 유사해지는 경향을 보였다. 다만, 뮤직비디오 연출 면에서는 다양한 로케이션과 현대적인 감각을 더하였고, 이로 인해 <해, 달, 별> 뮤직비디오는 완성도 있는 작품으로 평가받고 있다.",photos:["https://i.makeagif.com/media/10-28-2024/Y2dSar.gif"],imageLeft:!1},{type:"video",title:"",subtitle:"크나큰 (KNK) - 해, 달, 별 (Sun, Moon, Star) MV",level:3,videoUrl:"https://youtu.be/VtqT-rRQj2A"},{type:"combined",title:"믹스나인",subtitle:"",level:3,content:"- **믹스나인**\n      - 서바이벌 프로그램 *믹스나인* 출연을 통해 대중에게 인지도를 높이려는 시도를 하였고, 해당 프로그램을 통해 유입된 팬층도 확인할 수 있다. 다만, 프로그램 내부적 문제와 멤버들의 아쉬운 탈락으로 기대만큼 큰 성과를 얻지는 못했다.",photos:["https://pbs.twimg.com/media/DSXQW8gX4AAncey.jpg"],imageLeft:!0},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-3. 2018년 - 시련의 시기",subtitle:"",level:2,content:"",photos:["https://i.namu.wiki/i/qEHBIDetUxBBr2bVrWAVgtV00ZB9KDJQR472jR_XP-zjWJCG5dlnyCP3Qos0eiG_zQ460YqSUGFFypuyVMD7qQ.webp"],imageLeft:!1},{type:"text",title:"활동 종료",subtitle:"",level:3,content:"- **활동 종료**\n      - <Gravity, Completed> 활동 이후 하락세를 겪었고, 메인보컬 김유진의 탈퇴는 더욱 어려운 상황을 초래했다. 또한, 소속사 YNB엔터테인먼트가 폐업 절차를 밟으며 사실상 활동이 종료되었다.\n      - YNB엔터테인먼트의 폐업 이후, 한대진 이사가 새롭게 설립한 220엔터테인먼트와 함께하게 되었다.",photos:["/images/past10.jpg"],imageLeft:!0},{type:"news",title:"",subtitle:"",level:3,newsItems:[{title:'그룹 크나큰, 소속사와 전속 해지…"김유진은 탈퇴"',url:"https://www.yna.co.kr/view/AKR20180910044100005"}]},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-4. 2019년 - 패기로운 재도약",subtitle:"",level:2,content:"",photos:["/images/past11.jpg"],imageLeft:!1},{type:"combined",title:"발전된 기획력",subtitle:"",level:3,content:"- **발전된 기획력**\n      - 이동원의 영입과 함께 과거보다 나아진 기획력을 바탕으로 <LONELY NIGHT>과 <KNK S/S COLLECTION>을 발매하며 진보된 음악적 스타일로 다양성을 추구하였다. 특히, 기존에 함께했던 작곡가에서 벗어나 동시대 아티스트인 SF9과 워너원을 레퍼런스로 기획된 점이 인상적이며, 이는 새로운 방향성을 찾는 데에 성공한 것으로 판단된다.",photos:["/images/past12.jpg"],imageLeft:!0},{type:"combined",title:"해외 팬덤 활용",subtitle:"",level:3,content:"- **해외 팬덤 활용**\n      - 기존에 확보한 해외 팬덤을 통해 아시아, 북미, 유럽 투어를 통해 두터운 글로벌 팬층을 확보하는 데 성공했다. <KNK S/S COLLECTION>은 발매한 앨범 중 스포티파이 인기도 1위를 기록하며 해외 팬덤을 타겟으로 한 기획 및 전략의 효용성을 입증했다고 볼 수 있다.\n      - 다만, 대한민국에서는 2018 ~ 2019년도 사재기 논란으로 앨범의 정량적 가치가 훼손되었다는 부분이 아쉬움을 자아낸다.",photos:["/images/past13.jpg"],imageLeft:!1},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-5. 2020년 - 코로나 팬데믹",subtitle:"",level:2,content:"",photos:["/images/past14.jpg"],imageLeft:!0},{type:"combined",title:"인상적인 완성도",subtitle:"",level:3,content:"- **인상적인 완성도**\n      - 스케일 확장과 포멀한 파일럿 제복을 활용한 <KNK AIRLINE>은 초동 커리어하이를 달성하며 음악적 완성도와 비주얼 측면에서 성장한 모습을 보였다. 특히, 타이틀 곡인 <RIDE>는 <KNOCK>, <BACK AGAIN>을 이어 누적 조회수 3위를 기록했다. 앞서 언급한 2곡에 투입한 사전 프로모션 비용을 생각하면 <RIDE>는 성공적인 성과를 거두었다고 볼 수 있다.",photos:["/images/past15.jpg"],imageLeft:!1},{type:"combined",title:"악재 중 악재",subtitle:"",level:3,content:"- **악재 중 악재**\n      - 2020년은 전 세계적으로 코로나 팬데믹의 영향을 받으면서 크나큰 역시 활동에 커다란 제약을 받았다. 온라인 팬콘서트 ‘바닐라 스테이지’, ‘온라인 라이브’ 등을 개최하였으나 실질적인 영리 활동인 오프라인 콘서트나 팬미팅 등에서 제약을 받게 되었다. 따라서 2019년, 2020년에 발매한 앨범을 통해 유의미한 수익 회수를 할 수 없게 되었고 추후 활동이 불가능한 수준으로 치닫게 되었다.",photos:["/images/past16.jpg"],imageLeft:!0},{type:"divider",title:"",subtitle:"",level:0},{type:"combined",title:"1-6. 결론",subtitle:"",level:2,content:"- **결론**\n      - 2016년 데뷔 이후 꾸준한 전략적 시도를 통해 성장해 왔으나, 초기에 무리한 기획과 레퍼런스 아티스트와의 과도한 유사성으로 크나큰만의 독자적인 색깔을 확보하는 데 시간이 필요했다.\n      - 이후 해외 투어를 통한 글로벌 팬덤 확장과 음악적 다양성 추구를 통해 발전하였으나 코로나 팬데믹으로 인해 활동을 이어가지 못했다.",photos:["/images/past17.jpg"],imageLeft:!1},{type:"divider",title:"",subtitle:"",level:0}],n=i(71796),r=()=>(0,l.jsx)(n.E.div,{className:"flex flex-col items-center w-full",initial:{opacity:0},animate:{opacity:1},transition:{duration:1},children:Array.isArray(a)?a.map((e,t)=>(0,l.jsx)(s.Z,{section:e},t)):(0,l.jsx)("p",{className:"text-red-500",children:"과거 섹션 데이터를 불러오는 데 실패했습니다."})}),o=()=>(0,l.jsx)("div",{className:" dark:bg-gray-900 min-h-screen relative",children:(0,l.jsx)(r,{})})}}]);