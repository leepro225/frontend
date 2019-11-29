const _loading = document.querySelector('._4emnV');

function Timeline(selector, param = {}) {
    const timeline = document.querySelector(selector);
    const _url = param.url;
    const _template = param.template;
    let _page = 1;
    let _totalPage = 1;   

    const init = async () => {
        _loading.style.display = '';
        renderMore(await getDataMore());
        const timelineInfo = await axios.get(_url + 'info');
        _totalPage = timelineInfo.data.data.totalPage;
        if (_totalPage > 1) {
            addEvent(); 
        }
        _loading.style.display = 'none';
    }
     
    // 데이터 요청 및 가공
    const getDataMore = async () => { // model
        try {
            const res = await fetch(_url + (_page));
            _page ++;
            const { data } = await res.json();

            if (_url.includes('timeline')) {
                return data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
            }
            return data;
        } catch (e) {
            return {};
        }
    };
    
    // 뷰 렌더링
    const renderMore = (datas) => { // view
        let html = '';
  
        datas.forEach(data => {
            html += _template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
        });
        timeline.innerHTML += html;
    };

    // 스크롤 이벤트
    const scrollEvent = async function() {
            
        if(pageYOffset + document.scrollingElement.offsetHeight < document.body.scrollHeight * 0.9) { 
            return;
        }
        if('' === _loading.style.display) {
            return;
        }
        _loading.style.display = '';       
        renderMore(await getDataMore());
        if(_page > _totalPage) {
            removeEvent();
        }   
        _loading.style.display = 'none';
    }
    
    const addEvent = async () => {
        window.addEventListener('scroll', scrollEvent);        
    }
    
    const destroy = () => {
        removeEvent();
        timeline.innerHTML = '';
    }

    const removeEvent = () => {
        window.removeEventListener('scroll', scrollEvent);
    }

    init();

    return {
        destroy : destroy
    }
}


function Root() {

    const paramGrid = {
        url : 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/',
        template : `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{src1}}" style="object-fit: cover;"></div>
                        <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                        <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                        <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://raw.githubusercontent.com/it-crafts/mockapi/master{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                        <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`
    }

    const paramFeed = {
         url : 'https://my-json-server.typicode.com/it-crafts/mockapi/feed/',
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
        e.preventDefault();
        if('' === _loading.style.display) {
            return;
        }

        // 탭 하이라이트
        this.className = '_9VEo1 T-jvg';
        this.children[0].className = this.children[0].className.replace(/grey/, 'blue');
        [].slice.call(this.parentNode.children)
        .filter(tab => this !== tab)
        .forEach(tab => {
            tab.className = '_9VEo1';
            tab.childNodes[0].className = tab.childNodes[0].className.replace(/blue/, 'grey');
        });
        
        // 기존 app의 이벤트를 제거한다
        module.destroy();
        // 탭 클릭 이벤트
        switch (this.pathname) {
            case '/list':
                module = new Timeline('#app', paramGrid);  
                break;
            case '/feed':
                module = new Timeline('#app', paramFeed);
                break;
            case '/up':
                module = new Timeline('#app', paramGrid);  
                break;
        }
    };
     // TODO Module과 동일하게 이벤트 붙이고 뗄 수 있는 구조로 고도화 해주세요 + destroy도 만들어주세요
    document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
        tabButton.addEventListener('click', clickEvent);
    });

    let module = new Timeline('#app', paramGrid);    
}

const root = new Root();