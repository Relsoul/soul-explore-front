import hawk from "./browser";

/**
 * 封装的ajax请求
 * @param   {String}    url                 -   请求地址
 * @param   {String}    method              -   请求类型
 * @param   {Object}    data                -   请求附带数据
 * @param   {Object}    header              -   请求头部
 * @param   {Object}    ajaxOps             -   ajax请求ops
 */
function request(url,method="get",data={},header={},ajaxOps={}){
    return new Promise((resolve,reject)=>{

        let id =localStorage.id,
            token = localStorage.token;

        // console.log('id,token',id,token);

        if (!url || !method) {
            throw new Error("请传递url和method参数");
        }

        if (id && token) {
            header["Authorization"] = addToken(id, token, url, method);
        }

        header["api-version"]="v3.5.0";

        let ops={
            type: method,
            url: url,
            // data to be added to query string:
            data:data,
            success: function(data){
                //console.log("ajax成功");
                resolve(data);
            },
            headers:header,
            error: function(xhr, type){
                console.error("ajax错误:",xhr,type);
                if(xhr.status==401){
                    alert('网络繁忙,请刷新页面');
                    localStorage.removeItem('id');
                    localStorage.removeItem('token');
                    localStorage.removeItem("guid");
                }
                reject(xhr,type)
            }
        };
        Object.assign(ops,ajaxOps);

        $.ajax(ops)
    })
}

function addToken(id, token, url, method) {

    let credentials = {
        id: id,
        key: token,
        algorithm: 'sha256'
    };
    // let index=url.indexOf("?");
    // if(!!~index){
    //     url=url.slice(0,index)
    // }
    let hawkHeader = hawk.client.header(url, method, {credentials: credentials});
    //console.info("addToken",{id,token,hawkHeader,url});
    return hawkHeader.field;
}

export default request

