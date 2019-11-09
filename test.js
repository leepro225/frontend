const module = (() => {
    
    const model = {
        // 데이터를 요청하는 영역  
        
        getData : async function() {
            let res = await axios.get('https://my-json-server.typicode.com/it-crafts/mockapi/timeline');
        
            return res;
        } 
        
    }

    const view = {
        // html을 그리는 영역

        render : function(data) {
            const that = this;
            const app = document.getElementById("app");
            let html = '';
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
                            </div>`;

            data.forEach(function() {
                htmlView = that.engine(template).render(data);
            
                html += htmlView;
            });

            app.innerHTML = html;
        },

        engine : function(template) {
        
            return {
                render(data) {
                    let html = '';
                    data.forEach(data => {
                        html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key]);
                    })
                    return html;
                }
            }
        }
    }

    const controller = {
        // 그 이외의 영역
        
        execute : model.getData().then(function (res) {
            view.render(res.data);
        })
    }   
})();
