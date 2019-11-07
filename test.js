// TODO 적절하지 않은 함수명 - sendRequest 안에 DOM접근, 템플릿, 렌더링 로직이 존재함 - 분리필요

const module = (() => {

    const model = () => {
        
    }
    const view = () => {
    
    }
    const controller = () => {
        let data = model.getData();
        view.render(data);
    }

    // controller();

    return {
        controller: controller
    }
})();
// module.controller();

async function sendRequest() {
    const httpRequest = new XMLHttpRequest();

    let res = await axios('~~~~')
    res.data

    const res = await fetch()
    let data = await  res.json()

    // TODO 데이터 조회로직과 DOM 렌더링 로직이 결합되어 있음 - 모델로직 격리, 뷰로직 격리 필요
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
            // TODO 콤마로 여러줄에 걸쳐 변수선언 및 초기화 지양 - 일반적이지 않은 컨벤션
            const result = JSON.parse(httpRequest.responseText);
            const app = document.getElementById("app");

            // TODO 특별히 인덱스가 로직이 필요하지 않은 경우, forEach, for in, for of 등 사용 (forEach 기반 함수형로직 권장)
            {
                let sum = 0;
                for(let i = 0; i < 10; i++) {
                    sum += i;
                }
                console.log(sum);
            }

            {
                let arr = [0,1,2,3,4,5,6,7,8,9];
                let sum = 0;
                for(let num of arr) {
                    sum += num;
                }
                console.log(sum);
            }
            
            {
                let arr = [0,1,2,3,4,5,6,7,8,9];
                let sum1 = 0;
                arr.forEach(num => { sum += num })
                console.log(sum);
            }

            {
                let arr = [0,1,2,3,4,5,6,7,8,9];
                let sum = arr.reduce((sum, num) => sum += num);
                console.log(sum);
            }

            let html = ''
            const template = `<div class='Nnq7C weEfm'>
            <div class='v1Nh3 kIKUG _bz0w'>
                <a href='javascript:;'>
                <div class='eLAPa'>
                    <div class='KL4Bh'>
                        <img class='FFVAD' decoding='auto' src='{{src1}}'>
                    </div>
                    <div class='_9AhH0'>
                    </div>
                </div>
                <div class='u7YqG'>
                    <span aria-label='슬라이드' class='mediatypesSpriteCarousel__filled__32 u-__7'></span>
                </div>
                </a>
            </div>
            <div class='v1Nh3 kIKUG _bz0w'>
                <a href='javascript:;'>
                <div class='eLAPa'>
                    <div class='KL4Bh'>
                        <img class='FFVAD' decoding='auto' src='{{src2}}'>
                    </div>
                    <div class='_9AhH0'>
                    </div>
                </div>
                <div class='u7YqG'>
                    <span aria-label='슬라이드' class='mediatypesSpriteCarousel__filled__32 u-__7'></span>
                </div>
                </a>
            </div>
            <div class='v1Nh3 kIKUG _bz0w'>
                <a href='javascript:;'>
                <div class='eLAPa'>
                    <div class='KL4Bh'>
                        <img class='FFVAD' decoding='auto' src='{{src3}}'>
                    </div>
                    <div class='_9AhH0'>
                    </div>
                </div>
                <div class='u7YqG'>
                    <span aria-label='슬라이드' class='mediatypesSpriteCarousel__filled__32 u-__7'></span>
                </div>
                </a>
            </div>		
        </div>`
            for (let i = 0; i < result.length; i++) {
                    htmlView = engine(template).render(data);
                // FIXME 반복된 DOM접근으로 유의미한 성능저하 발생 - 보조변수 사용하여 한 번만 접근하도록 수정 (매우중요!)
                html += htmlView;
            }
            app.innerHTML = html;
        }
    };
    
    httpRequest.open("GET", "https://my-json-server.typicode.com/it-crafts/mockapi/timeline", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
}

template
sendRequest('url1', template);		
sendRequest('url2');	
sendRequest('url3');	
sendRequest('url4');	


const engine = function(template) {
    engine[selector] = template;

    return {
        render(data) {
            let html = '';
            data.forEach(data => {
                html += engine[selector].replace(/{{ *(\w+) *}}/g, (m, key) => data[key]);
            })
            return html;
        }
    }
}