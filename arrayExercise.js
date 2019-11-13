// 특별히 인덱스가 로직이 필요하지 않은 경우, forEach, for in, for of 등 사용 (forEach 기반 함수형로직 권장)

// for문 : 반복 횟수가 정해진 경우 주로 사용
{
    let sum = 0;
    for(let i = 0; i < 10; i++) {
        sum += i;
    }
    console.log(sum);
}

// for in 반복문 : index를 이용해 객체의 key값에 접근, 객체의 모든 열거 가능한 속성에 대해 반복
{
    let arr = [0,1,2,3,4,5,6,7,8,9];
    let sum = 0;
    for (let i in arr) {
        alert(i);
        sum += arr[i];
    }
    alert("sum is : " + sum);
}

// for of 반복문 : value에 접근, [Symbol.iterator] 속성을 가지는 컬렉션 전용 
// 참고 : https://poiemaweb.com/es6-iteration-for-of
{
    let arr = [0,1,2,3,4,5,6,7,8,9];
    let sum = 0;
    for(let num of arr) {
        alert(num);
        sum += num;
    }
    alert("sum is : " + sum);
}

// forEach 반복문 : 오직 Array객체에서만 사용 가능한 메서드
{
    let arr = [0,1,2,3,4,5,6,7,8,9];
    let sum = 0;

    arr.forEach(function(currentValue, index, array) {
        alert(currentValue);
        alert(index);
        alert(array);
    }); 
    
    arr.forEach(num => { sum += num })
    alert(sum);
}

// reduce : 첫번째 인자로 콜백함수, 두번째 인자로 초기값을 넣는다. 초기값을 넣지 않으면 
// 인덱스 1부터 시작해 콜백 함수를 실행하고 첫 번째 인덱스는 건너 뛴다.
{
    [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
        alert("콜백 반환값 누적 : " + accumulator + "\n" +
              "처리할 현재 요소 : " + currentValue + "\n" + 
              "그 요소의 인덱스 : " + currentIndex + "\n" + 
              "reduce를 호출한 배열 : " + array);
    }, 10);

    let arr = [0,1,2,3,4,5,6,7,8,9];
    let sum = arr.reduce((sum, num) => sum += num);
    alert(sum);
}