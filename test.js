const _loading = document.querySelector('._4emnV');
const selector = "#app";
let page = 1;


const module = (() => {

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
            const app = document.querySelector(selector);
            let html = '';
            const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                            <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
                            <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                            <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                            <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                            <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                            <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                            <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;
            const list = result.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
            
            list.forEach(data => {
                html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
            })

            app.innerHTML += html;
        }

        timeline(result);
    };

    const info = () => {
        model.getData(urlInfo).then(function (result) {
            const info = result.data.data.totalPage;

            return info
        });
    };

    const controller = () => {
        // 그 이외의 영역

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


window.addEventListener('scroll', async function(e) {
    
    let appHeight = document.querySelector(selector).scrollHeight*0.4;
    
    // XXX 화면의 적절한 위치까지 갔을 때 Ajax 요청이 7번됩니다ㅠ.ㅠ..?
    if(pageYOffset < appHeight) { 
        return;
    }
    if('' === _loading.style.display) {
        return;
    }
    _loading.style.display = '';

    if (page <= await module.info()) {
        await module.controller();
    }
    _loading.style.display = 'none';
});

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



