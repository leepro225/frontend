const _loading = document.querySelector('._4emnV');
const selector = "#app";
// FIXME 모듈 내부에서 사용하는 값입니다 - 해당상태 관리하는 주체로 이동하여 캡슐화 해주세요
let page = 1;


const module = (() => {

    // TODO url을 재사용하여 urlInfo을 잘 만드신 것 같습니다 - const로 사용하면 더 좋을 것 같습니다
    let url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';
    let urlInfo = url + "info";
    
    const model =  {
        // 데이터를 요청하는 영역  
        
        getData : async function(url) {
            let result = await axios.get(url);

            return result;
        } 

    };

    const view = (result) => {
        // html을 그리는 영역

        function timeline(result) {
            // TODO selector에 대한 DOM 탐색이 반복적으로 일어나고 있습니다 - 모듈 외부에서 캐싱하여 사용
            const app = document.querySelector(selector);
            let html = '';
            // TODO 템플릿값 대입이 반복적으로 일어나고 있습니다 - 모듈 외부에서 캐싱하여 사용
            const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                            <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
                            <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                            <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                            <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                            <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                            <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                            <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;
            // TODO 데이터 가공 관련로직 - 모델 내부로 위치이동
            const list = result.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
            
            list.forEach(data => {
                html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
            })

            app.innerHTML += html;
        }

        timeline(result);
    };

    // TODO 모델 내부로 이동 해주세요
    // TODO getTotalPage
    // FIXME info 메소드에서 아무런 값도 리턴하고 있지 않습니다 - 프로미스 사용에 익숙치 않으면 async/await 사용해주세요
    const info = () => {
        model.getData(urlInfo).then(function (result) {
            const info = result.data.data.totalPage;

            return info
        });
    };

    const controller = () => {
        // 그 이외의 영역

        // TODO 함수선언은 const 사용
        let excute = () => {
            model.getData(url + page++).then(function (result) {
    
            view(result.data);
            });
        }

        excute();
    };

    controller();

    return {controller : controller, info : info}
})();

// FIXME 모듈 내부에서 관리하는 이벤트입니다 - 해당 이벤트 사용하는 주체로 이동하여 캡슐화 및 remove 가능하도록 로직 추가 해주세요
window.addEventListener('scroll', async function(e) {
    
    // TODO 셀렉터에 대한 돔 탐색이 반복됩니다 - 적절한 위치에 캐싱하여 재사용
    let appHeight = document.querySelector(selector).scrollHeight*0.4;
    
    // FIXME 1페이지에서만 유효하게 작동하는 것 같습니다 - 마지막 로드된 페이지 기준으로 수정해주세요
    if(pageYOffset < appHeight) { 
        return;
    }
    if('' === _loading.style.display) {
        return;
    }
    _loading.style.display = '';

    // FIXME totalPage 값은 최초 한 번만 요청하고, 해당값 캐싱하여 재사용 해주세요
    if (page <= await module.info()) {
        // FIXME module.controller가 현재 비동기로 수행되고 있지 않습니다 - async/await 걸어주세요
        await module.controller();
    }
    _loading.style.display = 'none';
});

// TODO 버튼클릭시 동일 API로 처음부터 다시 시작하도록 해주세요

// document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
//     tabButton.addEventListener('click', async function(e) {
//         let _9VEo1 = document.getElementsByClassName("_9VEo1");
        
//         console.dir(_9VEo1.children);
//     //     _9VEo1.childNodes.classList.remove("glyphsSpritePhoto_list__outline__24__grey_5");

//     //    this.childNodes[0].classList.remove("glyphsSpritePhoto_list__outline__24__blue_5");

//         // TODO 버튼 누를 때는 1페이지로 새로 요청을 해야 함
//         if('' === _loading.style.display) {
//             return;
//         }
//         _loading.style.display = '';
//         // await timeline.render();
//         _loading.style.display = 'none';
//     });
// });



