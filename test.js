// XXX 질문있어요

// FIXME 픽스미 코맨트 테스트
function sendRequest() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {

            const result  = JSON.parse(httpRequest.responseText),
                  app	  = document.getElementById("app");

            for (let i = 0; i < result.length; i++) {
                let htmlView = `<div class='Nnq7C weEfm'>
                                    <div class='v1Nh3 kIKUG _bz0w'>
                                        <a href='javascript:;'>
                                        <div class='eLAPa'>
                                            <div class='KL4Bh'>
                                                <img class='FFVAD' decoding='auto' src='${result[i]["src1"]}'>
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
                                                <img class='FFVAD' decoding='auto' src='${result[i]["src2"]}'>
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
                                                <img class='FFVAD' decoding='auto' src='${result[i]["src3"]}'>
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
                
                app.innerHTML += htmlView;
            }

        }
    };
    
    httpRequest.open("GET", "https://my-json-server.typicode.com/it-crafts/mockapi/timeline", true);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
}

sendRequest();		