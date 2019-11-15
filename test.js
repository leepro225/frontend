const _loading = document.querySelector('._4emnV');

const module = (async function() {
    const selector = "#app";
    const app = document.querySelector(selector);
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
    let page = 1;

    const model = async () => {
        try {
            let result = await axios.get(url + page);
            page++;
            return result.data.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
        } catch (e) {
            return {};
        }
    };
    
    const view = (result) => {
        let html = '';
        result.forEach(data => {
            html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
        })
        app.innerHTML += html;
    };
    
    const controller = () => {
        // 그 이외의 영역
        
        const excute = async () => {
            view(await model());
        };
        
        const scrollEvent = async function() {
            if(pageYOffset + document.scrollingElement.offsetHeight < app.scrollHeight * 0.5) { 
                return;
            }
            if('' === _loading.style.display) {
                return;
            }
            _loading.style.display = '';
            
            await excute();

            if(page >= totalPage) {
                window.removeEventListener('scroll', scrollEvent);
            }
            
            _loading.style.display = 'none';
        }

        window.addEventListener('scroll', scrollEvent);

        excute()
    };
    controller();
    
    const timelineInfo = await axios(urlInfo);   
    const totalPage = timelineInfo.data.data.totalPage;
}());

// 모듈 만들어서 쓰고
// 페이지 이동 or 영역 변경 -> 원래 모듈이 갖고있는 상태 or 이벤트를 다 없앤다
// 새 모듈 init
  
document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
    tabButton.addEventListener('click', async function(e) {
        if('' === _loading.style.display) {
            return;
        }
        // 컬러를 변경한다.
        let _9VEo1 = document.getElementsByClassName("_9VEo1");
        
        for (let i = 0; i < _9VEo1.length; i++) {
            const _class = _9VEo1[i].childNodes[0].classList[0];
            _class.replace(/blue/gi, 'grey');
        }

        // 기존 app의 이벤트를 제거한다
        // 기존 app의 메모리를 초기화한다
        // 새 app을 init한다
    });
});