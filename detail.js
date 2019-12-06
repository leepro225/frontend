const _url = 'https://my-json-server.typicode.com/it-crafts/mockapi/detail/';
const imgPath = 'https://raw.githubusercontent.com/it-crafts/mockapi/master'

function DetailSlider(param = {}) {
    const slider = document.querySelector(param.selector);
    const wrapper = slider.querySelector('#wrapper');
    const pagebar = slider.querySelector('#pagebar');
    const leftBtn = slider.querySelector('#left');
    const rightBtn = slider.querySelector('#right');
    const ul = wrapper.querySelector('#slide');
    let width = wrapper.offsetWidth; // FIXME 화면 리사이즈시 변경
    let page = 1;
    let total = 1;

    const create = async () => {
        total = param.data.imgList.length;
        renderImg(ul, param.data, width);
        addEvent();
    }

    const destroy = () => {
        removeEvent();
    }
    // TODO left/right 합칠 수 있으면 합치기
    const addEvent = () => {
        if(page <= 1) { leftBtn.style.display = 'none'; }
        leftBtn.addEventListener('click', slideLeft);
        rightBtn.addEventListener('click', slideRight);
    }

    const removeEvent = () => {
        leftBtn.removeEventListener('click', slideLeft);
        rightBtn.removeEventListener('click', slideRight);
    }

    const slideLeft = function() {
        rightBtn.style.display = 'block';
        pagebar.children[page - 1].classList.remove('XCodT');
        page--;
        wrapper.style.transform = 'translateX(' + (-page + 1) * width +  'px)';
        pagebar.children[page - 1].classList.add('XCodT');
        if(page <= 1) { leftBtn.style.display = 'none'; return; }

    }

    const slideRight = function() {
        if(page >= total) { return; }
        if (page >= 1) { leftBtn.style.display = 'block'; }
        pagebar.children[page - 1].classList.remove('XCodT');
        page++;
        if(page >= total) { rightBtn.style.display = 'none'; leftBtn.style.display = 'block';}
        wrapper.style.transform = 'translateX(' + (-page + 1) * width +  'px)';
        pagebar.children[page - 1].classList.add('XCodT');
    }

    const renderImg = function(ul, data, width) {
        ul.innerHTML = data.imgList.reduce((html, img) => {
            html += createLi({
                width: width,
                img: imgPath + img
            });
            return html;
        }, '');
    }

    const createLi = function(data = {}) {
        const template = `<li class='_-1_m6' style='opacity: 1; width: ${data.width}px;'><div class='bsGjF' style='margin-left: 0px; width: ${data.width}px;'><div role='button' tabindex='0' class='ZyFrc'><div class='eLAPa RzuR0'><div class='KL4Bh' style='padding-bottom: 124.907%;'><img class='FFVAD' decoding='auto' src='${data.img}' style='object-fit: cover;'></div><div class='_9AhH0'></div></div></div></div></li>`;
        return template;
    }

    create();

    return {
        destroy: destroy
    }
}

function DetailDescription(param = {}) {
    const infoDiv = document.querySelector(param.selector);
    const _tamplate = `<section class="ltpMr Slqrh"><span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span><span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span><span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span><span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span></section><section class="EDfFK ygqzn">
                        <div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk ">
                            <div class="Nm9Fw">
                                <a class="zV_Nj" href="javascript:;">좋아요 <span>${param.data.clipCount}</span>개</a>
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
                                                <span>${param.data.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                    </li>
                                </div>
                                <li class="lnrre"><button class="Z4IfV sqdOP yWX7d y3zKF " type="button">댓글 <span>${param.data.commentCount}</span>개 모두 보기</button></li>
                            </ul>
                        </div>`;
    infoDiv.innerHTML = _tamplate;
    return {
        destroy() {
            // TODO 추가
        }
    }
}

function DetailImage(param = {}) {
    const parentDiv = document.querySelector(param.selector);
    const imageList = param.data;
    const _totalPage = imageList.length;
    let _tamplate = `<article class="QBXjJ M9sTE h0YNM SgTZ1 Tgarh " id="description"><img style="width: 100%; height: auto;" data-src="${imgPath}{{ src }}"></article>`;
    let imgList; // 가변리스트
    let list;

    const init = () => {
        imgList = renderImgs(parentDiv);
        list = imgList.slice();
        loadImgMore(imgList);
        if(1 < imgList.length) {
            addEvent();
        }
    }

    const renderImgs = (parent) => {
        const dummy = document.createElement('template');
        imageList.forEach(data => {
            dummy.innerHTML += _tamplate.replace(/{{ *(\w+) *}}/g, data || '');
        });
        const list = [].slice.call(dummy.content.children)
        parent.appendChild(dummy.content);
        return list;
    }
    
    const loadImgMore = (list) => {
        const article = list.shift();
        if(!article) {
            return;
        }
        const img = article.firstElementChild;
        img.src = img.dataset.src;
        delete img.dataset.src;
        return img;
    }
    
    let isLoading = false;
    const scrollEvent = function() {
        if(isLoading) {
            return;
        }
        if(pageYOffset + document.scrollingElement.offsetHeight < document.body.scrollHeight * 0.9) { 
            return;
        }

        isLoading = true;
        const img = loadImgMore(imgList);
        if(!img) {
            removeEvent();
            return;
        }
        img.onload = e => {
            isLoading = false;
        }
    }
    
    const addEvent = async () => {
        window.addEventListener('scroll', scrollEvent);        
    }
    const removeEvent = () => {
        window.removeEventListener('scroll', scrollEvent);
    }

    const destroy = () => {
        removeEvent()
        list.forEach(element => {
            element.parentNode.removeChild(element);
        });
    }

    init();
    return {
        destroy : destroy
    }
}

const common = {
    getData : async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            return data;
        } catch (e) {
            return {};
        }
    }
}

const detail = (() => {
    let _slider;
    let _description;
    let _image;
    
    const _create = async () => {
        const data = await common.getData(_url + 1);
        _slider = new DetailSlider({ selector: '#slider', data: data.data });
        _description = new DetailDescription({ selector: '#info', data: data.data });
        _image = new DetailImage({ selector: '.ltEKP', data: data.data.detailList });
    }

    const destroy = () => {
        _slider && _slider.destroy();
        _slider = null;
        _description && _description.destroy();
        _description = null;
        _image && _image.destroy();
        _image = null;
    }

    _create();

    return {
        destroy: destroy
    }
})();