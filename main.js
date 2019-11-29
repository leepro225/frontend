const _loading = document.querySelector('._4emnV');

// TODO param = {}와 같이 파라미터 객체를 받도록 리팩토링 해보세요 - 파라미터가 많아질 경우 객체에 담는 게 조금 더 깔끔합니다
function Timeline(param = {}) {
    const _url = param.url;
    const _urlInfo = param.urlInfo;
    const _template = param.template;
    const _selector =param.selector;
    const app = document.querySelector(_selector);
    let page = 1;
    let totalPage = 1;   
     
    // 데이터 요청 및 가공
    const model = async () => { 
        try {
            const res = await fetch(_url + (page));
            page ++;
            const { data } = await res.json();

            if (app.id === 'app') {
                return data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
            } 
            return data;

        } catch (e) {
            return {};
        }
    };
    
    // 뷰 렌더링
    const view = (result) => {
        let html = '';
  
        result.forEach(data => {
            html += _template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
        });
        app.innerHTML += html;
    };

    // 그 이외 
    const controller = async () => {
        _loading.style.display = '';
        render();
        const timelineInfo = await axios.get(_urlInfo);
        totalPage = timelineInfo.data.data.totalPage;
        if (totalPage > 1) {
            addEvent(); 
        }
        _loading.style.display = 'none';
    }

    // 스크롤 이벤트
    const scrollEvent = async function() {
            
        if(pageYOffset + document.scrollingElement.offsetHeight < document.body.scrollHeight * 0.9) { 
            return;
        }
        if('' === _loading.style.display) {
            return;
        }
        _loading.style.display = '';       
        await render();      
        if(page > totalPage) {
            removeEvent();
        }   
        _loading.style.display = 'none';
    }
    
    const addEvent = async () => {
        window.addEventListener('scroll', scrollEvent);        
    }
    
    const destroy = () => {
        removeEvent();
        app.innerHTML = '';
    }

    const removeEvent = () => {
        window.removeEventListener('scroll', scrollEvent);
    }
    // XXX excute - > render했는데, 적절한 네이밍인가요?
    const render = async () => {
        view(await model());
    };

    controller();

    return {
        destroy : destroy
    }
}


function Root() {

    const param1 = {
        url : 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/',
        urlInfo : 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/' + "info",
        selector : "#app",
        template : `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{src1}}" style="object-fit: cover;"></div>
                        <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                        <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`
    }

    const param2 = {
         url : 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/',
         urlInfo : 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/' + 'info',
         selector : '#feed',
         template :  `<article class="M9sTE h0YNM SgTZ1 "><header class="Ppjfr UE9AK wdOqh">
            <div class="RR-M- h5uC0 mrq0Z" role="button" tabindex="0">
                <canvas class="CfWVH" height="126" width="126" style="position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;"></canvas><span class="_2dbep " role="link" tabindex="0" style="width: 32px; height: 32px;"><img alt="twicetagram님의 프로필 사진" class="_6q-tv" src="https://scontent-icn1-1.cdninstagram.com/vp/60d5672c78325263e8a9b6d7bf4d8550/5E87F77A/t51.2885-19/s150x150/14350502_2130269970532564_1274547492301570048_a.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"></span>
            </div>
            <div class="o-MQd ">
                <div class=" ">
                    <div class="e1e1d">
                        <h2 class="BrX75"><a class="FPmhX notranslate nJAzx" title="twicetagram" href="javascript:;">twicetagram</a></h2>
                    </div>
                </div>
                <div class="M30cS">
                    <div>
                    </div>
                    <div class="JF9hh">
                    </div>
                </div>
            </div>
            </header>
            <div class="_97aPb ">
                <div role="button" tabindex="0" class="ZyFrc">
                    <div class="eLAPa kPFhm">
                        <div class="KL4Bh" style="padding-bottom: 100%;">
                            <img class="FFVAD" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{img}}" style="object-fit: cover;">
                        </div>
                        <div class="_9AhH0">
                        </div>
                    </div>
                </div>
            </div>
            <div class="eo2As ">
                <section class="ltpMr Slqrh"><span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span><span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span><span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span><span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span></section><section class="EDfFK ygqzn">
                <div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk ">
                    <div class="Nm9Fw">
                        <a class="zV_Nj" href="javascript:;">좋아요 <span>{{clickCount}}</span>개</a>
                    </div>
                </div>
                </section>
                <div class="KlCQn EtaWk">
                    <ul class="k59kT">
                        <div role="button" class="ZyFrc">
                            <li class="gElp9 " role="menuitem">
                            <div class="P9YgZ">
                                <div class="C7I1f X7jCj">
                                    <div class="C4VMK">
                                        <h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="twicetagram" href="javascript:;">twicetagram</a></h2>
                                        <span><span>{{text}}</span></span>
                                    </div>
                                </div>
                            </div>
                            </li>
                        </div>
                        <li class="lnrre"><button class="Z4IfV sqdOP yWX7d y3zKF " type="button">댓글 <span>{{commentCount}}</span>개 모두 보기</button></li>
                    </ul>
                </div>
                <div class="k_Q0X NnvRN">
                    <a class="c-Yi7" href="javascript:;"><time class="_1o9PC Nzb55" datetime="2019-11-22T14:05:19.000Z" title="2019년 11월 22일">13시간 전</time></a>
                </div>
                <section class="sH9wk _JgwE eJg28">
                <div class="RxpZH">
                    <form class="X7cDz" method="POST">
                        <textarea aria-label="댓글 달기..." placeholder="댓글 달기..." class="Ypffh" autocomplete="off" autocorrect="off" style="height: 18px;"></textarea><button class="sqdOP yWX7d y3zKF " disabled="" type="submit">게시</button>
                    </form>
                </div>
                </section>
            </div>
            <div class="MEAGs">
                <button class="dCJp8 afkep"><span aria-label="옵션 더 보기" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button>
            </div>
            </article>`
    }
    

    const clickEvent = async function(e) {
    
        if('' === _loading.style.display) {
            return;
        }
        // 탭 하이라이트
        let targetParent = this.parentNode.childNodes;

        targetParent.forEach(function(crr) {
            if (crr.childNodes.length !== 0) {
                crr.className = '_9VEo1';
                crr.childNodes[0].className = crr.childNodes[0].className.replace(/blue/gi, 'grey');
            }
        });

        this.className = '_9VEo1 T-jvg';
        this.children[0].className = this.children[0].className.replace(/grey/gi, 'blue');
        
        // 기존 app의 이벤트를 제거한다
        module.destroy();


        // 탭 클릭 이벤트
        if (this.children[0].className.indexOf('grid') > -1) {
            
            // timeline을 호출한다
            
            module = new Timeline(param1);  
        } else if (this.children[0].className.indexOf('list') > -1) {

            const appDiv = document.querySelector("#app");
            appDiv.innerHTML = `<div style="flex-direction: column;" id="feed">
            </div>`;
            
            // feed를 호출한다.
            module = new Timeline(param2); 
        } else if (this.children[0].className.indexOf('up') > -1) {

            // timeline을 호출한다
            module = new Timeline(param1);  
        }
                
        
    };
     // TODO Module과 동일하게 이벤트 붙이고 뗄 수 있는 구조로 고도화 해주세요 + destroy도 만들어주세요
    document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
        tabButton.addEventListener('click', clickEvent);
    });

    let module = new Timeline(param1);    
}

const root = new Root();


