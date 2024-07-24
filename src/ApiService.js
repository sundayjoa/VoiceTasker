import { API_BASE_URL } from "./api-config";

export function call(api, method, request){
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    //로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        method: method,
    };
    if (request){
        options.body = JSON.stringify(request);
    }
    const url = API_BASE_URL + api;
    return fetch(url, options).then((response) => {
        if(response.status === 200){
            return response.json();
        } else if(response.status === 403){
            window.location.href = "/login";
        } else {
            new Error(response.statusText);
        }
    }).catch((error) => {
        console.log("http error");
        console.log("error");
    });
}

//로그인
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
    .then((response) => {
        if(response && response.token){
            //로컬 스토리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);
            window.location.href="/";
        } else {
            throw new Error("Token not found in the response");
        }
    });
}

//로그아웃
export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}
