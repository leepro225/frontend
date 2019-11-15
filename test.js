const _loading = document.querySelector('._4emnV');
const selector = "#app";
const app = document.querySelector(selector);
let appHeight = document.querySelector(selector);
const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                    <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
                    <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                    <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;

const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';
const urlInfo = url + "info";

const module = (async() => {
    
    const timelineInfo = await axios(urlInfo);   
    let page = 1;
    const totalPage = timelineInfo.data.data.totalPage;

    const model = (result) => {
        // 데이터를 요청,가공하는 영역  
        const list = result.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
        
        view(list);
    };
    
    const view = (result) => {
        // html을 그리는 영역
        
        function timeline(result) {
            let html = '';
            result.forEach(data => {
                html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
            })
            
            app.innerHTML += html;
        }
        
        timeline(result);
    };
    
    
    const controller = () => {
        // 그 이외의 영역
        
        const excute = async () => {
            let result = await axios.get(url + page++);
            
            model(result.data);
        };
        
        excute();
        
        const scrollEvent = async () => {

            if(pageYOffset < (appHeight.scrollHeight*0.85)) { 
                return;
            }
            if('' === _loading.style.display) {
                return;
            }
            _loading.style.display = '';
            
            if (page < totalPage) {
                await excute();
                
            }         
            if (page == totalPage) {
                await excute();

                window.removeEventListener('scroll', scrollEvent);
            }
            
            _loading.style.display = 'none';
        }

        window.addEventListener('scroll', scrollEvent);
  
        document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
            tabButton.addEventListener('click', async function(e) {
                
                // 컬러를 변경한다.
                let _9VEo1 = document.getElementsByClassName("_9VEo1");
                
                for (let i = 0; i < _9VEo1.length; i++) {
                    
                    const _class = _9VEo1[i].childNodes[0].classList[0];
                    
                    _class.replace(/blue/gi, 'grey');

                }

                console.log(e);

                // 이전 ajax 요청중인게 있다면 중단한다.
        
                // 이전 ajax response를 지운다.
        
                // app을 비운다.
        
                // page를 1로 초기화 한다
        
                // TODO 버튼 누를 때는 1페이지로 새로 요청을 해야 함
                if('' === _loading.style.display) {
                    return;
                }
                _loading.style.display = '';
                await excute();
                _loading.style.display = 'none';
            });
        });
    };
    
    controller();       

})();





